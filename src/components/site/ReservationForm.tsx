"use client";

import { useActionState, useState } from "react";
import { criarReserva, type ReservaFormState } from "@/lib/actions/reservas";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { formatarContato } from "@/lib/utils";

const initialState: ReservaFormState = { message: "" };

export function ReservationForm({ produtoId }: { produtoId: string }) {
  const [state, formAction, isPending] = useActionState(
    criarReserva,
    initialState
  );
  const [contato, setContato] = useState("");

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="produtoId" value={produtoId} />

      <div>
        <Label htmlFor="nome">Nome completo</Label>
        <Input id="nome" name="nome" required autoComplete="name" />
      </div>

      <div>
        <Label htmlFor="contato">Telefone ou e-mail</Label>
        <Input
          id="contato"
          name="contato"
          required
          autoComplete="tel"
          inputMode="text"
          placeholder="(11) 91234-5678 ou seuemail@exemplo.com"
          value={contato}
          onChange={(e) => setContato(formatarContato(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="mensagem">Mensagem (opcional)</Label>
        <Textarea id="mensagem" name="mensagem" rows={3} />
      </div>

      {state.message && (
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
