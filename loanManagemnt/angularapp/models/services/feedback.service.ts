import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // apiUrl:string = "";
  private apiUrl ="https://ide-bffddefaddacbcffbbfbbacdfafccfdfcdfdeacdcff.premiumproject.examly.io/proxy/8080";
  constructor(private httpClient:HttpClient) { }
  
  sendFeedback(feedback:Feedback): Observable<Feedback>{
    return this.httpClient.post(this.apiUrl+"/api/feedback",feedback) as Observable<Feedback>;
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]>{
    return this.httpClient.get(this.apiUrl+"/api/feedback/user/"+userId) as Observable<Feedback[]>;
  }

  deleteFeedback(feedbackId: number): Observable<any>{
    return this.httpClient.delete(this.apiUrl+"/api/feedback/"+feedbackId) as Observable<any>;
  }

  getFeedbacks() : Observable<Feedback[]>{
    return this.httpClient.get(this.apiUrl+"/api/feedback") as Observable<Feedback[]>;
  }
  getFeedbackByLoanId(loanApplicationId: number): Observable<Feedback[]> {
    return this.httpClient.get(this.apiUrl + "/api/feedback/loan/" + loanApplicationId) as Observable<Feedback[]>;
  }
  
  getFeedbackByLoanApplicationId(loanApplicationId:number):Observable<Feedback>{
    return this.httpClient.get(this.apiUrl+"/api/feedback/user/loanApplication/"+loanApplicationId) as Observable<Feedback>;
  }
}
