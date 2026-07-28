export type CategoriaProduto =
  | "aneis"
  | "colares"
  | "brincos"
  | "pulseiras"
  | "outros";

export type StatusProduto = "disponivel" | "reservado" | "indisponivel";

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  categoria: CategoriaProduto;
  material: string;
  preco: number;
  fotos: string[];
  estoque: number;
  status: StatusProduto;
  destaque: boolean;
  criado_em: string;
  atualizado_em: string;
}

export type StatusReserva = "pendente" | "contatada" | "concluida";

export interface Reserva {
  id: string;
  produto_id: string;
  nome_cliente: string;
  contato: string;
  mensagem: string | null;
  status: StatusReserva;
  criado_em: string;
  produto?: Pick<Produto, "id" | "nome" | "fotos">;
}

export const CATEGORIAS: { value: CategoriaProduto; label: string }[] = [
  { value: "aneis", label: "Anéis" },
  { value: "colares", label: "Colares" },
  { value: "brincos", label: "Brincos" },
  { value: "pulseiras", label: "Pulseiras" },
  { value: "outros", label: "Outros" },
];

export const STATUS_LABELS: Record<StatusProduto, string> = {
  disponivel: "Disponível",
  reservado: "Reservado",
  indisponivel: "Indisponível",
};

export const STATUS_RESERVA_LABELS: Record<StatusReserva, string> = {
  pendente: "Pendente",
  contatada: "Contatada",
  concluida: "Concluída",
};
