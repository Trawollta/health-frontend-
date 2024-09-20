import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileForm: FormGroup;  // Formular für die Profildaten
  user: User | undefined;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.profileForm = this.fb.group({
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      healthInsurance: ['', Validators.required],
      insuranceType: ['', Validators.required],  // Privat oder Gesetzlich
    });
  }

  ngOnInit(): void {
    // Hole vorhandene Benutzerdaten
    this.userService.getUserData().subscribe(data => {
      this.user = data;
      // Fülle das Formular mit den vorhandenen Benutzerdaten
      this.profileForm.patchValue({
        address: data.address,
        postalCode: data.postalCode,
        city: data.city,
        healthInsurance: data.healthInsurance,
        insuranceType: data.insuranceType
      });
    });
  }

  // Methode zum Speichern der Daten
  saveProfile() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      this.userService.updateUserProfile(updatedProfile).subscribe(
        response => {
          alert('Profil erfolgreich aktualisiert!');
        },
        error => {
          alert('Fehler beim Speichern des Profils.');
        }
      );
    }
  }
}
