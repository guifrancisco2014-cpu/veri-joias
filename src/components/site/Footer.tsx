import Link from "next/link";
import { Logotype } from "@/components/ui/Logotype";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col items-center gap-4 text-center">
        <Logotype size="md" />
        <p className="text-sm text-muted-light max-w-md font-light leading-relaxed mt-2">
          Peças escolhidas com carinho, pensando em você. ✨ Encontre aquela
          que combina com a sua essência e faça dela parte da sua história. 🤍
        </p>
        <p className="font-serif text-lg text-gold">Reserve a sua!</p>
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted-light mt-8">
          © {new Date().getFullYear()} Íria Semijoias. Todos os direitos
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
