"use client";

import { useTransition } from "react";
import { atualizarStatusReserva } from "@/lib/actions/produtos";
import { STATUS_RESERVA_LABELS, type StatusReserva } from "@/lib/types";
import { Select } from "@/components/ui/Field";

export function ReservationStatusSelect({
  id,
  status,
}: {
  id: string;
  status: StatusReserva;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      defaultValue={status}
      disabled={isPending}
      className="w-auto py-2"
      onChange={(e) => {
        const novoStatus = e.target.value as StatusReserva;
        startTransition(() => {
          atualizarStatusReserva(id, novoStatus);
        });
      }}
    >
      {Object.entries(STATUS_RESERVA_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
