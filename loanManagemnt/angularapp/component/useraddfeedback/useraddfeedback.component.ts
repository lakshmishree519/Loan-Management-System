import { Component, OnInit, ɵExtraLocaleDataIndex } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Loan } from 'src/app/models/loan.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedBackForm : FormGroup;
  loanId:number;
  loan:LoanApplication;
  constructor(private formBuilder : FormBuilder, private service : FeedbackService,private activatedRoute:ActivatedRoute,private loanApplicationService:LoanService) {
    this.feedBackForm = formBuilder.group({
      feedbackText : formBuilder.control("", Validators.required)
    });
  }

  public get feedbackText() : FormControl{
    return this.feedbackText.get('feedbackText') as FormControl;
  }

  ngOnInit(): void {
    this.loanId=parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.loanApplicationService.getLoanApplicationById(this.loanId).subscribe(data=>{
         this.loan=data;
         console.log(this.loan);
    })
    console.log(this.loanId);
  }

  public addFeedback() : void{
      
    let feedback : Feedback = {
      user : {
        userId:+localStorage.getItem('userId')
      },
      feedbackText : this.feedBackForm.value.feedbackText,
      loanApplication:{
        loanApplicationId:this.loanId,
      },
      date  : new Date()
    }
    this.service.sendFeedback(feedback).subscribe(data=>{
      console.log(feedback);
            
      this.loanApplicationService.updateLoanApplicaticationFeedbackStatus(this.loanId,this.loan).subscribe(data=>{});
      alert("Successfully added!");
      this.feedBackForm.reset();
    });
  }

}


