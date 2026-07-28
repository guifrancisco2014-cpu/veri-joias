import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/site/ProductGrid";
import { createClient } from "@/lib/supabase/server";
import type { Produto } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: destaques } = await supabase
    .from("produtos")
    .select("*")
    .eq("destaque", true)
    .order("criado_em", { ascending: false })
    .limit(8)
    .returns<Produto[]>();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-28 md:pb-28 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
          Coleção exclusiva
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl mx-auto">
          Joias que contam a sua história
        </h1>
        <p className="mt-6 text-muted max-w-xl mx-auto">
          Peças únicas, escolhidas a dedo. Explore nossa vitrine e reserve a
          joia que mais combina com você.
        </p>
        <div className="mt-10">
          <ButtonLink href="/catalogo">Ver catálogo</ButtonLink>
        </div>
      </section>

      {destaques && destaques.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl">Em destaque</h2>
          </div>
          <ProductGrid produtos={destaques} />
        </section>
      )}
    </div>
  );
}
