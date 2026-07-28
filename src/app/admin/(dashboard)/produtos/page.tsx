import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Produto } from "@/lib/types";
import { CATEGORIAS } from "@/lib/types";
import { formatarPreco } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export default async function AdminProdutosPage() {
  const supabase = await createClient();
  const { data: produtos } = await supabase
    .from("produtos")
    .select("*")
    .order("criado_em", { ascending: false })
    .returns<Produto[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl">Produtos</h1>
        <ButtonLink href="/admin/produtos/novo">Nova peça</ButtonLink>
      </div>

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
            Nenhuma peça cadastrada ainda.
          </p>
        )}
      </div>
    </div>
  );
}
