"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/reservas", label: "Reservas" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 md:min-h-screen border-b md:border-b-0 md:border-r border-border bg-surface">
      <div className="px-6 py-6">
        <Link href="/admin" className="font-serif text-xl">
          Veri Jóias
        </Link>
      </div>
      <nav className="flex md:flex-col px-3 gap-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm rounded-sm transition-colors",
                active
                  ? "bg-beige text-foreground"
                  : "text-muted hover:bg-beige/60"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logout} className="px-6 py-6 mt-auto">
        <button
          type="submit"
          className="text-xs uppercase tracking-wide text-muted hover:text-danger"
        >
          Sair
        </button>
      </form>
    </aside>
  );
}
