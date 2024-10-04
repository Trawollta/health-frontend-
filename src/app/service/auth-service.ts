import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/api/register/'; 
  private loginUrl = 'http://localhost:8000/api/login/'; 
  private logoutUrl = 'http://localhost:8000/api/logout/'; 
  private userApiUrl = 'http://localhost:8000/api/user/me/';

  constructor(private http: HttpClient) { }

  // Registrierungsmethode
  register(userData: { username: string, email: string, password1: string, password2: string }): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  
login(credentials: { username: string | null, password: string | null }): Observable<any> {
  return this.http.post<any>(this.loginUrl, credentials).pipe(
    map((response: any) => {
      if (response && response.token) {
        // Token im localStorage speichern
        localStorage.setItem('authToken', response.token);
      }
      return response;
    })
  );
}

  logout(): void {
    localStorage.removeItem('authToken'); 
  }

  getUserData(): Observable<User> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}` 
    });
  
    return this.http.get<User>(this.userApiUrl, { headers });
  }
  
  updateUserProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('authToken');  // Token aus localStorage holen
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`  // Token im Header setzen
    });
  
    return this.http.put(this.userApiUrl, profileData, { headers });
  }
  
}
