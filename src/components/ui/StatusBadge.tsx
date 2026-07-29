import { cn } from "@/lib/utils";
import { STATUS_LABELS, type StatusProduto } from "@/lib/types";

const styles: Record<StatusProduto, string> = {
  disponivel: "bg-foreground text-background",
  reservado: "bg-background text-foreground border border-foreground",
  indisponivel: "bg-background text-muted-light border border-border",
};

export function StatusBadge({ status }: { status: StatusProduto }) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.15em]",
        styles[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
