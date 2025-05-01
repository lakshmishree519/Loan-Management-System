package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.LoanAlreadyExistsException;
import com.examly.springapp.exception.LoanNotFoundException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;

@Service
public class LoanServiceImpl implements LoanService{

    @Autowired
    private LoanRepo loanRepo;

    @Override
    public Loan addLoan(Loan loan) throws LoanAlreadyExistsException {
        Loan exisitngLoan=loanRepo.findByLoanId(loan.getLoanId());
        System.out.println("aaabcgdujjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        if(exisitngLoan!=null){
            throw new LoanAlreadyExistsException("Loan with "+loan.getLoanId()+" already exists");
        }
        return loanRepo.save(loan);
    }

    // @Override
    // public Optional<Loan> getLoanById(Long loanId) {

    //     Optional<Loan> loan=loanRepo.findById(loanId);
    //     return loan;
    // }
    @Override
public Optional<Loan> getLoanById(Long loanId) {
    Optional<Loan> loan = loanRepo.findById(loanId);
    if (!loan.isPresent()) {
        throw new LoanNotFoundException("Loan with ID " + loanId + " not found");
    }
    return loan;
}


    @Override
    public List<Loan> getAllLoans() {
        List<Loan> listOfLoan=loanRepo.findAll();
        return listOfLoan;
    }
    
    @Override
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        Optional<Loan> l = loanRepo.findById(loanId);
        Loan olderLoan = l.get();
        olderLoan.setLoanType(updatedLoan.getLoanType());
        olderLoan.setDescription(updatedLoan.getDescription());
        olderLoan.setInterestRate(updatedLoan.getInterestRate());
        olderLoan.setMaximumAmount(updatedLoan.getMaximumAmount());
        olderLoan.setRepaymentTenure(updatedLoan.getRepaymentTenure());
        olderLoan.setEligibility(updatedLoan.getEligibility());
        olderLoan.setDocumentsRequired(updatedLoan.getDocumentsRequired());

        return loanRepo.save(olderLoan);
    }

    @Override
    public Loan deleteLoan(Long loanId) {
        Optional<Loan> loan = loanRepo.findById(loanId);
        loanRepo.deleteById(loanId);
        return loan.get();
    }
}
