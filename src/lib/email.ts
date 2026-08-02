import { Resend } from "resend";
import type { Produto } from "./types";

interface Destinatario {
  apiKey: string;
  to: string;
}

function getDestinatarios(): Destinatario[] {
  const destinatarios: Destinatario[] = [];

  if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL_TO) {
    destinatarios.push({
      apiKey: process.env.RESEND_API_KEY,
      to: process.env.NOTIFICATION_EMAIL_TO,
    });
  }

  if (process.env.RESEND_API_KEY_2 && process.env.NOTIFICATION_EMAIL_TO_2) {
    destinatarios.push({
      apiKey: process.env.RESEND_API_KEY_2,
      to: process.env.NOTIFICATION_EMAIL_TO_2,
    });
  }

  return destinatarios;
}

export async function notificarNovaReserva(params: {
  produto: Pick<Produto, "nome" | "preco">;
  nomeCliente: string;
  contato: string;
  mensagem: string | null;
}) {
  const from = process.env.NOTIFICATION_EMAIL_FROM;
  const destinatarios = getDestinatarios();

  if (!from || destinatarios.length === 0) {
    // Notificação por e-mail é opcional: se não configurada, apenas
    // ignoramos silenciosamente e a reserva segue salva no banco.
    return;
  }

  const subject = `Nova reserva: ${params.produto.nome}`;
  const html = `
    <h2>Nova reserva recebida</h2>
    <p><strong>Peça:</strong> ${params.produto.nome}</p>
    <p><strong>Cliente:</strong> ${params.nomeCliente}</p>
    <p><strong>Contato:</strong> ${params.contato}</p>
    ${params.mensagem ? `<p><strong>Mensagem:</strong> ${params.mensagem}</p>` : ""}
    <p>Acesse o painel administrativo para ver os detalhes.</p>
  `;

  // Cada destinatário usa sua própria conta/API key do Resend (contas
  // gratuitas sem domínio verificado só enviam para o próprio e-mail
  // cadastrado). Envios são independentes: se um falhar, não afeta o
  // outro nem a reserva, que já está salva no banco.
  await Promise.all(
    destinatarios.map(async ({ apiKey, to }) => {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({ from, to, subject, html });
      } catch {
        // notificação é best-effort, não deve quebrar o fluxo de reserva
      }
    })
  );
}
