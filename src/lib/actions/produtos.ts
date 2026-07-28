"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const produtoSchema = z.object({
  nome: z.string().trim().min(2, "Informe o nome da peça"),
  descricao: z.string().trim().default(""),
  categoria: z.enum(["aneis", "colares", "brincos", "pulseiras", "outros"]),
  material: z.string().trim().default(""),
  preco: z.coerce.number().min(0, "O preço não pode ser negativo"),
  estoque: z.coerce.number().int().min(0, "O estoque não pode ser negativo"),
  status: z.enum(["disponivel", "reservado", "indisponivel"]),
  destaque: z.coerce.boolean().default(false),
  fotos: z.array(z.string().url()).default([]),
});

export type ProdutoFormState = {
  success: boolean;
  message: string;
};

function parseProdutoFormData(formData: FormData) {
  let fotos: string[] = [];
  const fotosRaw = formData.get("fotos");
  if (typeof fotosRaw === "string" && fotosRaw.length > 0) {
    try {
      fotos = JSON.parse(fotosRaw);
    } catch {
      fotos = [];
    }
  }

  return produtoSchema.safeParse({
    nome: formData.get("nome"),
    descricao: formData.get("descricao"),
    categoria: formData.get("categoria"),
    material: formData.get("material"),
    preco: formData.get("preco"),
    estoque: formData.get("estoque"),
    status: formData.get("status"),
    destaque: formData.get("destaque") === "on",
    fotos,
  });
}

export async function criarProduto(
  _prevState: ProdutoFormState,
  formData: FormData
): Promise<ProdutoFormState> {
  const parsed = parseProdutoFormData(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("produtos").insert(parsed.data);

  if (error) {
    return { success: false, message: "Não foi possível criar a peça." };
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/catalogo");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function atualizarProduto(
  id: string,
  _prevState: ProdutoFormState,
  formData: FormData
): Promise<ProdutoFormState> {
  const parsed = parseProdutoFormData(formData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("produtos")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return { success: false, message: "Não foi possível salvar as alterações." };
  }

  revalidatePath("/admin/produtos");
  revalidatePath(`/produtos/${id}`);
  revalidatePath("/catalogo");
  revalidatePath("/");
  redirect("/admin/produtos");
}

export async function excluirProduto(id: string) {
  const supabase = await createClient();
  await supabase.from("produtos").delete().eq("id", id);

  revalidatePath("/admin/produtos");
  revalidatePath("/catalogo");
  revalidatePath("/");
}

export async function atualizarStatusReserva(
  id: string,
  status: "pendente" | "contatada" | "concluida"
) {
  const supabase = await createClient();
  await supabase.from("reservas").update({ status }).eq("id", id);
  revalidatePath("/admin/reservas");
}
