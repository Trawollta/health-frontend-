import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');  // Token aus dem LocalStorage abrufen
    if (token) {
      return true;  // Zugriff erlaubt, da der Benutzer eingeloggt ist
    } else {
      this.router.navigate(['/login']);  // Falls kein Token vorhanden, zur Login-Seite weiterleiten
      return false;  // Zugriff verweigern
    }
  }
}
