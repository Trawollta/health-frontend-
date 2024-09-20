import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctors';  // Importiere das Doctor-Interface

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:8000/api/doctors/'; // URL deines Django-Backends

  constructor(private http: HttpClient) {}

  // Methode, um Ärzte vom Backend abzurufen
  getDoctors(): Observable<Doctor[]> {  // Ändere den Rückgabetyp zu Observable<Doctor[]>
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  // Suchfunktion für Ärzte
  searchDoctors(doctors: Doctor[], searchTerm: string): Doctor[] {
    searchTerm = searchTerm.trim().toLowerCase();  // Entferne unnötige Leerzeichen und wandle in Kleinbuchstaben um
  
    return doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm) || 
      doctor.specialty.toLowerCase().includes(searchTerm) || 
      doctor.email.toLowerCase().includes(searchTerm) ||  
      doctor.street.toLowerCase().includes(searchTerm) ||  
      doctor.town.toLowerCase().includes(searchTerm) ||  
      doctor.postal_code.toString().includes(searchTerm)
    );
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}${id}/`);
  }
}
