import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Loginresponsedto } from '../models/loginresponsedto.model';
import { Router } from '@angular/router';
import { Logindto } from '../models/logindto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl ="https://ide-bffddefaddacbcffbbfbbacdfafccfdfcdfdeacdcff.premiumproject.examly.io/proxy/8080";
  role:String ="";
  constructor(private httpClient : HttpClient,private router:Router) { }

  public register(user:User):Observable<User>{
    
    return this.httpClient.post(this.apiUrl+"/api/register",user) as Observable<User>;
  }

  public getUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl+"/api");
  }

  public getUserById(userId : number) : Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+"/api/user/"+userId);
  }

  public deleteUser(userId : number) : Observable<void>{
    return this.httpClient.delete<void>(this.apiUrl+"/api/deleteUser/"+userId);
  }

  // public login(login : Login) : Observable<any>{
  //   return this.httpClient.post(this.apiUrl+"/api/login",login) as Observable<any>;
  // }

  public login(user : Logindto,callback : any){
    this.httpClient.post(this.apiUrl+"/api/login",user).subscribe((data : Loginresponsedto)=>{
      
      if(data && data.jwtToken){
      localStorage.setItem("jwttoken",data.jwtToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId",data.userId+"");
      localStorage.setItem("role", data.role);
      console.log("Login successful");
      console.log(data);
      if(data.role == "ADMIN"){
        
        this.role = new String("ADMIN")
      }
      else{
        
        this.role = new String("USER")
      }
      callback(true);
    }else {
      
      callback(false);
    }},error =>{
      callback(false);
      console.log("jjdjdjj");
    });
  }

  public isLoggedIn() : boolean {
    console.log("ssss");
    let jwttoken = localStorage.getItem("jwttoken")
    if(jwttoken || jwttoken){
      
      return true;
    }
    else
      return false;
  }

  public isAdmin(){
    if(this.isLoggedIn() && localStorage.getItem("role")=="ADMIN")
      return true;
    else
      return false;
  }

  public isUser(){
    if(this.isLoggedIn() && localStorage.getItem("role")=="USER")
      return true;
    else
      return false;
  }

  public updateUser(userId : number,User : User) : Observable<User>{
    return this.httpClient.put<User>(this.apiUrl+"/"+userId,User);
  }
  
  logout(){
    localStorage.clear()
    this.router.navigate(['/home'])
  }

}
