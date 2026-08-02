"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logotype } from "@/components/ui/Logotype";

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Íria Semijoias — início">
          <Logotype size="sm" />
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-gold",
                pathname === link.href ? "text-gold" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center gap-1.5 h-8 w-8"
        >
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-opacity",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-foreground transition-transform",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-xs uppercase tracking-[0.2em] py-2",
                pathname === link.href ? "text-gold" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
