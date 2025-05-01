import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {

  loansApplied: LoanApplication[] = [];
  selectedLoan: LoanApplication;
  searchText: string = '';
  selectedStatus: number;

  constructor(private loanService: LoanService, private router: Router) { }

  ngOnInit(): void {
    this.getLoans();
  }

  getLoans() {
    this.loanService.getAllLoanApplications().subscribe(data => {
      this.loansApplied = data;
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  filteredLoans() {
    this.loanService.getAllLoanApplications().subscribe(data => {
      this.loansApplied = data.filter(value =>
        value.loan.loanType.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  sort() {
    if (this.selectedStatus === undefined) {
      this.getLoans();
    } else {
      this.loanService.getAllLoanApplications().subscribe(data => {
        this.loansApplied = data.filter(data => data.loanStatus === this.selectedStatus);
      }, error => {
        this.router.navigate(['/error']);
      });
    }
  }

  showMore(loan: LoanApplication): void {
    this.selectedLoan = loan;
  }

  closeModal(): void {
    this.selectedLoan = null;
  }

  approveLoan(loanApplicationId: number, loan: LoanApplication): void {
    loan.loanStatus = 1;
    this.loanService.updateLoanStatus(loanApplicationId, loan).subscribe(data => {
      this.getLoans(); 
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  rejectLoan(loanApplicationId: number, loan: LoanApplication): void {
    loan.loanStatus = -1;
    this.loanService.updateLoanStatus(loanApplicationId, loan).subscribe(data => {
      this.getLoans(); 
    }, error => {
      this.router.navigate(['/error']);
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
