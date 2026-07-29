import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CategoriaProduto, Produto } from "@/lib/types";
import { CATEGORIAS } from "@/lib/types";
import { formatarPreco } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Select } from "@/components/ui/Field";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

const CATEGORIAS_VALIDAS = ["aneis", "colares", "brincos", "pulseiras", "outros"];

interface AdminProdutosPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function AdminProdutosPage({
  searchParams,
}: AdminProdutosPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("produtos")
    .select("*")
    .order("criado_em", { ascending: false });

  if (params.categoria && CATEGORIAS_VALIDAS.includes(params.categoria)) {
    query = query.eq("categoria", params.categoria as CategoriaProduto);
  }

  const { data: produtos } = await query.returns<Produto[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Produtos</h1>
        <ButtonLink href="/admin/produtos/novo">Nova peça</ButtonLink>
      </div>

      <form
        method="get"
        className="flex flex-wrap items-end gap-4 mb-6 max-w-xs"
      >
        <div className="flex-1">
          <label
            htmlFor="categoria"
            className="block text-[11px] uppercase tracking-[0.15em] text-muted mb-2"
          >
            Filtrar por categoria
          </label>
          <Select
            id="categoria"
            name="categoria"
            defaultValue={params.categoria ?? ""}
          >
            <option value="">Todas</option>
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>
        <button
          type="submit"
          className="px-6 py-3 text-xs uppercase tracking-[0.2em] border border-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          Filtrar
        </button>
        {params.categoria && (
          <Link
            href="/admin/produtos"
            className="text-xs uppercase tracking-[0.15em] text-muted hover:text-foreground pb-3"
          >
            Limpar
          </Link>
        )}
      </form>

      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-beige text-left">
            <tr>
              <th className="px-4 py-3 font-normal">Foto</th>
              <th className="px-4 py-3 font-normal">Nome</th>
              <th className="px-4 py-3 font-normal">Categoria</th>
              <th className="px-4 py-3 font-normal">Preço</th>
              <th className="px-4 py-3 font-normal">Estoque</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(produtos ?? []).map((produto) => (
              <tr key={produto.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-12 bg-beige">
                    {produto.fotos[0] && (
                      <Image
                        src={produto.fotos[0]}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{produto.nome}</td>
                <td className="px-4 py-3">
                  {CATEGORIAS.find((c) => c.value === produto.categoria)?.label}
                </td>
                <td className="px-4 py-3">{formatarPreco(produto.preco)}</td>
                <td className="px-4 py-3">{produto.estoque}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={produto.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/produtos/${produto.id}`}
                      className="text-xs uppercase tracking-wide hover:text-gold"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton id={produto.id} nome={produto.nome} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!produtos || produtos.length === 0) && (
          <p className="px-4 py-8 text-center text-muted">
            {params.categoria
              ? "Nenhuma peça encontrada nessa categoria."
              : "Nenhuma peça cadastrada ainda."}
          </p>
        )}
      </div>
    </div>
  );
}
