-- Veri Jóias — schema inicial
-- Execute este arquivo no SQL Editor do seu projeto Supabase (Database > SQL Editor).

create extension if not exists "pgcrypto";

-- =========================================
-- Tabela: produtos
-- =========================================
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text not null default '',
  categoria text not null check (categoria in ('aneis', 'colares', 'brincos', 'pulseiras', 'outros')),
  material text not null default '',
  preco numeric(10, 2) not null default 0 check (preco >= 0),
  fotos text[] not null default '{}',
  estoque integer not null default 1 check (estoque >= 0),
  status text not null default 'disponivel' check (status in ('disponivel', 'reservado', 'indisponivel')),
  destaque boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists produtos_categoria_idx on public.produtos (categoria);
create index if not exists produtos_status_idx on public.produtos (status);
create index if not exists produtos_destaque_idx on public.produtos (destaque);

create or replace function public.set_atualizado_em()
returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists produtos_set_atualizado_em on public.produtos;
create trigger produtos_set_atualizado_em
  before update on public.produtos
  for each row execute function public.set_atualizado_em();

alter table public.produtos enable row level security;

drop policy if exists "produtos_select_publico" on public.produtos;
create policy "produtos_select_publico"
  on public.produtos for select
  to anon, authenticated
  using (true);

drop policy if exists "produtos_insert_autenticado" on public.produtos;
create policy "produtos_insert_autenticado"
  on public.produtos for insert
  to authenticated
  with check (true);

drop policy if exists "produtos_update_autenticado" on public.produtos;
create policy "produtos_update_autenticado"
  on public.produtos for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "produtos_delete_autenticado" on public.produtos;
create policy "produtos_delete_autenticado"
  on public.produtos for delete
  to authenticated
  using (true);

-- =========================================
-- Tabela: reservas
-- =========================================
create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  produto_id uuid not null references public.produtos (id) on delete cascade,
  nome_cliente text not null,
  contato text not null,
  mensagem text,
  status text not null default 'pendente' check (status in ('pendente', 'contatada', 'concluida')),
  criado_em timestamptz not null default now()
);

create index if not exists reservas_produto_id_idx on public.reservas (produto_id);
create index if not exists reservas_status_idx on public.reservas (status);

alter table public.reservas enable row level security;

-- Ninguém pode ler/alterar reservas diretamente pelo cliente público.
-- A criação acontece apenas via função RPC "criar_reserva" (abaixo).
drop policy if exists "reservas_select_autenticado" on public.reservas;
create policy "reservas_select_autenticado"
  on public.reservas for select
  to authenticated
  using (true);

drop policy if exists "reservas_update_autenticado" on public.reservas;
create policy "reservas_update_autenticado"
  on public.reservas for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "reservas_delete_autenticado" on public.reservas;
create policy "reservas_delete_autenticado"
  on public.reservas for delete
  to authenticated
  using (true);

-- =========================================
-- Função: criar_reserva
-- Cria a reserva e marca o produto como "reservado" em uma única
-- transação atômica. Roda com privilégios elevados (SECURITY DEFINER)
-- para poder atualizar produtos.status sem exigir acesso de escrita
-- direto do visitante anônimo.
-- =========================================
create or replace function public.criar_reserva(
  p_produto_id uuid,
  p_nome_cliente text,
  p_contato text,
  p_mensagem text
)
returns public.reservas
language plpgsql
security definer
set search_path = public
as $$
declare
  v_status text;
  v_reserva public.reservas;
begin
  select status into v_status
  from public.produtos
  where id = p_produto_id
  for update;

  if v_status is null then
    raise exception 'Produto não encontrado';
  end if;

  if v_status <> 'disponivel' then
    raise exception 'Esta peça não está mais disponível para reserva';
  end if;

  insert into public.reservas (produto_id, nome_cliente, contato, mensagem)
  values (p_produto_id, p_nome_cliente, p_contato, p_mensagem)
  returning * into v_reserva;

  update public.produtos
  set status = 'reservado'
  where id = p_produto_id;

  return v_reserva;
end;
$$;

revoke all on function public.criar_reserva(uuid, text, text, text) from public;
grant execute on function public.criar_reserva(uuid, text, text, text) to anon, authenticated;

-- =========================================
-- Storage: bucket de fotos dos produtos
-- =========================================
insert into storage.buckets (id, name, public)
values ('produtos-fotos', 'produtos-fotos', true)
on conflict (id) do nothing;

drop policy if exists "produtos_fotos_select_publico" on storage.objects;
create policy "produtos_fotos_select_publico"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'produtos-fotos');

drop policy if exists "produtos_fotos_insert_autenticado" on storage.objects;
create policy "produtos_fotos_insert_autenticado"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'produtos-fotos');

drop policy if exists "produtos_fotos_update_autenticado" on storage.objects;
create policy "produtos_fotos_update_autenticado"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'produtos-fotos');

drop policy if exists "produtos_fotos_delete_autenticado" on storage.objects;
create policy "produtos_fotos_delete_autenticado"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'produtos-fotos');
