import { Component, CUSTOM_ELEMENTS_SCHEMA, signal   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Login {
  email:string = '';
  password:string = '';
  isLoading = signal(false);
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

onLogin() {
  this.isLoading.set(true);
  const data = {
    email: this.email,
    password: this.password
  };

  this.authService.login(data).subscribe({
    
    next: (res:any) => {
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("role", res.role);

      if(res.role.toLowerCase() === "admin"){
        localStorage.getItem("role")
        this.router.navigate(['/dashboard/admin']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
      this.isLoading.set(false);
    },

    error: () => {
      this.isLoading.set(false);
      alert("Invalid login credentials");
    }
  });
 }
}
