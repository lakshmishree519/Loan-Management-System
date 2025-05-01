import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
 
@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
 
 
  feedId:number;
  deleteid:number;
  loanApplicationId:number;
  feedBack:Feedback[]=[];
  feedBacks:Feedback;
  deleteit:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,private feedbackService:FeedbackService,private router:Router) { }
 
  ngOnInit(): void {
    // this.feedId=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    // this.getAllFeedbacksByUserId();
    this.loanApplicationId=parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.loanApplicationId);
    this.getFeedbackByLoanApplicationId();
    console.log();

  }
 
  getAllFeedbacksByUserId(){
    this.feedbackService.getAllFeedbacksByUserId(parseInt(localStorage.getItem('userId'))).subscribe(data=>{
      this.feedBack=data;
    },error=>{
      this.router.navigate(['/error']);
    });
  }

  getFeedbackByLoanApplicationId(){
    this.feedbackService.getFeedbackByLoanApplicationId(this.loanApplicationId).subscribe(data=>{
      this.feedBacks=data;
      console.log(data);
    })
  }
 
  deleteBtn(id:number){
    this.deleteit=true;
    this.deleteid=id;
    console.log(this.deleteid);
    console.log(this.deleteit);
  }
 
  cancel(){
    this.deleteit=false;
  }
 
  yesDelete(){
   this.feedbackService.deleteFeedback(this.deleteid).subscribe(data=>{
    this.getFeedbackByLoanApplicationId();
    this.deleteit=false;
   },error=>{
    this.router.navigate(['/error']);
   })
  }
 
}


