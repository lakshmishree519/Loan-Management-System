
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
 
@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
 
 
  editForm:FormGroup;
  loanId:number=0;
  ln:Loan;
  constructor(private router:Router,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private loanService:LoanService) {
    this.editForm=this.formBuilder.group({
      loanId:formBuilder.control(""),
      loanType:formBuilder.control("",Validators.required),
      description:formBuilder.control("",Validators.required),
      interestRate:formBuilder.control("",[Validators.required,Validators.min(0)]),
      maximumAmount:formBuilder.control("",[Validators.required,Validators.min(0)]),
      repaymentTenure:formBuilder.control("",[Validators.required,Validators.min(0)]),
      eligibility:formBuilder.control("",Validators.required),
      documentsRequired:formBuilder.control("",Validators.required)
    })
   }
 
  ngOnInit(): void {
     console.log("ddddddddd1234444444444444444444444444");
    this.loanId=parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
     console.log("laonidnnnn"+this.loanId);

    this.loanService.getLoanById(this.loanId).subscribe(data=>{
      console.log(data);
      this.ln=data;
      this.editForm.setValue(this.ln);
    },error=>{
      this.router.navigate(['/error'])
    })
  }
 
  public updateForm():void{
    this.ln=this.editForm.value;
    this.loanService.updateLoan(this.loanId,this.ln).subscribe(data=>{
      alert("Suceessfully Updated!");
      this.router.navigate(['/adminLoanList'])
    },error=>{
      this.router.navigate(['/error'])
    })
 
  }
 
  Back():void{
    this.router.navigate(['/adminLoanList']);
 
  }
 
  public get loanType():FormControl{
    return this.editForm.get('loanType') as FormControl;
  }
 
  public get description():FormControl{
    return this.editForm.get('description') as FormControl;
  }
 
  public get interestRate():FormControl{
    return this.editForm.get('interestRate') as FormControl;
  }
 
  public get maximumAmount():FormControl{
    return this.editForm.get('maximumAmount') as FormControl;
  }
 
  public get repaymentTenure():FormControl{
    return this.editForm.get('repaymentTenure') as FormControl;
  }
 
  public get eligibility():FormControl{
    return this.editForm.get('eligibility') as FormControl;
  }
 
  public get documentsRequired():FormControl{
    return this.editForm.get('documentsRequired') as FormControl;
  }
 
}
 