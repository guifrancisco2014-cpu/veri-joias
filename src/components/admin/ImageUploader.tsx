"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ImageUploader({
  name,
  initialFotos = [],
}: {
  name: string;
  initialFotos?: string[];
}) {
  const [fotos, setFotos] = useState<string[]>(initialFotos);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setErro(null);
    setEnviando(true);

    try {
      const supabase = createClient();
      const novasUrls: string[] = [];

      for (const file of Array.from(files)) {
        const extensao = file.name.split(".").pop();
        const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;

        const { error } = await supabase.storage
          .from("produtos-fotos")
          .upload(nomeArquivo, file, { cacheControl: "3600" });

        if (error) throw error;

        const { data } = supabase.storage
          .from("produtos-fotos")
          .getPublicUrl(nomeArquivo);

        novasUrls.push(data.publicUrl);
      }

      setFotos((atual) => [...atual, ...novasUrls]);
    } catch {
      setErro("Não foi possível enviar uma ou mais fotos. Tente novamente.");
    } finally {
      setEnviando(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remover(url: string) {
    setFotos((atual) => atual.filter((f) => f !== url));
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(fotos)} />

      {fotos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {fotos.map((foto) => (
            <div key={foto} className="relative aspect-square bg-beige">
              <Image src={foto} alt="" fill sizes="20vw" className="object-cover" />
              <button
                type="button"
                onClick={() => remover(foto)}
                aria-label="Remover foto"
                className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center bg-black/60 text-white text-sm"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex items-center gap-2 text-sm cursor-pointer border border-border px-4 py-2 hover:border-gold">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={enviando}
          onChange={(e) => handleFiles(e.target.files)}
        />
        {enviando ? "Enviando..." : "Adicionar fotos"}
      </label>

      {erro && <p className="mt-2 text-sm text-danger">{erro}</p>}
    </div>
  );
}
