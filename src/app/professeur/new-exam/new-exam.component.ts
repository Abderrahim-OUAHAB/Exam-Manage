import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { DoctorServiceService } from '../doctor-service.service';
@Component({
  selector: 'app-new-exam',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule,MatStepperModule,MatButtonModule],
  templateUrl: './new-exam.component.html',
  styleUrl: './new-exam.component.scss'
})
export class NewExamComponent implements OnInit {
  name=new FormControl("");
  questionForm!:FormGroup;
  questions:any[]=[];
  correctId:any;
  startAdd:boolean=false;
  preview:boolean=false;
  nomSubject:any="";
  stepperIndex=0;
  id:any;
  constructor(private fb:FormBuilder, private toaster :ToastrService,private service:DoctorServiceService){}

  ngOnInit(): void {
 this.createForm();
  }


  createForm(){
    this.questionForm=this.fb.group({
      question:['',[Validators.required]],
      answer1:['',[Validators.required]],
      answer2:['',[Validators.required]],
      answer3:['',[Validators.required]],
      answer4:['',[Validators.required]],
     
    })
  }
  submit(){
    const model={
      name:this.nomSubject,
      questions:this.questions,
    }
   
    if(this.preview){
      this.stepperIndex=2;
    }else{
      this.service.createSubject(model).subscribe((res:any)=>{
        this.preview=true;
        this.id=res.id;
      })
    }
  }

  createQuestion(){
if(this.correctId){
  const model={
    question:this.questionForm.value.question,
    answer1:this.questionForm.value.answer1,
    answer2:this.questionForm.value.answer2,
    answer3:this.questionForm.value.answer3,
    answer4:this.questionForm.value.answer4,
    correctAnswer:this.questionForm.value[this.correctId],

  }
  this.questions.push(model);
  this.questionForm.reset();
}else{
  this.toaster.error("Entrez une reponse vrai !", "", {
    disableTimeOut: false,
    titleClass: "toastr_title",
    messageClass: "toastr_message",
    timeOut: 5000,
    closeButton: true,
  });
}

  }
  getCorrect(event:any){
    this.correctId=event.value;
   
  }
start(){
  if(this.name.value==""){
    this.toaster.error("Entrez une matière !", "", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut: 5000,
      closeButton: true,
    }); 
  }else{
 
    this.startAdd=true;
  this.nomSubject= this.name.value;
  }
  if(this.startAdd){
    this.stepperIndex=1;
  }
}
clearForm(){
  this.questionForm.reset();
}
cancel(){
  this.questionForm.reset();
  this.questions=[];
  this.nomSubject="";
  this.name.reset();
  this.stepperIndex=0;
  this.startAdd=false;
}
delete(index:number){
  this.questions.splice(index,1);
  const model={
    name:this.nomSubject,
    questions:this.questions,
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
}
