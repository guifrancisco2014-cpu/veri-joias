import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();

  const [produtos, disponiveis, reservados, reservasPendentes] =
    await Promise.all([
      supabase.from("produtos").select("id", { count: "exact", head: true }),
      supabase
        .from("produtos")
        .select("id", { count: "exact", head: true })
        .eq("status", "disponivel"),
      supabase
        .from("produtos")
        .select("id", { count: "exact", head: true })
        .eq("status", "reservado"),
      supabase
        .from("reservas")
        .select("id", { count: "exact", head: true })
        .eq("status", "pendente"),
    ]);

  return {
    totalProdutos: produtos.count ?? 0,
    disponiveis: disponiveis.count ?? 0,
    reservados: reservados.count ?? 0,
    reservasPendentes: reservasPendentes.count ?? 0,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Peças cadastradas", value: stats.totalProdutos },
    { label: "Disponíveis", value: stats.disponiveis },
    { label: "Reservadas", value: stats.reservados },
    { label: "Reservas pendentes", value: stats.reservasPendentes },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border border-border bg-surface px-6 py-8 text-center"
          >
            <p className="text-3xl font-serif">{card.value}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-muted">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
