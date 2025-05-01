import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
    loans:Loan[]=[];
    searchData:string="";
  constructor(private loanService:LoanService,private route:Router) { }

  ngOnInit(): void {
    this.getAllLoans();
  }
  public getAllLoans(){
    this.loanService.getAllLoans().subscribe(data=>{
        this.loans=data;
    })
}

public onEdit(id:number){
     this.route.navigate(['/admineditloan',id]);
}

public onDelete(id:number){
      this.loanService.deleteLoan(id).subscribe(data=>{
        this.getAllLoans();
      })
}

public filterByLoans(){
  this.loanService.getAllLoans().subscribe(data=>{
      this.loans=data;
      this.loans=this.loans.filter(data=>{
        return (data.loanType).includes(this.searchData);
      })
  })
}

}
