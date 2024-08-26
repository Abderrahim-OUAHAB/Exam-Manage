import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  createSubject(model:any){
    return this.http.post(this.apiUrl+'/subjects',model);
  }

  updateSubject(model:any,id:number){
    return this.http.put(this.apiUrl+'/subjects/'+id,model);
  }
  getAllSubjects(){
    return this.http.get(this.apiUrl+'/subjects');
  }

    
  getSubjectById(id:any){
    return this.http.get(this.apiUrl+'/subjects/'+id);
  }
  deleteSubjects(id:number){
    return this.http.delete(this.apiUrl+'/subjects/'+id);
  }
}
