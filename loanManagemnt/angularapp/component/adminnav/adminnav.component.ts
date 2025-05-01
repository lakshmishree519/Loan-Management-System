import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  val: string = "";
  username: string = ""; 

  constructor(private router: Router, private authService: AuthService) { }
 
  ngOnInit(): void {
    this.getUsername(); 
  }

  getUsername(): void {
    const userId = parseInt(localStorage.getItem('userId')); 
    this.authService.getUserById(userId).subscribe(data => {
      this.username = data.username; 
    });
  }

  logout(): void {
    this.authService.logout();
  }
}