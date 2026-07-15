import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="text-2xl font-extrabold text-forest-dark">
        Panel BioPractors
      </h1>
      <p className="mt-1 text-sm text-ink/70">
        Acceso solo para el equipo de BioPractors.
      </p>

      <div className="mt-8 rounded-3xl border border-sage-light/60 bg-white/70 p-6">
        <LoginForm nextPath={next} />
      </div>
    </div>
  );
}
