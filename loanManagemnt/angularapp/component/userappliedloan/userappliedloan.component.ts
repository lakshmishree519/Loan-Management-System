import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {

  appliedLoans : LoanApplication[] = []
  deleteconfirm : boolean = false;
  searchData : string = "";
  loanId : number;

  constructor(private loanService: LoanService, private router: Router) { 
  }

  ngOnInit(): void {
        this.getAppliedLoans();
  }
   
  public getAppliedLoans(){
    this.loanService.getAppliedLoans(parseInt(localStorage.getItem('userId'))).subscribe(data=>{
      if(data && data.length>0){
       this.appliedLoans = data;
      }
      else{
        console.log("No applied loans received from service");
      }
    });
  }

  public confirmDelete(loanId : number) {
    this.deleteconfirm = true;
    this.loanId = loanId;
    console.log("confirmDelete" + loanId);
  }
  
  public onDelete(){
    console.log("onDelete" + this.loanId);
    this.loanService.deleteLoanApplication(this.loanId).subscribe(data=>{
    this.deleteconfirm = false;
    this.getAppliedLoans();
    });
  }
   
  public onCancel(){
    this.deleteconfirm = false;
  }

  public filterAppliedLoan(){
    this.loanService.getAppliedLoans(parseInt(localStorage.getItem('userId'))).subscribe(data=>{
      this.appliedLoans=data;
      this.appliedLoans=this.appliedLoans.filter(data=>{
        return (data.loan.loanType).includes(this.searchData);
      });
   });
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case -1:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

}
