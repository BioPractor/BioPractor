// Genera el valor de ADMIN_PASSWORD_HASH para el panel /admin.
// Uso: node scripts/hash-password.mjs "tu-contraseña"

const password = process.argv[2];

if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "tu-contraseña"');
  process.exit(1);
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return Buffer.from(binary, "binary")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function main() {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const hash = `${toBase64Url(salt)}:${toBase64Url(new Uint8Array(bits))}`;
  console.log("\nAgrega esto a tus variables de entorno (.env.local y en Vercel):\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}

main();
