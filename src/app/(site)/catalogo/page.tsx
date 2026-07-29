import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductGrid } from "@/components/site/ProductGrid";
import { Filters } from "@/components/site/Filters";
import type { CategoriaProduto, Produto, StatusProduto } from "@/lib/types";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explore nossa coleção completa de joias.",
};

const CATEGORIAS_VALIDAS = ["aneis", "colares", "brincos", "pulseiras", "outros"];
const STATUS_VALIDOS = ["disponivel", "reservado", "indisponivel"];

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string;
    status?: string;
    preco_min?: string;
    preco_max?: string;
  }>;
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("produtos").select("*").order("criado_em", { ascending: false });

  if (params.categoria && CATEGORIAS_VALIDAS.includes(params.categoria)) {
    query = query.eq("categoria", params.categoria as CategoriaProduto);
  }

  if (params.status && STATUS_VALIDOS.includes(params.status)) {
    query = query.eq("status", params.status as StatusProduto);
  }

  const precoMin = Number(params.preco_min);
  if (params.preco_min && !Number.isNaN(precoMin)) {
    query = query.gte("preco", precoMin);
  }

  const precoMax = Number(params.preco_max);
  if (params.preco_max && !Number.isNaN(precoMax)) {
    query = query.lte("preco", precoMax);
  }

  const { data: produtos } = await query.returns<Produto[]>();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-medium">
          Coleção completa
        </p>
        <h1 className="font-serif font-normal text-4xl md:text-5xl">Catálogo</h1>
      </div>

      <Filters filters={params} />
      <ProductGrid produtos={produtos ?? []} />
    </div>
  );
}
