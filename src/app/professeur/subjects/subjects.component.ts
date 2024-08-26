import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { DoctorServiceService } from '../doctor-service.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule,MatStepperModule,MatButtonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit{
  subjects:any[]=[];
  user:any={};
  constructor(private service :DoctorServiceService,private auth:AuthService,private toaster:ToastrService){}
  ngOnInit(): void {
   this.getSubjects();
   this.getUserInfo();
  }

  getSubjects(){
   this.service.getAllSubjects().subscribe((res:any)=>{
    this.subjects=res;
    })
  }
getUserInfo(){
  this.auth.getRole().subscribe(res=>{
    this.user=res;
  })
}

delete(index:number){
  let id=this.subjects[index].id;
  this.subjects.splice(index,1);
  this.service.deleteSubjects(id).subscribe(res=>{
    this.toaster.success("Matière supprimée avec succès !", "", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut: 5000,
      closeButton: true,
    });  
  });
}


}
