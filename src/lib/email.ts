import { Resend } from "resend";
import type { Produto } from "./types";

export async function notificarNovaReserva(params: {
  produto: Pick<Produto, "nome" | "preco">;
  nomeCliente: string;
  contato: string;
  mensagem: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const from = process.env.NOTIFICATION_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    // Notificação por e-mail é opcional: se não configurada, apenas
    // ignoramos silenciosamente e a reserva segue salva no banco.
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `Nova reserva: ${params.produto.nome}`,
    html: `
      <h2>Nova reserva recebida</h2>
      <p><strong>Peça:</strong> ${params.produto.nome}</p>
      <p><strong>Cliente:</strong> ${params.nomeCliente}</p>
      <p><strong>Contato:</strong> ${params.contato}</p>
      ${params.mensagem ? `<p><strong>Mensagem:</strong> ${params.mensagem}</p>` : ""}
      <p>Acesse o painel administrativo para ver os detalhes.</p>
    `,
  });
}
