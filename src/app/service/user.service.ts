import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api/user/me/';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<User> {
    return this.http.get<User>(this.apiUrl);  // Benutzerdaten abrufen
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put(this.apiUrl, profileData);  // Profildaten speichern
  }
}
