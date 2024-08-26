import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ExamComponent } from './etudiant/exam/exam.component';
import { EtudiantsComponent } from './professeur/etudiants/etudiants.component';
import { NewExamComponent } from './professeur/new-exam/new-exam.component';
import { SubjectsComponent } from './professeur/subjects/subjects.component';

export const routes: Routes = [
  { path: 'exam/:id', component: ExamComponent },
  { path: 'students', component: EtudiantsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'new-exam', component: NewExamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'exam', pathMatch: 'full' }
];
