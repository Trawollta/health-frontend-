import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../models/doctors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { DoctorCardComponent } from "../doctor/doctor-card/doctor-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppointmentsComponent, DoctorCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm: string = '';
  currentSlide: number = 0;  

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
      this.filteredDoctors = data; 
    });
  }

  searchDoctors() {
    this.filteredDoctors = this.searchTerm
      ? this.doctorService.searchDoctors(this.doctors, this.searchTerm)
      : this.doctors; 
  }


  nextSlide(): void {
    const cardContainer = document.querySelector('.doctor-cards');
    if (cardContainer) { 
      cardContainer.scrollBy({ left: 250, behavior: 'smooth' });
    }
  }
  
  prevSlide(): void {
    const cardContainer = document.querySelector('.doctor-cards');
    if (cardContainer) {  
      cardContainer.scrollBy({ left: -250, behavior: 'smooth' });
    }
  }
}
