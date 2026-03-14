import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-list.html',
  styleUrls: ['./account-list.css']  
})
export class AccountList {
  /**
   *
   */
  constructor(private accountService: AccountService) {
    
  }
  searchAccountNumber = '';
  accountDetails = signal<any>(null);
  role = signal('');

  ngOnInit(){

  const storedRole = localStorage.getItem("role");

  this.role.set(storedRole ?? '');

  if(this.role() === 'User'){
    this.loadUserAccount();
  }
}

  searchAccount(){

  this.accountService
  .getAccountDetails(this.searchAccountNumber)
  .subscribe((res:any)=>{

  this.accountDetails.set(res);

});

}

loadUserAccount(){

const user = JSON.parse(localStorage.getItem("user") || '{}');

this.accountService
.getAccountDetails(user.accountNumber)
.subscribe((res:any)=>{

this.accountDetails.set(res);

});

}
}
