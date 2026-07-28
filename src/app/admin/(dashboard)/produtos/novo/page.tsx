import { criarProduto } from "@/lib/actions/produtos";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NovoProdutoPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Nova peça</h1>
      <ProductForm action={criarProduto} />
    </div>
  );
}
