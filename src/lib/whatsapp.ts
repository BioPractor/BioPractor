const WHATSAPP_NUMBER = "573144446563";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppLink(): string {
  return buildWhatsAppLink(
    "Hola BioPractor, quiero más información sobre sus productos de autocuidado natural."
  );
}

export function productWhatsAppLink(productName: string, reference: string): string {
  return buildWhatsAppLink(
    `Hola BioPractor, quiero más información sobre "${productName}" (${reference}).`
  );
}
