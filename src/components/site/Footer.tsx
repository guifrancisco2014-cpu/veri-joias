import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col items-center gap-4 text-center">
        <span className="font-serif text-2xl">Veri Jóias</span>
        <p className="text-sm text-muted-light max-w-md font-light leading-relaxed">
          Peças únicas, selecionadas com cuidado. Reserve a sua e entraremos
          em contato para finalizar os detalhes.
        </p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted-light mt-8">
          © {new Date().getFullYear()} Veri Jóias. Todos os direitos
          reservados.
        </p>
        <Link
          href="/admin"
          className="text-[11px] uppercase tracking-[0.15em] text-muted-light hover:text-gold mt-1"
        >
          Área administrativa
        </Link>
      </div>
    </footer>
  );
}
