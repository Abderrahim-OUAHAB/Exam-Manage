import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatRadioModule,MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  useForm!: FormGroup;
  students:any[]=[];
  type:string="students";
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster :ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getStudents();
  }

  createForm() {
    this.useForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
getStudents(){
this.service.getUsers(this.type).subscribe((res:any)=>{
  this.students=res;
})
}
  submit() {
    const model = {
      username: this.useForm.get('username')?.value,
      email: this.useForm.get('email')?.value,
      password: this.useForm.get('password')?.value,
    };
    let index=this.students.findIndex(item=>item.email==this.useForm.value.email);
    if(index!==-1){
      this.toaster.error("Email déja exister ! ","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true,
      })
    }else{
    this.service.createUser(model).subscribe(
      (res:any) => {
       this.toaster.success("Compte crée avec succes !","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:5000,
        closeButton:true,
      })

    const model = {
      username: res.username, // Assurez-vous que 'username' est défini ici
      role:"students",
      userId:res.id,
    
    };

    this.service.login(model).subscribe(
      res => {
        this.service.user.next(res);
     
      }
    );
      
        this.router.navigate(['/subjects']);
      }
    );
  }
}
}
