package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.repository.LoanApplicationRepo;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService {

    @Autowired
    private LoanApplicationRepo loanApplicationRepo;

    @Override
    public LoanApplication addLoanApplication(LoanApplication loanApplication) {
        loanApplication = loanApplicationRepo.save(loanApplication);
        loanApplication.setFile("loan"+loanApplication.getLoanApplicationId()+".jpeg");
        return loanApplicationRepo.save(loanApplication);

    }

    @Override
    public List<LoanApplication> getLoanApplicationByUserId(long userId) {
       
        return loanApplicationRepo.findByUserId(userId);
    }

    @Override
    public Optional<LoanApplication> getLoanApplicationById(long loanapplicationId) {
        Optional<LoanApplication> laonApplication = loanApplicationRepo.findById(loanapplicationId);
        
        return loanApplicationRepo.findById(loanapplicationId);
    }
 
    @Override
    public List<LoanApplication> getAllLoanApplications() {
       List<LoanApplication> loanApplicationList = loanApplicationRepo.findAll();
       return loanApplicationList;
    }

    @Override
    public LoanApplication updateLoanApplication(long loanApplicationId, LoanApplication updatedLoanApplication) {
        Optional<LoanApplication> opt = loanApplicationRepo.findById(loanApplicationId);
        LoanApplication loanApplication = opt.get();
        
        loanApplication.setSubmissionDate(updatedLoanApplication.getSubmissionDate());
        loanApplication.setCourse(updatedLoanApplication.getCourse());
        loanApplication.setInstitution(updatedLoanApplication.getInstitution());
        loanApplication.setTuitionFee(updatedLoanApplication.getTuitionFee());
        loanApplication.setLoanStatus(updatedLoanApplication.getLoanStatus());
        loanApplication.setAddress(updatedLoanApplication.getAddress());
        loanApplication.setFile(updatedLoanApplication.getFile());

        loanApplicationRepo.save(loanApplication);
        return loanApplication;
    }

    @Override
    public LoanApplication deleteLoanApplication(long loanApplicationId) {

        Optional<LoanApplication> opt = loanApplicationRepo.findById(loanApplicationId);
        LoanApplication loanApplication = opt.get();

        loanApplicationRepo.deleteById(loanApplicationId);
        return loanApplication;
    }

    @Override
    public LoanApplication updateLoanApplicaticationFeedbackStatus(long loanApplicationId,LoanApplication updatedLoanApplication){
        Optional<LoanApplication> opt = loanApplicationRepo.findById(loanApplicationId);
        LoanApplication loanApplication = opt.get();
        loanApplication.setHasFeedback(1);
          

        loanApplicationRepo.save(loanApplication);
        return loanApplication;
    }

    
}
