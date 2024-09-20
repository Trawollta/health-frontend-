import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Doctor } from '../models/doctors';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss'
})
export class DoctorDetailComponent implements OnInit {
  doctor: Doctor | undefined;
  patientName: string = '';
  patientEmail: string = '';
  appointmentTime: string | null = null;  // Gewählter Zeit-Slot als String
  availableTimeSlots: { start: string, end: string }[] = [];  // Zeit-Slots als Array

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorService.getDoctorById(+id).subscribe((doctor: Doctor | undefined) => {
        this.doctor = doctor;
        this.generateTimeSlots();  // Generiere die Zeit-Slots bei der Initialisierung
      });
    }
  }

  // Zeit-Slots von 8:00 bis 17:00 in 30-Minuten-Intervallen generieren
  generateTimeSlots(): void {
    const startHour = 8;  // Beginn um 8:00 Uhr
    const endHour = 17;   // Ende um 17:00 Uhr
    const interval = 30;  // 30-Minuten-Intervalle

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const startTime = new Date();
        startTime.setHours(hour);
        startTime.setMinutes(minute);
        startTime.setSeconds(0);

        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + 30);  // 30 Minuten hinzufügen

        this.availableTimeSlots.push({
          start: startTime.toISOString(),
          end: endTime.toISOString()
        });
      }
    }
  }

  // Methode, um den ausgewählten Zeit-Slot zu speichern
  selectTimeSlot(slot: { start: string, end: string }): void {
    this.appointmentTime = slot.start;  // Startzeit des ausgewählten Slots speichern
  }

  // Methode zur Terminbuchung
  bookAppointment(): void {
    if (this.doctor && this.patientName && this.patientEmail && this.appointmentTime) {
      const appointment: Appointment = {
        doctor: this.doctor.id,
        patient_name: this.patientName,
        patient_email: this.patientEmail,
        appointment_time: this.appointmentTime,  // Verwende die Startzeit des ausgewählten Slots
        confirmed: false
      };

      this.appointmentService.bookAppointment(appointment).subscribe(
        (response) => {
          alert('Termin erfolgreich gebucht!');
        },
        (error) => {
          alert('Fehler beim Buchen des Termins.');
        }
      );
    }
  }
}
