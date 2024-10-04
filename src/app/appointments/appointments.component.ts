import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../models/appointment';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  doctorId!: number;
  selectedSlot: string = '';  // Für die Auswahl des Slots (Morning, Afternoon, Evening)
  selectedTime: string = '';  // Für die Auswahl der Uhrzeit
  appointmentType: string = '';  // Für die Auswahl von Online oder Offline
  selectedAppointment?: Appointment;  // Für die Auswahl eines Termins
  availableTimes: string[] = [];  // Verfügbare Uhrzeiten basierend auf dem Slot

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Arzt-ID aus den Routenparametern abrufen und debuggen
    const doctorIdFromRoute = this.route.snapshot.paramMap.get('doctorId');
    console.log('Doctor ID aus Route:', doctorIdFromRoute);  // Debugging der doctorId
    this.doctorId = doctorIdFromRoute ? Number(doctorIdFromRoute) : 0;

    if (this.doctorId && this.doctorId > 0) {
      this.loadAppointments();  // Termine laden
    } else {
      console.error('Doctor ID is missing or invalid');
    }
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor(this.doctorId).subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
        console.log('Termine geladen:', this.appointments);
      },
      (error) => {
        console.error('Fehler beim Laden der Termine:', error);
      }
    );
  }

  // Methode zur Auswahl eines Termins
  selectAppointment(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    console.log('Ausgewählter Termin:', this.selectedAppointment);
    // Optional: Verfügbare Slots und Zeiten basierend auf dem ausgewählten Termin filtern
  }

  // Methode zur Auswahl der Terminart (Online oder Offline)
  selectType(type: string): void {
    this.appointmentType = type;
    console.log('Ausgewählte Terminart:', this.appointmentType);
  }

  // Methode zur Bestätigung des Termins
  confirmAppointment(): void {
    if (
      this.selectedAppointment &&
      this.selectedSlot &&
      this.selectedTime &&
      this.appointmentType
    ) {
      const bookingDetails = {
        doctor: this.doctorId,
        patient_name: 'Max Mustermann',  // Diese Daten sollten idealerweise aus der Authentifizierung stammen
        patient_email: 'max@example.com',  // Diese Daten sollten idealerweise aus der Authentifizierung stammen
        appointment_time: `${this.selectedAppointment.appointment_time.split('T')[0]}T${this.selectedTime}:00`,
        confirmed: true,
        type: this.appointmentType
      };

      this.appointmentService.bookAppointment(bookingDetails as any).subscribe(
        (response) => {
          console.log('Termin erfolgreich gebucht:', response);
          // Optional: Aktualisiere die Terminliste oder navigiere zu einer Bestätigungsseite
        },
        (error) => {
          console.error('Fehler beim Buchen des Termins:', error);
        }
      );
    } else {
      console.error('Bitte alle Felder auswählen, bevor du den Termin bestätigst.');
    }
  }

  // Methode zur Auswahl des Slots (Morning, Afternoon, Evening)
  selectSlot(slot: string): void {
    this.selectedSlot = slot;
    console.log('Ausgewählter Slot:', this.selectedSlot);
    this.updateAvailableTimes();
  }

  // Methode zur Auswahl der Uhrzeit
  selectTime(time: string): void {
    this.selectedTime = time;
    console.log('Ausgewählte Uhrzeit:', this.selectedTime);
  }

  // Methode zur Aktualisierung der verfügbaren Zeiten basierend auf dem Slot
  updateAvailableTimes(): void {
    if (this.selectedSlot === 'Morning') {
      this.availableTimes = ['08:00', '08:20', '08:40', '09:00', '09:20'];
    } else if (this.selectedSlot === 'Afternoon') {
      this.availableTimes = ['12:00', '12:20', '12:40', '13:00', '13:20'];
    } else if (this.selectedSlot === 'Evening') {
      this.availableTimes = ['18:00', '18:20', '18:40', '19:00', '19:20'];
    } else {
      this.availableTimes = [];
    }
  }
}
