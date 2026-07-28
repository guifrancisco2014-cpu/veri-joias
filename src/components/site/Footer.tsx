import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col items-center gap-3 text-center">
        <span className="font-serif text-xl">Veri Jóias</span>
        <p className="text-sm text-muted max-w-md">
          Peças únicas, selecionadas com cuidado. Reserve a sua e entraremos
          em contato para finalizar os detalhes.
        </p>
        <p className="text-xs text-muted mt-6">
          © {new Date().getFullYear()} Veri Jóias. Todos os direitos
          reservados.
        </p>
        <Link
          href="/admin"
          className="text-xs text-muted/70 hover:text-gold mt-2"
        >
          Área administrativa
        </Link>
      </div>
    </footer>
  );
}
