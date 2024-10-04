import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctors';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:8000/api/doctors/';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  searchDoctors(doctors: Doctor[], searchTerm: string): Doctor[] {
    searchTerm = searchTerm.trim().toLowerCase();
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
