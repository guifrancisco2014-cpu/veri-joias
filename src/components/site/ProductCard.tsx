import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/types";
import { cn, formatarPreco } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function ProductCard({ produto }: { produto: Produto }) {
  const foto = produto.fotos[0];
  const indisponivel = produto.status === "indisponivel";

  return (
    <Link href={`/produtos/${produto.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        {foto ? (
          <Image
            src={foto}
            alt={produto.nome}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              indisponivel && "grayscale opacity-60"
            )}
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
      <div className={cn("pt-5 text-center", indisponivel && "opacity-60")}>
        <h3 className="font-serif text-lg font-normal">{produto.nome}</h3>
        <p className="mt-1.5 text-xs tracking-wide text-muted-light">
          {formatarPreco(produto.preco)}
        </p>
      </div>
    </Link>
  );
}
