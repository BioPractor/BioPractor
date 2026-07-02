// Autenticación mínima para el panel /admin: un solo usuario/contraseña
// (definidos por variables de entorno) y una cookie de sesión firmada.
// Usa únicamente Web Crypto (crypto.subtle) para funcionar tanto en el
// middleware (Edge runtime) como en las Server Actions (Node runtime).

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 días

// TS 5.7+ tipa los TypedArrays como genéricos (Uint8Array<ArrayBufferLike>),
// lo que choca con BufferSource de lib.dom al pasarlos a crypto.subtle.
// Siempre construimos estos Uint8Array nosotros mismos (nunca vienen de un
// SharedArrayBuffer), así que el cast es seguro.
function asBufferSource(bytes: Uint8Array): BufferSource {
  return bytes as unknown as BufferSource;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getHmacKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    asBufferSource(encoder.encode(secret)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(username: string): Promise<string> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Falta la variable de entorno SESSION_SECRET.");

  const payload = JSON.stringify({
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  const payloadB64 = toBase64Url(encoder.encode(payload));
  const key = await getHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, asBufferSource(encoder.encode(payloadB64)));
  return `${payloadB64}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;

  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return false;

  try {
    const key = await getHmacKey(secret);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      asBufferSource(fromBase64Url(signatureB64)),
      asBufferSource(encoder.encode(payloadB64))
    );
    if (!isValid) return false;

    const payload = JSON.parse(decoder.decode(fromBase64Url(payloadB64)));
    return typeof payload.exp === "number" && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function hashPassword(password: string, existingSaltB64?: string): Promise<string> {
  const salt = existingSaltB64 ? fromBase64Url(existingSaltB64) : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    asBufferSource(encoder.encode(password)),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: asBufferSource(salt), iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `${toBase64Url(salt)}:${toBase64Url(bits)}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [saltB64] = storedHash.split(":");
  if (!saltB64) return false;
  const computed = await hashPassword(password, saltB64);
  return computed === storedHash;
}

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE = SESSION_TTL_SECONDS;
