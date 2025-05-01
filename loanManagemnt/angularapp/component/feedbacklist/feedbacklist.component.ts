import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbacklistComponent implements OnInit {

  approvedLoans : LoanApplication[] = [];
  searchData : string = "";

  constructor(private loanService: LoanService, private router: Router) { 
  }

  ngOnInit(): void {
    console.log(this.getApprovedLoans());
        this.getApprovedLoans();
        
  }
   
  public getApprovedLoans() {
    this.loanService.getAppliedLoans(parseInt(localStorage.getItem('userId'))).subscribe(data => {
      if(data && data.length > 0) {
       this.approvedLoans = data.filter(loan => loan.loanStatus === 1);
      }
      else {
        console.log("No approved loans received from service");
      }
    });
  }

  public filterApprovedLoans() {
    this.loanService.getAppliedLoans(parseInt(localStorage.getItem('userId'))).subscribe(data => {
      this.approvedLoans = data.filter(loan => loan.loanStatus === 1 && loan.loan.loanType.includes(this.searchData));
   });
  }

  public giveFeedback(loanApplicationId: number) {
    this.router.navigate(['/addUserFeedback',loanApplicationId]);
  }

  public viewFeedback(loanApplicationId: number) {
    this.router.navigate(['/viewUserFeedback',loanApplicationId]);
  }
}
