import Link from "next/link";
import { CATEGORIAS, STATUS_LABELS } from "@/lib/types";
import { Label, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export interface CatalogoFilters {
  categoria?: string;
  status?: string;
  preco_min?: string;
  preco_max?: string;
}

export function Filters({ filters }: { filters: CatalogoFilters }) {
  return (
    <form
      method="get"
      className="grid grid-cols-2 gap-4 md:grid-cols-5 md:items-end border-b border-border pb-8 mb-10"
    >
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="categoria">Categoria</Label>
        <Select id="categoria" name="categoria" defaultValue={filters.categoria ?? ""}>
          <option value="">Todas</option>
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="status">Disponibilidade</Label>
        <Select id="status" name="status" defaultValue={filters.status ?? ""}>
          <option value="">Todas</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="preco_min">Preço mín.</Label>
        <Input
          id="preco_min"
          name="preco_min"
          type="number"
          min={0}
          step="0.01"
          defaultValue={filters.preco_min ?? ""}
          placeholder="R$ 0"
        />
      </div>

      <div>
        <Label htmlFor="preco_max">Preço máx.</Label>
        <Input
          id="preco_max"
          name="preco_max"
          type="number"
          min={0}
          step="0.01"
          defaultValue={filters.preco_max ?? ""}
          placeholder="R$ 9999"
        />
      </div>

      <div className="flex gap-3 col-span-2 md:col-span-1">
        <Button type="submit" variant="primary" className="w-full">
          Filtrar
        </Button>
        <Link
          href="/catalogo"
          className="inline-flex items-center justify-center px-4 text-xs uppercase tracking-wide text-muted hover:text-foreground"
        >
          Limpar
        </Link>
      </div>
    </form>
  );
}
