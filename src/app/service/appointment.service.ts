import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8000/appointments/book/';

  constructor(private http: HttpClient) {}

  // Funktion zum Buchen eines Termins
  bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getAppointmentsByDoctor(doctorId: number): Observable<Appointment[]> {
    const url = `http://localhost:8000/api/available_appointments/${doctorId}/`;  // Die korrekte URL verwenden
    return this.http.get<Appointment[]>(url);
  }
  
}
