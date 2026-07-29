import { ButtonLink } from "@/components/ui/Button";
import { FeaturedCarousel } from "@/components/site/FeaturedCarousel";
import { createClient } from "@/lib/supabase/server";
import type { Produto } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: destaques } = await supabase
    .from("produtos")
    .select("*")
    .eq("destaque", true)
    .order("criado_em", { ascending: false })
    .limit(12)
    .returns<Produto[]>();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-36 md:pb-36 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-8 font-medium">
          Coleção exclusiva
        </p>
        <h1 className="font-serif font-normal text-5xl md:text-7xl leading-[1.1] max-w-3xl mx-auto">
          Joias que contam a sua história
        </h1>
        <p className="mt-8 text-muted-light font-light max-w-xl mx-auto leading-relaxed">
          Peças únicas, escolhidas a dedo. Explore nossa vitrine e reserve a
          joia que mais combina com você.
        </p>
        <div className="mt-12">
          <ButtonLink href="/catalogo">Ver catálogo</ButtonLink>
        </div>
      </section>

      {destaques && destaques.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-medium">
              Selecionadas para você
            </p>
            <h2 className="font-serif font-normal text-3xl md:text-4xl">
              Em destaque
            </h2>
          </div>
          <FeaturedCarousel produtos={destaques} />
        </section>
      )}
    </div>
  );
}
