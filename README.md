# BioPractor — sitio web

Landing page para BioPractor (Fredy Urquijo), construida con Next.js 16 (App
Router), TypeScript y Tailwind CSS v4. El sitio ayuda a que las personas
gestionen su autocuidado a partir de productos naturales, organizados por
necesidad (cabeza, masajes, piel, cuerpo, sueño/emocional, aromaterapia).

Incluye un panel privado en `/admin` para que el dueño gestione el catálogo:
destacar productos, editarlos, archivarlos (y restaurarlos) y ver cuántas
vistas y clics a WhatsApp tiene cada uno.

## Requisitos

- Node.js 20 o superior
- npm (el proyecto trae `package-lock.json`)
- Una cuenta gratuita de [Supabase](https://supabase.com) (guarda el catálogo)

## 1. Configurar Supabase (base de datos)

El catálogo ya no vive en el código: vive en una base de datos de Supabase
para que el panel `/admin` pueda editarlo sin necesidad de volver a
desplegar el sitio.

1. Crea una cuenta y un proyecto nuevo en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor → New query**, pega todo el contenido de
   [`supabase/schema.sql`](supabase/schema.sql) y ejecútalo. Esto crea la
   tabla `products` y la deja con los 12 productos de ejemplo que ya trae el
   sitio.
3. Ve a **Project Settings → API** y copia:
   - **Project URL** → será `SUPABASE_URL`
   - **service_role key** (no la `anon` key) → será `SUPABASE_SERVICE_ROLE_KEY`

La `service_role key` tiene permisos totales sobre la base de datos: nunca la
publiques ni la uses en código de cliente/navegador. En este proyecto solo se
usa dentro de `src/lib/supabase/server.ts`, que corre exclusivamente en el
servidor.

## 2. Configurar el acceso al panel /admin

El panel usa un solo usuario/contraseña (no hace falta un servicio externo de
login).

1. Genera el hash de la contraseña que quieras usar:

   ```bash
   node scripts/hash-password.mjs "la-contraseña-que-elijas"
   ```

   Copia el valor `ADMIN_PASSWORD_HASH=...` que imprime.

2. Genera un secreto para firmar la sesión (cualquiera de estos sirve):

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## 3. Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
cp .env.example .env.local
```

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_USERNAME=fredy
ADMIN_PASSWORD_HASH=...
SESSION_SECRET=...
```

## 4. Instalación y desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para el sitio público y
[http://localhost:3000/admin](http://localhost:3000/admin) para el panel
(pide el usuario/contraseña configurados arriba).

Otros comandos útiles:

```bash
npm run build   # build de producción
npm run start   # sirve el build de producción localmente
npm run lint    # revisa el código con ESLint
```

## Estructura del proyecto

```
src/
  app/
    (site)/                  → Sitio público (usa Header/Footer/WhatsApp flotante)
      page.tsx                 → Inicio
      catalogo/page.tsx        → Catálogo (con filtro por categoría)
      catalogo/[slug]/page.tsx → Detalle de producto (registra vistas)
      busqueda/page.tsx        → Búsqueda
      contacto/page.tsx        → Contacto + agendamiento de citas
    admin/                    → Panel privado (protegido por src/proxy.ts)
      login/                    → Inicio de sesión
      (protected)/              → Dashboard, crear/editar, archivados
    api/
      contact/route.ts         → Endpoint del formulario de contacto
      track/whatsapp-click/    → Registra clics al botón de WhatsApp por producto
  components/                → Header, Footer, tarjetas, formularios, etc.
  components/admin/           → Formulario de producto, login, cerrar sesión
  lib/
    categories.ts              → Categorías del catálogo (fijas en código)
    types.ts                   → Tipos de datos
    whatsapp.ts                 → Generación de enlaces de WhatsApp
    contact.ts                   → Validación del formulario de contacto
    auth.ts                       → Hash de contraseña y firma de sesión del panel
    db/products.ts                 → Lectura/escritura de productos en Supabase
    supabase/server.ts              → Cliente de Supabase (solo servidor)
  proxy.ts                    → Protege /admin/* (redirige a /admin/login sin sesión)
supabase/schema.sql          → Esquema de la base de datos + los 153 productos reales
public/products/              → Fotos de producto extraídas del catálogo PDF
scripts/hash-password.mjs    → Genera ADMIN_PASSWORD_HASH
```

## El panel /admin

- **Productos** (`/admin`): tabla con todos los productos activos, con
  vistas, clics a WhatsApp, botón para destacar/quitar destacado, editar y
  archivar.
- **Nuevo producto** (`/admin/productos/nuevo`) y **Editar**
  (`/admin/productos/[id]/editar`): mismo formulario reutilizable.
- **Archivados** (`/admin/productos/archivados`): productos que se quitaron
  del sitio pero no se borraron — se pueden restaurar en un clic.
- Las **vistas** se cuentan cada vez que alguien abre la página de un
  producto; los **clics a WhatsApp** se cuentan cuando alguien toca "Más
  información" en el detalle del producto. Es un conteo simple (no
  deduplica visitantes), pensado como una referencia de qué productos
  generan más interés.

## Catálogo real

El catálogo ya tiene los 153 productos reales (`supabase/schema.sql`),
generados cruzando `Listado productos 2026 (3).xlsx` (precios actualizados
por referencia) con `Catalogo AlmaVida actualizado (1).pdf` (nombres, fotos y
descripciones). Las fotos se extrajeron del PDF y viven en
`public/products/<slug>.png`.

10 productos del Excel no aparecían en el PDF viejo, así que quedaron sin
foto ni descripción (`Producto CH-20`, `Producto NL-18`, etc. — búscalos por
el texto `[CONTENIDO PENDIENTE` desde `/admin`). Complétalos desde el panel
cuando tengas esa información.

Las categorías (`src/lib/categories.ts`) se generaron automáticamente por
palabras clave en las descripciones (energía, sueño y estrés, colágeno y
belleza, articulaciones, digestión, hormonal, inmunidad, peso, cardiovascular,
niños). Vale la pena que alguien del equipo revise que cada producto quedó en
la categoría correcta — se puede ajustar por producto desde `/admin`.

## Otro contenido pendiente de reemplazar

Busca el texto `[CONTENIDO PENDIENTE: ...]` en el código para ubicar cada
punto exacto:

1. **Redes sociales** (`src/components/Footer.tsx`): reemplazar los enlaces
   de ejemplo de Instagram, Facebook y TikTok por los reales.
2. **Envío del formulario de contacto** (`src/lib/contact.ts`): hoy el
   mensaje solo queda en el log del servidor. Conectar un servicio real de
   correo (por ejemplo [Resend](https://resend.com) o Nodemailer) con las
   credenciales de BioPractor.
3. **Número de WhatsApp** (`src/lib/whatsapp.ts`): actualmente configurado
   con 314 444 6563 (+57). Verificar que sea el número definitivo antes de
   publicar.
## Videos del sitio

El inicio usa dos videos de fondo tomados de [Pexels](https://www.pexels.com)
(licencia gratuita, uso comercial permitido, sin atribución obligatoria):

- `public/hero.mp4` — luz entre hojas, fondo del hero
  (`src/components/Hero.tsx`, constante `HERO_VIDEO_SRC`).
- `public/showcase.mp4` — gotas de agua sobre hojas, sección "naturaleza en
  movimiento" (`src/components/Showcase.tsx`, constante `SHOWCASE_VIDEO_SRC`).

Para cambiarlos, reemplaza el archivo en `public/` (mismo nombre) o edita la
constante correspondiente. Si dejas la constante vacía (`""`), el sitio
muestra una malla de gradiente animada de reemplazo sin depender de ningún
archivo.

## Dominio y hosting

El cliente aún no tiene dominio. El plan es comprar `biopractors.com` y
desplegar en Vercel.

## Desplegar en Vercel

1. Sube este repositorio a GitHub (o el proveedor Git que prefieras).
2. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. En **Environment Variables**, agrega las mismas variables de tu
   `.env.local` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`). El sitio no
   funcionará sin ellas.
4. Vercel detecta Next.js automáticamente — no se necesita configuración
   adicional para el build.
5. Si conectas un servicio de correo para el formulario de contacto, agrega
   también esas variables antes de desplegar.
6. Una vez comprado `biopractors.com`, agrégalo en **Project Settings →
   Domains** y sigue las instrucciones de Vercel para apuntar el DNS.

## Notas de diseño

- **Paleta**: verdes de bosque, arcilla/terracota y crema — inspirada en la
  naturaleza pero con un acabado elegante (definida en
  `src/app/globals.css`).
- **Tipografía**: se usa Calibri como preferencia del sistema (muy común en
  equipos Windows) con [Mulish](https://fonts.google.com/specimen/Mulish)
  como respaldo web, ya que Calibri no está disponible como fuente web con
  licencia abierta.
- **Accesibilidad**: contraste verificado para AA, `alt`/`aria-label` en
  imágenes e íconos, y foco visible en todos los elementos interactivos.
