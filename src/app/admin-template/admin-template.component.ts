import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
  constructor(public authService : AuthenticationService, private router : Router){
    
  }

  handlelogout(){
    this.authService.logout().subscribe({
      next : (data)=>{
        this.router.navigateByUrl("/login");
      }
    })
  }
}
