import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../models/doctors';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, RouterLink],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss'
})
export class DoctorDetailComponent implements OnInit {
  doctorId!: string;  // Variable zum Speichern der Doctor ID
  doctor!: Doctor;    // Variable zum Speichern der Arzt-Daten

  constructor(
    private route: ActivatedRoute,  // ActivatedRoute-Dienst zur Nutzung der Routenparameter
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Doctor ID aus der Route extrahieren
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;  // Hier wird der Parameter ausgelesen

    if (this.doctorId) {
      // Wenn die ID vorhanden ist, lade die Arzt-Daten
      this.loadDoctor();
    } else {
      console.error('Doctor ID is missing or invalid');
    }
  }

  loadDoctor(): void {
    this.doctorService.getDoctorById(Number(this.doctorId)).subscribe(
      (data: Doctor) => {
        this.doctor = data;
      },
      (error) => {
        console.error('Error loading doctor details', error);
      }
    );
  }

  goToAppointments(): void {
    this.router.navigate(['/doctor', this.doctorId, 'appointments']);  // Weiterleitung mit doctorId
  }
}