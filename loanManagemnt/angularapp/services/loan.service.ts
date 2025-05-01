import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { Observable } from 'rxjs';
import { LoanApplication } from '../models/loan-application.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl ="https://ide-bffddefaddacbcffbbfbbacdfafccfdfcdfdeacdcff.premiumproject.examly.io/proxy/8080";

  constructor(private httpClient : HttpClient) { }

  getAllLoans():Observable<Loan[]>{
    return this.httpClient.get(this.apiUrl+"/api/loan") as Observable<Loan[]>;
  }

  deleteLoan(loanId : number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/loan/"+loanId) as Observable<any>;
  }

  getLoanById(id: number):Observable<Loan>{
    return this.httpClient.get(this.apiUrl+"/api/loan/"+id) as Observable<Loan>;
  }

  public addLoan(loan : Loan):Observable<Loan>{
    return this.httpClient.post(this.apiUrl+"/api/loan",loan) as Observable<Loan>;
  }

  updateLoan(id:number,loan:Loan):Observable<Loan>{
    return this.httpClient.put(this.apiUrl+"/api/loan/"+id,loan) as Observable<Loan>;
  }

  addLoanApplication(loanApplication : LoanApplication): Observable<LoanApplication>{
    return this.httpClient.post(this.apiUrl+"/api/loanapplication",loanApplication) as Observable<LoanApplication>;
  }

  getAppliedLoans(userId : number):Observable<LoanApplication[]>{
    return this.httpClient.get(this.apiUrl+"/api/loanapplication/user/"+userId) as Observable<LoanApplication[]>;
  }

  deleteLoanApplication(loanId : number):Observable<void>{
    console.log("service"+loanId);
    return this.httpClient.delete<void>(this.apiUrl+"/api/loanapplication/"+loanId);
  }

  getAllLoanApplications(): Observable<LoanApplication[]>{
    return this.httpClient.get(this.apiUrl+"/api/loanapplication") as Observable<LoanApplication[]>
  }

  updateLoanStatus(loanApplicationId:number,loanApplication: LoanApplication):Observable<LoanApplication>{
    return this.httpClient.put(this.apiUrl+"/api/loanapplication/"+loanApplicationId,loanApplication) as Observable<LoanApplication>
  }

  uploadImage(loanApplicationId : number,file:File):Observable<any>{
      const formData:FormData = new FormData();
      formData.append('file',file);
      return this.httpClient.post(this.apiUrl+"/upload/"+loanApplicationId,formData);
  }

  getLoanApplicationById(id: number):Observable<LoanApplication>{
    return this.httpClient.get(this.apiUrl+"/api/loanapplication/"+id) as Observable<LoanApplication>;
  } 
  
  updateLoanApplicaticationFeedbackStatus(loanApplicationId:number,loanApplication: LoanApplication):Observable<LoanApplication>{
    return this.httpClient.put(this.apiUrl+"/api/loanapplication/feedback/status/"+loanApplicationId,loanApplication) as Observable<LoanApplication>
  }


}
