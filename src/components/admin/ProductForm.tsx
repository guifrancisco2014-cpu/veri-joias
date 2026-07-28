"use client";

import { useActionState } from "react";
import type { ProdutoFormState } from "@/lib/actions/produtos";
import { CATEGORIAS, STATUS_LABELS, type Produto } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { ImageUploader } from "@/components/admin/ImageUploader";

const initialState: ProdutoFormState = { success: false, message: "" };

export function ProductForm({
  action,
  produto,
}: {
  action: (
    prevState: ProdutoFormState,
    formData: FormData
  ) => Promise<ProdutoFormState>;
  produto?: Produto;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      <div>
        <Label htmlFor="nome">Nome da peça</Label>
        <Input id="nome" name="nome" required defaultValue={produto?.nome} />
      </div>

      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          name="descricao"
          rows={4}
          defaultValue={produto?.descricao}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Select
            id="categoria"
            name="categoria"
            required
            defaultValue={produto?.categoria ?? "aneis"}
          >
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="material">Material</Label>
          <Input id="material" name="material" defaultValue={produto?.material} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="preco">Preço (R$)</Label>
          <Input
            id="preco"
            name="preco"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={produto?.preco}
          />
        </div>

        <div>
          <Label htmlFor="estoque">Estoque</Label>
          <Input
            id="estoque"
            name="estoque"
            type="number"
            min={0}
            step="1"
            required
            defaultValue={produto?.estoque ?? 1}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Disponibilidade</Label>
        <Select
          id="status"
          name="status"
          required
          defaultValue={produto?.status ?? "disponivel"}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="destaque"
          defaultChecked={produto?.destaque}
          className="h-4 w-4"
        />
        Exibir em destaque na página inicial
      </label>

      <div>
        <Label htmlFor="fotos">Fotos</Label>
        <ImageUploader name="fotos" initialFotos={produto?.fotos} />
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-danger">{state.message}</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar peça"}
      </Button>
    </form>
  );
}
