import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,MatRadioModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  users:any[]=[];
  type:string="students";
  
  constructor(private http : HttpClient,
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster :ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getUser();
  }

  createForm() {
    this.loginForm = this.fb.group({
      type:[this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
     
    });
  }
getUser(){
this.service.getUsers(this.type).subscribe((res:any)=>{
  this.users=res;
})
}
submit() {
  let index = this.users.findIndex(item => item.email === this.loginForm.value.email && item.password === this.loginForm.value.password);
  
  if (index === -1) {
    this.toaster.error("Email ou mot de passe incorrect !", "", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut: 5000,
      closeButton: true,
    });
  } else {
    
    const model = {
      username: this.users[index].username, // Assurez-vous que 'username' est défini ici
      role: this.type,
      userId:this.users[index].id,
    
    };

    this.service.login(model).subscribe(
      res => {
        this.service.user.next(res);
        this.toaster.success("Connecté avec succès !", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        });
        this.router.navigate(['/subjects']);
      }
    );
  }
}

getRole(event:any){
  this.type=event.value;
  this.getUser();

}


}
