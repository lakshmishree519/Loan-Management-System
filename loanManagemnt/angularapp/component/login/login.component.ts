import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errorMessage : boolean = false;
  success:boolean=false;
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) { 
    this.loginForm = this.formBuilder.group({
      username:formBuilder.control("",Validators.required),
      password:formBuilder.control("",Validators.required)
    })
  }

  public get username():FormControl{
    return this.loginForm.get("username") as FormControl;
  }

  public get password():FormControl{
    return this.loginForm.get("password") as FormControl;
  }
  ngOnInit(): void {
  }

  public login(){
    this.authService.login(this.loginForm.value,(returnFlag : boolean)=>{
      this.errorMessage = !returnFlag;
      if(!this.errorMessage)
      this.success=true;
    })
  }
   public ok(){
       this.success=false;
       this.router.navigate(['/home']);
   }
  }

