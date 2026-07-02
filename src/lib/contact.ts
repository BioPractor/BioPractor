export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Por favor completa todos los campos." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Ingresa un correo electrónico válido." };
  }

  // [CONTENIDO PENDIENTE]: conectar aquí un servicio real de envío de correo
  // (Resend, Nodemailer, etc.) con las credenciales de BioPractor.
  // Por ahora el mensaje solo queda registrado en el log del servidor.
  console.log("Nuevo mensaje de contacto BioPractor:", { name, email, message });

  return { ok: true };
}
