import type { Produto } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        Nenhuma peça encontrada com esses filtros.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-8">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}
