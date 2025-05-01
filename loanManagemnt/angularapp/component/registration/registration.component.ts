import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
 success:boolean=false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      userRole: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value ? null : { mismatch: true };
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (registeredUser) => {
          this.successMessage = 'Registration successful!';
        
          this.errorMessage = '';
          this.success=true;
          // this.router.navigate(['/login']);
        },
        (error) => {
           
            this.errorMessage = 'Registration failed. User already present.';
            this.registerForm.reset();
        
        }
      );
    }
  }

  ok(){
     this.success=false;
     this.router.navigate(['/login'])
  }
}
