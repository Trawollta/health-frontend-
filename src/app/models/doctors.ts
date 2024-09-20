export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  street: string;
  town: string;
  postal_code: string;
  profile_picture: string | null;
  description: string | null;
  opening_hours: any;  // Du kannst hier den genauen Typ anpassen, falls nötig
  available_appointments: any;  // Auch hier den genauen Typ festlegen
  available_time_slots: string[];  // Das neue Feld für die verfügbaren Zeit-Slots
}
