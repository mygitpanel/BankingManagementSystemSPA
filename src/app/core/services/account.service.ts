import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'https://localhost:7182/api/auth';

  constructor(private http: HttpClient) {}

  getAccountDetails(accountNumber:any){
        return this.http.get(`https://localhost:7182/api/account/account/${accountNumber}`);
    }
}