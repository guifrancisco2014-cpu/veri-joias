import { cn } from "@/lib/utils";

type LogotypeSize = "sm" | "md" | "lg";

const sizes: Record<LogotypeSize, { title: string; subtitle: string; line: string }> = {
  sm: {
    title: "text-xl",
    subtitle: "text-[9px] tracking-[0.3em]",
    line: "w-2",
  },
  md: {
    title: "text-2xl md:text-[28px]",
    subtitle: "text-[10px] tracking-[0.3em]",
    line: "w-3",
  },
  lg: {
    title: "text-4xl md:text-5xl",
    subtitle: "text-xs tracking-[0.35em]",
    line: "w-5",
  },
};

export function Logotype({
  size = "md",
  className,
}: {
  size?: LogotypeSize;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className={cn("font-serif font-medium text-sage tracking-wide", s.title)}>
        ÍRIA
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span className={cn("h-px bg-gold", s.line)} />
        <span className={cn("uppercase text-gold", s.subtitle)}>semijoias</span>
        <span className={cn("h-px bg-gold", s.line)} />
      </span>
    </span>
  );
}
