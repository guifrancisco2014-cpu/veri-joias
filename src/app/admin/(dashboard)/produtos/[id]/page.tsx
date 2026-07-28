import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Produto } from "@/lib/types";
import { atualizarProduto } from "@/lib/actions/produtos";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditarProdutoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarProdutoPage({
  params,
}: EditarProdutoPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: produto } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .maybeSingle<Produto>();

  if (!produto) notFound();

  const action = atualizarProduto.bind(null, id);

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Editar peça</h1>
      <ProductForm action={action} produto={produto} />
    </div>
  );
}
