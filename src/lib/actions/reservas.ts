"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { notificarNovaReserva } from "@/lib/email";

const reservaSchema = z.object({
  produtoId: z.string().uuid(),
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  contato: z.string().trim().min(8, "Informe um telefone ou e-mail válido"),
  mensagem: z.string().trim().max(500).optional(),
});

export type ReservaFormState = {
  success: boolean;
  message: string;
};

export async function criarReserva(
  _prevState: ReservaFormState,
  formData: FormData
): Promise<ReservaFormState> {
  const parsed = reservaSchema.safeParse({
    produtoId: formData.get("produtoId"),
    nome: formData.get("nome"),
    contato: formData.get("contato"),
    mensagem: formData.get("mensagem") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const { produtoId, nome, contato, mensagem } = parsed.data;
  const supabase = await createClient();

  const { data: reserva, error } = await supabase
    .rpc("criar_reserva", {
      p_produto_id: produtoId,
      p_nome_cliente: nome,
      p_contato: contato,
      p_mensagem: mensagem ?? null,
    })
    .single();

  if (error || !reserva) {
    return {
      success: false,
      message:
        error?.message === "Esta peça não está mais disponível para reserva"
          ? "Essa peça acabou de ser reservada por outra pessoa. Que tal ver outras opções no catálogo?"
          : "Não foi possível concluir sua reserva. Tente novamente em instantes.",
    };
  }

  const { data: produto } = await supabase
    .from("produtos")
    .select("nome, preco")
    .eq("id", produtoId)
    .single();

  if (produto) {
    await notificarNovaReserva({
      produto,
      nomeCliente: nome,
      contato,
      mensagem: mensagem ?? null,
    });
  }

  revalidatePath(`/produtos/${produtoId}`);
  revalidatePath("/catalogo");
  revalidatePath("/");

  return {
    success: true,
    message:
      "Você será contatado para andamento na compra com infos de pagamento, entrega e etc.\n\nEssa peça já é quase sua.",
  };
}
