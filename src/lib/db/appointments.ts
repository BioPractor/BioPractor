import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type AppointmentStatus = "pendiente" | "atendida" | "cancelada";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  service: string;
  preferredDate: string;
  notes: string;
  source: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type AppointmentInput = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  service: string;
  preferredDate?: string;
  notes?: string;
  source?: string;
};

type AppointmentRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  service: string;
  preferred_date: string;
  notes: string;
  source: string;
  status: AppointmentStatus;
  created_at: string;
};

function mapRow(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    city: row.city,
    service: row.service,
    preferredDate: row.preferred_date,
    notes: row.notes,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function createAppointment(input: AppointmentInput): Promise<void> {
  const { error } = await getSupabaseAdmin().from("appointments").insert({
    name: input.name.trim(),
    phone: (input.phone ?? "").trim(),
    email: (input.email ?? "").trim(),
    address: (input.address ?? "").trim(),
    city: (input.city ?? "").trim(),
    service: (input.service ?? "").trim(),
    preferred_date: (input.preferredDate ?? "").trim(),
    notes: (input.notes ?? "").trim(),
    source: (input.source ?? "terapia").trim(),
    status: "pendiente",
  });
  if (error) throw error;
}

export async function listAppointmentsAdmin(): Promise<Appointment[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function setAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("appointments")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
