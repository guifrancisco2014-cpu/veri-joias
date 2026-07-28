import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/types";
import { formatarPreco } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProductCard({ produto }: { produto: Produto }) {
  const foto = produto.fotos[0];

  return (
    <Link href={`/produtos/${produto.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        {foto ? (
          <Image
            src={foto}
            alt={produto.nome}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted text-sm">
            Sem foto
          </div>
        )}
        {produto.status !== "disponivel" && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={produto.status} />
          </div>
        )}
      </div>
      <div className="pt-4 text-center">
        <h3 className="font-serif text-lg">{produto.nome}</h3>
        <p className="mt-1 text-sm text-muted">{formatarPreco(produto.preco)}</p>
      </div>
    </Link>
  );
}
