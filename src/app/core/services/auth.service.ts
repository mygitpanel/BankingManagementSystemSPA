import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7182/api/auth';

  constructor(private http: HttpClient) {}

  register(data:any){
  return this.http.post(
    "https://localhost:7182/api/auth/register",
    data
  );
}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

 logout(){
  localStorage.clear();
}
}