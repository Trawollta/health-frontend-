import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from './auth.guard';  // AuthGuard importieren
import { AccountComponent } from './account/account.component';
import { StartscreenComponent } from './startscreen/startscreen.component';

export const routes: Routes = [
  { path: '', component: StartscreenComponent },  // Startbildschirm als Standard
  { path: 'login', component: SignInComponent },  // Login-Seite
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Geschützte Route
  { path: 'doctor/:doctorId/appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'doctor/:doctorId', component: DoctorDetailComponent, canActivate: [AuthGuard] }, // Geschützte Route
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },  // Geschützte Route für Account
  { path: '**', redirectTo: '' },  
];
