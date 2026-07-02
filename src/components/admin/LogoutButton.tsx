import { logoutAction } from "@/app/admin/login/actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-sage-light px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay-dark"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
