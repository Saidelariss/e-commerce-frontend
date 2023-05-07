import { Injectable } from '@angular/core';
import { AppUser } from '../model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users : AppUser[]=[];
  authenticatedUser : AppUser | undefined;


  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["USER"]},
    {userId:UUID.UUID(),username:"user2",password:"1234",roles:["USER"]},
    {userId:UUID.UUID(),username:"admin",password:"1234",roles:["ADMIN"]}
    )
   }

   public login(username:string, password:string): Observable<AppUser>{
    console.log(username);
    let user = this.users.find(user=>{ //normalement le back-end qui fait ce travail
            return  user.username==username
    });
    // let user = this.users.find(u=> u.username==username);
    console.log(user);
    
    if(!user) return throwError(()=>new Error("User not found"));
    if(user.password != password) return throwError(()=>new Error("Bad credentials"));
    return of(user);
   }

   public authenticateUser(appUSer : AppUser):Observable<Boolean>{
    this.authenticatedUser = appUSer;
    localStorage.setItem("authUser",JSON.stringify({username:appUSer.username,roles:appUSer.roles,jwt:"JWT_TOKEN"}));
    return of(true);
   }

   public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
   }

   public isAuthenticated(){
    return this.authenticatedUser!=undefined;
   }

   public logout(): Observable<boolean> {
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true)
   }
}
