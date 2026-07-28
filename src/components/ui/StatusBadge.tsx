import { cn } from "@/lib/utils";
import { STATUS_LABELS, type StatusProduto } from "@/lib/types";

const styles: Record<StatusProduto, string> = {
  disponivel: "bg-success/10 text-success border-success/30",
  reservado: "bg-gold/10 text-gold border-gold/40",
  indisponivel: "bg-muted/10 text-muted border-muted/30",
};

export function StatusBadge({ status }: { status: StatusProduto }) {
  return (
    <span
      className={cn(
        "inline-block border px-3 py-1 text-xs uppercase tracking-wide",
        styles[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
