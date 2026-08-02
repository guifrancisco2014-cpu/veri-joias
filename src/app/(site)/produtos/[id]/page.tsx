import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Produto } from "@/lib/types";
import { CATEGORIAS } from "@/lib/types";
import { formatarPreco } from "@/lib/utils";
import { Gallery } from "@/components/site/Gallery";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ReservationForm } from "@/components/site/ReservationForm";

interface ProdutoPageProps {
  params: Promise<{ id: string }>;
}

async function getProduto(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .maybeSingle<Produto>();
  return data;
}

export async function generateMetadata({
  params,
}: ProdutoPageProps): Promise<Metadata> {
  const { id } = await params;
  const produto = await getProduto(id);

  if (!produto) return { title: "Peça não encontrada" };

  return {
    title: produto.nome,
    description: produto.descricao || `${produto.nome} — Íria Semijoias`,
    openGraph: produto.fotos[0] ? { images: [produto.fotos[0]] } : undefined,
  };
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { id } = await params;
  const produto = await getProduto(id);

  if (!produto) notFound();

  const categoria = CATEGORIAS.find((c) => c.value === produto.categoria);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <Gallery fotos={produto.fotos} alt={produto.nome} />

        <div>
          {categoria && (
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-medium">
              {categoria.label}
            </p>
          )}
          <h1 className="font-serif font-normal text-3xl md:text-4xl">
            {produto.nome}
          </h1>
          <p className="mt-4 text-xl text-muted-light font-light">
            {formatarPreco(produto.preco)}
          </p>

          <div className="mt-5">
            <StatusBadge status={produto.status} />
          </div>

          {produto.descricao && (
            <p className="mt-8 text-muted font-light leading-relaxed whitespace-pre-line">
              {produto.descricao}
            </p>
          )}

          {produto.material && (
            <p className="mt-6 text-xs uppercase tracking-[0.1em] text-muted">
              Material — {produto.material}
            </p>
          )}

          <div className="mt-10 border-t border-border pt-8">
            {produto.status === "disponivel" ? (
              <ReservationForm produtoId={produto.id} />
            ) : (
              <p className="text-sm text-muted">
                Esta peça está{" "}
                {produto.status === "reservado" ? "reservada" : "indisponível"}{" "}
                no momento. Explore outras opções em nosso{" "}
                <a href="/catalogo" className="underline hover:text-gold">
                  catálogo
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
