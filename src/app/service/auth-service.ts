import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:8000/api/register/'; 
  private loginUrl = 'http://localhost:8000/api-token-auth/';

  constructor(private http: HttpClient) { }

  // Registrierungsmethode
  register(userData: { username: string, email: string, password1: string, password2: string }): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  // Login-Methode
  login(credentials: { username: string | null, password: string | null }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}
