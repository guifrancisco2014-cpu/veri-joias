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
    const [info, destaque] = state.message.split("\n\n");
    return (
      <div className="border border-foreground px-6 py-8 text-center">
        {info && (
          <p className="text-sm text-muted font-light leading-relaxed">
            {info}
          </p>
        )}
        {destaque && (
          <p className="font-serif text-xl text-gold mt-4">{destaque}</p>
        )}
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
