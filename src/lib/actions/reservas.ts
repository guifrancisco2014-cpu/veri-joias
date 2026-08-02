"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { notificarNovaReserva } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reservaSchema = z.object({
  produtoId: z.string().uuid(),
  nome: z.string().trim().min(2, "Informe seu nome completo"),
  contato: z
    .string()
    .trim()
    .min(8, "Informe um telefone ou e-mail válido")
    .refine((valor) => {
      if (EMAIL_REGEX.test(valor)) return true;
      const digitos = valor.replace(/\D/g, "");
      return digitos.length === 10 || digitos.length === 11;
    }, "Informe um telefone válido (com DDD) ou um e-mail válido"),
  mensagem: z.string().trim().max(500).optional(),
});

export type ReservaFormState = {
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

  // Redireciona (em vez de só devolver estado) para que a confirmação
  // sobreviva a um recarregamento da página — se ficasse só em estado
  // local do React, um refresh acidental faria a pessoa ver a mensagem
  // genérica de "peça reservada" em vez do agradecimento.
  redirect(`/produtos/${produtoId}?reservado=1`);
}
