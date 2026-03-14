import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
role: string | null = '';
fullname: string | null = '';

constructor(
  private authService: AuthService,
  private router: Router
){}

user:any;

ngOnInit(){
  const user = localStorage.getItem("user");

  if(!user){
    this.router.navigate(['/']);
  } 

  this.user = JSON.parse(localStorage.getItem("user")!);
  this.fullname = this.user.fullName;
  this.role = localStorage.getItem("role");
  }
   
  logout(){
  localStorage.clear();

  this.router.navigateByUrl('/', { replaceUrl: true });

}
  
}


