"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Produto } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

export function FeaturedCarousel({ produtos }: { produtos: Produto[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-item]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Peças em destaque"
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {produtos.map((produto) => (
          <div
            key={produto.id}
            data-carousel-item
            className="shrink-0 snap-start w-[68%] sm:w-[45%] md:w-[31%] lg:w-[23%]"
          >
            <ProductCard produto={produto} />
          </div>
        ))}
      </div>

      {canScrollNext && (
        <div className="md:hidden pointer-events-none absolute right-0 top-0 bottom-6 w-14 bg-gradient-to-l from-background to-transparent" />
      )}

      {(canScrollPrev || canScrollNext) && (
        <div className="hidden md:flex justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Peças anteriores"
            className={cn(
              "h-10 w-10 flex items-center justify-center border border-foreground transition-colors",
              "hover:bg-foreground hover:text-background disabled:opacity-20 disabled:pointer-events-none"
            )}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Próximas peças"
            className={cn(
              "h-10 w-10 flex items-center justify-center border border-foreground transition-colors",
              "hover:bg-foreground hover:text-background disabled:opacity-20 disabled:pointer-events-none"
            )}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
