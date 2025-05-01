import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {
  loans:Loan[]=[];
  appliedLoans:LoanApplication[]=[];
  searchData:string="";

  constructor(private loanService:LoanService,private route:Router) { }

  ngOnInit(): void {
    this.getAllLoans();
    this.getAppliedLoans();
  }


  public getAllLoans(){
         this.loanService.getAllLoans().subscribe(data=>{
             this.loans=data;
         })
  }


  public onSubmit(){
     this.route.navigate(['/applyLoan']);
  }


  public filterByLoans(){
    this.loanService.getAllLoans().subscribe(data=>{
        this.loans=data;
        this.loans=this.loans.filter(data=>{
          return JSON.stringify(data).includes(this.searchData);
        })
    })
  }


  public getAppliedLoans(){
    this.loanService.getAppliedLoans(parseInt(localStorage.getItem('userId'))).subscribe(data=>{
      if(data&&data.length>0){
       this.appliedLoans=data;
      }
      else{
        console.log("No applied loans received from service");
      }
    });
  }
 
  public onApply(id:number){
   this.route.navigate(["/applyLoan",id])
  }

 public isAppliedLoan(chosenloan:Loan){
    for(let l of this.appliedLoans){
      if(l.loan.loanId==chosenloan.loanId){
        return true;
      }
    }
    return false;
 }

}
