import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth-service';
import { UserProfile } from '../models/UserProfile';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileForm: FormGroup;
  successMessage: string | null = null;  // Deklaration der Variablen
  errorMessage: string | null = null;
  user: UserProfile | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      postalCode: ['', [Validators.pattern('^[0-9]{5}$')]],
      city: [''],
      healthInsurance: [''],
      insuranceType: ['']
    });
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (data: UserProfile) => {
        this.user = data;
        this.profileForm.patchValue(data);  // Profildaten ins Formular eintragen
      },
      error => {
        this.errorMessage = 'Fehler beim Laden der Benutzerdaten';
      }
    );
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.authService.updateUserProfile(this.profileForm.value).subscribe(
        response => {
          this.successMessage = 'Profil erfolgreich aktualisiert!';
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = 'Fehler beim Aktualisieren des Profils';
          this.successMessage = null;
        }
      );
    }
  }
}
