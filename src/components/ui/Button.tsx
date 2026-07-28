import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variantClasses: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-gold",
  secondary:
    "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background",
  ghost: "bg-transparent text-foreground hover:bg-beige",
  danger: "bg-transparent text-danger border border-danger hover:bg-danger hover:text-white",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide uppercase transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </Link>
  );
}
