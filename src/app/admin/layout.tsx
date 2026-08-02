import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Painel administrativo",
    template: "%s | Painel Íria Semijoias",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
