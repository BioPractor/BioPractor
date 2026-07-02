import { generalWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={generalWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest-dark text-cream shadow-lg shadow-forest-dark/30 transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="currentColor"
      >
        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.4.66 4.63 1.8 6.55L4 29l7.6-1.75a11.96 11.96 0 0 0 4.42.84h.01C22.65 28.09 28 22.7 28 16.07 28 9.45 22.64 3 16.02 3Zm0 22.02h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.75.87.9-3.63-.24-.37a9.93 9.93 0 0 1-1.53-5.27C6 9.98 10.4 5.98 16.02 5.98c2.65 0 5.14 1.03 7.02 2.9a9.86 9.86 0 0 1 2.9 6.99c0 5.6-4.4 9.15-9.92 9.15Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
