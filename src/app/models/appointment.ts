export interface Appointment {
  id: number;  // Eindeutige ID des Termins
  doctor: number | undefined;  // ID des Arztes
  patient_name: string;  // Name des Patienten
  patient_email: string;  // E-Mail des Patienten
  appointment_time: string;  // Terminzeit im ISO-Format (z.B. "2024-09-21T10:00:00")
  confirmed: boolean;  // Ob der Termin bestätigt wurde (true/false)
}
