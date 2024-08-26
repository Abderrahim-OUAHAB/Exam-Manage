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
import { AuthService } from '../../auth/auth.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-etudiants',
  standalone: true,
        imports: [ CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        MatRadioModule,
        MatStepperModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
      MatPaginatorModule],
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.scss'
})

export class EtudiantsComponent implements OnInit {
  dataSource:any
  datatable:any
  displayedColumns:any
  constructor(private service:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
   }

  
  ngOnInit(): void {
    this.getStudents()
  }


  getStudents() {
   this.service.getUsers('students').subscribe((res:any)=>{
     this.dataSource=res.map((student:any)=>{
      if(student?.subjects){
        return student?.subjects.map((subject:any)=>{

          return {
           name:student?.username,
           subjectName:subject?.name,
           degree:subject?.degree
          }
        })
        
      }else{
     

          return [{
           name:student?.username,
           subjectName:"-",
           degree:"-"
          }]

      }
    
     })
     this.datatable=[];
     this.dataSource.forEach((element:any) => {
       element.forEach((element:any) => {
         this.datatable.push({
          name:element?.name,
          subjectName:element?.subjectName,
          degree:element?.degree
         })
       })
     })
   })
  }
}