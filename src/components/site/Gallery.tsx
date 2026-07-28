"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Gallery({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [ativo, setAtivo] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (fotos.length === 0) {
    return (
      <div className="aspect-square bg-beige flex items-center justify-center text-muted">
        Sem foto disponível
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="relative block w-full aspect-square overflow-hidden bg-beige cursor-zoom-in"
        aria-label="Ampliar imagem"
      >
        <Image
          src={fotos[ativo]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </button>

      {fotos.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {fotos.map((foto, i) => (
            <button
              key={foto + i}
              type="button"
              onClick={() => setAtivo(i)}
              className={cn(
                "relative aspect-square overflow-hidden bg-beige border",
                i === ativo ? "border-gold" : "border-transparent"
              )}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === ativo}
            >
              <Image src={foto} alt="" fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setZoom(false)}
            className="absolute top-6 right-6 text-white text-3xl leading-none"
          >
            ×
          </button>
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={fotos[ativo]}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
