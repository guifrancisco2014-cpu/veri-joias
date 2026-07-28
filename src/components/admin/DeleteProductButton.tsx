"use client";

import { useTransition } from "react";
import { excluirProduto } from "@/lib/actions/produtos";

export function DeleteProductButton({
  id,
  nome,
}: {
  id: string;
  nome: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(`Excluir "${nome}" permanentemente?`)) return;
    startTransition(() => {
      excluirProduto(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-xs uppercase tracking-wide text-danger hover:underline disabled:opacity-50"
    >
      {isPending ? "Excluindo..." : "Excluir"}
    </button>
  );
}
