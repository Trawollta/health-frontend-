import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../models/doctors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm: string = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    // Ärzte vom Backend laden
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
      this.filteredDoctors = data;  // Zeige alle Ärzte anfangs an
    }, error => {
      console.error("Fehler beim Laden der Ärzte:", error);
    });
  }
  

  searchDoctors() {
      this.filteredDoctors = this.doctorService.searchDoctors(this.doctors, this.searchTerm);
    }
  }

