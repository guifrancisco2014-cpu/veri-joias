import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIAS, type CategoriaProduto } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Amostra {
  categoria: CategoriaProduto;
  foto: string;
}

async function getAmostrasPorCategoria(): Promise<Amostra[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select("categoria, fotos")
    .order("destaque", { ascending: false })
    .order("criado_em", { ascending: false })
    .limit(60)
    .returns<{ categoria: CategoriaProduto; fotos: string[] }[]>();

  const encontrados = new Map<CategoriaProduto, string>();
  for (const produto of data ?? []) {
    if (encontrados.has(produto.categoria)) continue;
    if (produto.fotos[0]) encontrados.set(produto.categoria, produto.fotos[0]);
  }

  return CATEGORIAS.filter((c) => encontrados.has(c.value)).map((c) => ({
    categoria: c.value,
    foto: encontrados.get(c.value)!,
  }));
}

export async function CategoryShowcase({
  categoriaAtiva,
}: {
  categoriaAtiva?: string;
}) {
  const amostras = await getAmostrasPorCategoria();

  if (amostras.length === 0) return null;

  return (
    <div className="flex justify-center gap-6 sm:gap-10 overflow-x-auto pb-2 mb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {amostras.map(({ categoria, foto }) => {
        const label = CATEGORIAS.find((c) => c.value === categoria)?.label;
        const ativa = categoriaAtiva === categoria;
        return (
          <Link
            key={categoria}
            href={ativa ? "/catalogo" : `/catalogo?categoria=${categoria}`}
            className="flex shrink-0 flex-col items-center gap-2.5 group"
          >
            <span
              className={cn(
                "relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full ring-1 ring-offset-2 ring-offset-background transition-all",
                ativa ? "ring-gold" : "ring-border group-hover:ring-sage"
              )}
            >
              <Image
                src={foto}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.12em] transition-colors",
                ativa ? "text-gold" : "text-muted group-hover:text-foreground"
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
