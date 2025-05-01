import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loan-application.model';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {

  loanForm: FormGroup;
  loansApplied: Loan[] = [];
  success:boolean=false;
  failure:boolean=false

  constructor(private loanService: LoanService, private formBuilder: FormBuilder, private router: Router) {
    this.loanForm = this.formBuilder.group({
      loanType: this.formBuilder.control("", Validators.required),
      description: this.formBuilder.control("", Validators.required),
      interestRate: this.formBuilder.control("", Validators.required),
      maximumAmount: this.formBuilder.control("", Validators.required),
      repaymentTenure: this.formBuilder.control("", Validators.required),
      eligibility: this.formBuilder.control("", Validators.required),
      documentsRequired: this.formBuilder.control("", Validators.required)
    });
  }

  ngOnInit(): void {
   
    this.loanService.getAllLoans().subscribe(data => {
      this.loansApplied = data; 
    }, error => {
      this.router.navigate(['/error']);
    });
  }

  public get loanType(): FormControl {
    return this.loanForm.get('loanType') as FormControl;
  }

  public get description(): FormControl {
    return this.loanForm.get('description') as FormControl;
  }

  public get interestRate(): FormControl {
    return this.loanForm.get('interestRate') as FormControl;
  }

  public get maximumAmount(): FormControl {
    return this.loanForm.get('maximumAmount') as FormControl;
  }

  public get repaymentTenure(): FormControl {
    return this.loanForm.get('repaymentTenure') as FormControl;
  }

  public get eligibility(): FormControl {
    return this.loanForm.get('eligibility') as FormControl;
  }

  public get documentsRequired(): FormControl {
    return this.loanForm.get('documentsRequired') as FormControl;
  }

  public addNewLoan(): void {
    if (this.loanForm.valid) {
     
      const existingLoan = this.loansApplied.find(loan => loan.loanType.toLowerCase() === this.loanType.value.toLowerCase());

      if (existingLoan) {
        this.failure=true;
        return;
      } 
      console.log(this.loanForm.value);
      this.loanService.addLoan(this.loanForm.value).subscribe(data => {
        console.log(this.loanForm.value);
        this.success=true;
        this.loanForm.reset();
   
        this.ngOnInit();
      }, error => {
        this.router.navigate(['/error']);
      });
    }
  }

  public ok(){
    this.success=false;
  }
}


