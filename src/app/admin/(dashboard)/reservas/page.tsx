import { createClient } from "@/lib/supabase/server";
import type { Reserva } from "@/lib/types";
import { ReservationStatusSelect } from "@/components/admin/ReservationStatusSelect";

export default async function AdminReservasPage() {
  const supabase = await createClient();
  const { data: reservas } = await supabase
    .from("reservas")
    .select("*, produto:produtos(id, nome, fotos)")
    .order("criado_em", { ascending: false })
    .returns<Reserva[]>();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Reservas</h1>

      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-beige text-left">
            <tr>
              <th className="px-4 py-3 font-normal">Peça</th>
              <th className="px-4 py-3 font-normal">Cliente</th>
              <th className="px-4 py-3 font-normal">Contato</th>
              <th className="px-4 py-3 font-normal">Mensagem</th>
              <th className="px-4 py-3 font-normal">Data</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {(reservas ?? []).map((reserva) => (
              <tr key={reserva.id} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  {reserva.produto?.nome ?? "Peça removida"}
                </td>
                <td className="px-4 py-3">{reserva.nome_cliente}</td>
                <td className="px-4 py-3">{reserva.contato}</td>
                <td className="px-4 py-3 max-w-xs text-muted">
                  {reserva.mensagem || "—"}
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(reserva.criado_em).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <ReservationStatusSelect id={reserva.id} status={reserva.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!reservas || reservas.length === 0) && (
          <p className="px-4 py-8 text-center text-muted">
            Nenhuma reserva recebida ainda.
          </p>
        )}
      </div>
    </div>
  );
}
