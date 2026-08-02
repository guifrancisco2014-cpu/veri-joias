const items = [
  {
    label: "Peças selecionadas com cuidado",
    icon: (
      <path d="M6 9l6-6 6 6-6 11-6-11z M6 9h12 M9 9l3 11 M15 9l-3 11" />
    ),
  },
  {
    label: "Para cada momento, o seu brilho",
    icon: (
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    ),
  },
  {
    label: "Feito para durar",
    icon: (
      <path d="M12 20s-7-4.4-9.3-8.9C1.3 8 2.9 5 6 5c2 0 3.3 1.1 4 2.2C10.7 6.1 12 5 14 5c3.1 0 4.7 3 3.3 6.1C15 15.6 12 20 12 20z" />
    ),
  },
  {
    label: "Beleza que vem da natureza",
    icon: (
      <path d="M12 21c0-6 1-9 6-13 0 6-1 10-6 13z M12 21c0-6-1-9-6-13 0 6 1 10 6 13z M12 21V9" />
    ),
  },
];

export function BrandHighlights() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-soft">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </span>
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted max-w-[9rem] leading-relaxed">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
