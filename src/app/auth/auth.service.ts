import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user=new Subject();
private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createUser(data: any) {
  return this.http.post(this. apiUrl+'/students', data);
  }
login(model:any){
  return this.http.put( this.apiUrl+'/login/1', model);
}
  getUsers(type:string){
    return this.http.get(this.apiUrl+'/'+type);
  }
  getRole(){
    return this.http.get(this.apiUrl+'/login/1');
  }

  getStudentById(id:number){
    return this.http.get('http://localhost:3000/students/'+id);
  }

  updateStudent(id:number,model:any){
    return this.http.put('http://localhost:3000/students/'+id,model);
  }
}
