package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.LoanApplication;

public interface LoanApplicationService {


    public LoanApplication addLoanApplication(LoanApplication loanApplication);

    public List<LoanApplication> getLoanApplicationByUserId(long userId);

    public Optional<LoanApplication> getLoanApplicationById(long loanapplicationId);
  
    public List<LoanApplication> getAllLoanApplications();

    public LoanApplication updateLoanApplication(long loanApplicationId,LoanApplication updatedLoanApplication);

    public LoanApplication deleteLoanApplication(long loanApplicationId); 
  
    public LoanApplication updateLoanApplicaticationFeedbackStatus(long loanApplicationId,LoanApplication updatedLoanApplication);
}
