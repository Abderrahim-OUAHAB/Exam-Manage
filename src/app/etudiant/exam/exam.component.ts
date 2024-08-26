import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { DoctorServiceService } from '../../professeur/doctor-service.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule,
    MatStepperModule
    ,MatButtonModule,
  MatCardModule,
  MatIconModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent implements OnInit{
  id:any;
  subject:any;
  user:any=[];
  res:number=0;
  showResult:boolean=false;
  studentInfo:any;
  userSubjects:any[]=[];
  validExam:boolean=true;
    constructor(private route :ActivatedRoute,
                private service :DoctorServiceService,
                private toaster:ToastrService,
                private auth:AuthService){}
  ngOnInit(): void {
  this.id=this.route.snapshot.paramMap.get('id');
  this.getSubject();
  this.getLoggedInInfo();
  }

    getSubject(){
      this.service.getSubjectById(this.id).subscribe(res=>{
        this.subject=res;
      })
    }
    delete(index:number){
      this.subject.questions.splice(index,1);
      const model={
        name:this.subject.name,
        questions:this.subject.questions,
      }
      this.service.updateSubject(model,this.id).subscribe(res=>{
        this.toaster.success("Question supprimé avec succes !", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        });  
      })
    }
    getLoggedInInfo(){
      this.auth.getRole().subscribe(res=>{
        this.user=res;
        this.getUserData();
      })
   
    }
    getUserData(){
      this.auth.getStudentById(this.user.userId).subscribe((res:any)=>{
        this.studentInfo=res;
        this.userSubjects=res?.subjects ? res?.subjects :[];
        this.checkValidExam();
      })
    }
    getAnswer(event:any){
      let value=event.value; 
      let qstIndex=event.source.name;
      this.subject.questions[qstIndex].studentAnswer=value;

    }

    checkValidExam(){
     for(let i in this.userSubjects ){
      if(this.userSubjects[i].id==this.id){
        this.res=this.userSubjects[i].degree;
        this.validExam=false;
        this.toaster.warning("Vous avez répondu à ce examen !", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        });
      }
     }
    }
    getResult(){
      this.res=0;
      for(let i in this.subject.questions){
        if(this.subject.questions[i].studentAnswer == this.subject.questions[i].correctAnswer ){
            this.res++;
        }
      }
      this.showResult=true;
      this.userSubjects.push({
        name:this.subject.name,
        id:this.subject.id,
        degree:this.res,
      })

      const model = {
        username: this.studentInfo.username,
        email: this.studentInfo.email,
        password:this.studentInfo.password,
        subjects:this.userSubjects,
      };
      this.auth.updateStudent(this.user.userId,model).subscribe(res=>{
        this.toaster.success("Resultat enregistré avec succès !", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        });

      })
    }
}
