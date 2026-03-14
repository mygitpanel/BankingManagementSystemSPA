import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-create-user',
  imports: [FormsModule],
  templateUrl: './admin-create-user.html',
  styleUrl: './admin-create-user.css',
})
export class AdminCreateUser {

isLoading = signal(false);
showSuccessPopup = signal(false);
createdAccountNumber = signal('');

fullName=''
email=''
password=''
phoneNumber=''
dateOfBirth=''
gender=''
nationality=''
maritalStatus=''
religion=''

aadhaarNumber=''
panNumber=''

permanentAddress=''
currentAddress=''
city=''
state=''
pincode=''

nomineeName=''
nomineeRelation=''
nomineeDOB=''
nomineePhone=''

balance:number = 0;
accountType='Savings'
isActive=true

constructor(private authService:AuthService){}

createUser(form:any){
debugger;
  if(form.invalid){
    return;
  }

  this.isLoading.set(true);

  const data = form.value;

  this.authService.register(data).subscribe({

    next:(res:any)=>{

      this.isLoading.set(false);

      this.createdAccountNumber.set(res.accountNumber);

      this.showSuccessPopup.set(true);

      form.resetForm();

      console.log(res);

    },

    error:(err)=>{

      this.isLoading.set(false);

      alert("Error Creating Account");

      console.error(err);

    }

  });

}
closePopup(){

this.showSuccessPopup.set(false);

}
}
