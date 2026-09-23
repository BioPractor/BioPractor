"use server";

import { revalidatePath } from "next/cache";
import {
  deleteAppointment,
  setAppointmentStatus,
  type AppointmentStatus,
} from "@/lib/db/appointments";

export async function setStatusAction(id: string, status: AppointmentStatus) {
  await setAppointmentStatus(id, status);
  revalidatePath("/admin/citas");
}

export async function deleteAppointmentAction(id: string) {
  await deleteAppointment(id);
  revalidatePath("/admin/citas");
}
