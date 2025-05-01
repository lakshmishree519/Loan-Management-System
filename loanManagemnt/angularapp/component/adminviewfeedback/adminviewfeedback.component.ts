import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  
  feed : Feedback[] = [];
  showdet:boolean=false;
  user : User = {userId:0, email:"", password:"", username:"", mobileNumber:"", userRole:""};

  constructor(private activatedRoute:ActivatedRoute,private feedbackService:FeedbackService, private authService : AuthService){ }
 
  ngOnInit(): void {
        this.feedbackService.getFeedbacks().subscribe(data=>{
            this.feed=data;
        })
  }

  public getUser(userId : number) {
    this.authService.getUserById(userId).subscribe(data=>{
      this.user = data;
    })
  }

  show(userId : number){
    this.showdet=true;
    this.getUser(userId);
  }
 
  close(){
    this.showdet=false;
  }
}
