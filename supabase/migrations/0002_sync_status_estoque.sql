-- Quando o estoque de um produto chega a zero, marca automaticamente
-- como "indisponivel" (a menos que já esteja "reservado", que é um
-- estado à parte ligado a uma reserva ativa e não deve ser sobrescrito).
-- Não faz o caminho inverso: se você reabastecer o estoque, o status
-- não volta sozinho para "disponivel" — assim uma peça que você marcou
-- indisponível de propósito (descontinuada, com defeito etc.) não volta
-- a aparecer na vitrine sem você decidir isso manualmente.

create or replace function public.sync_status_por_estoque()
returns trigger as $$
begin
  if new.estoque = 0 and new.status = 'disponivel' then
    new.status = 'indisponivel';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists produtos_sync_status_estoque on public.produtos;
create trigger produtos_sync_status_estoque
  before insert or update on public.produtos
  for each row execute function public.sync_status_por_estoque();

-- Aplica a regra também aos produtos que já existem no banco.
update public.produtos
set status = 'indisponivel'
where estoque = 0 and status = 'disponivel';
