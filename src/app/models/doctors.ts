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
  available_appointments: any;  
  available_time_slots: string[]; 
  experience: number; 
  rating: number;

}
