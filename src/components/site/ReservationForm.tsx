"use client";

import { useActionState } from "react";
import { criarReserva, type ReservaFormState } from "@/lib/actions/reservas";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";

const initialState: ReservaFormState = { success: false, message: "" };

export function ReservationForm({ produtoId }: { produtoId: string }) {
  const [state, formAction, isPending] = useActionState(
    criarReserva,
    initialState
  );

  if (state.success) {
    return (
      <div className="border border-success/30 bg-success/10 text-success px-5 py-4 text-sm">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="produtoId" value={produtoId} />

      <div>
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" name="nome" required autoComplete="name" />
      </div>

      <div>
        <Label htmlFor="contato">Telefone ou e-mail</Label>
        <Input id="contato" name="contato" required autoComplete="tel" />
      </div>

      <div>
        <Label htmlFor="mensagem">Mensagem (opcional)</Label>
        <Textarea id="mensagem" name="mensagem" rows={3} />
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-danger">{state.message}</p>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
        {isPending ? "Enviando..." : "Reservar esta peça"}
      </Button>

      <p className="text-xs text-muted">
        Isto não é uma compra. Ao reservar, entraremos em contato para
        combinar os próximos passos.
      </p>
    </form>
  );
}
