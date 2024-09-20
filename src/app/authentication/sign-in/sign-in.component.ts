import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth-service';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatInputModule, MatIconModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(false)
  });

  hide = true;
  loginError: string | null = null;
  registrationSuccessMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    if (this.signInForm.valid) {
      const username = this.signInForm.get('username')?.value!;
      const password = this.signInForm.get('password')?.value!;
  
      try {
        // AuthService für Login aufrufen
        const response = await this.authService.login({ username, password }).toPromise();
  
        if (response && response.token) {
          // Token speichern und den Benutzer zur HomeComponent weiterleiten
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']);  // Weiterleitung zur HomeComponent
        }
      } catch (error) {
        // Fehler beim Login behandeln
        this.loginError = 'Login fehlgeschlagen. Bitte überprüfen Sie Ihren Benutzernamen oder Ihr Passwort.';
      }
    }
  }

  checkRegistrationMessage() {
    const message = localStorage.getItem('registrationSuccessMessage');
    if (message) {
      this.registrationSuccessMessage = message;
      localStorage.removeItem('registrationSuccessMessage');
    }
  }

  ngOnInit() {
    this.checkRegistrationMessage();
  }
}
