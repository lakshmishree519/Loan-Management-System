package com.examly.springapp.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exception.LoanAlreadyExistsException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanService;

import jakarta.annotation.security.PermitAll;


@RestController

public class LoanController {

    @Autowired
    private LoanService loanService;
   
    @PostMapping("/api/loan")
     @PermitAll
    public ResponseEntity<?> addLoan(@RequestBody Loan loan) throws LoanAlreadyExistsException{
        try{
        loan=loanService.addLoan(loan);
        return ResponseEntity.status(200).body(loan);
        }catch(LoanAlreadyExistsException e){
            return ResponseEntity.status(500).body("Loan Already Exists");
        }
    }

    @GetMapping("/api/loan")
    public ResponseEntity<?> getAllLoans(){
        List<Loan> listOfLoans=loanService.getAllLoans();
        return ResponseEntity.status(200).body(listOfLoans);
}

    @GetMapping("/api/loan/{loanId}")
    
    public ResponseEntity<Loan> getLoanById(@PathVariable long loanId){
        Loan loan=loanService.getLoanById(loanId).get();
        return ResponseEntity.status(200).body(loan);
    }

    @DeleteMapping("/api/loan/{loanId}")
    public ResponseEntity<?> deleteById(@PathVariable Long loanId) {
        Loan isDeleted = loanService.deleteLoan(loanId);
        if(isDeleted == null){
            return ResponseEntity.status(500).body(isDeleted);
        }
        return ResponseEntity.status(200).body(isDeleted);
    }
 
    @PutMapping("/api/loan/{loanId}")
    public ResponseEntity<?> update(@PathVariable Long loanId, @RequestBody Loan loan) {
        Loan l = loanService.updateLoan(loanId, loan);
        if (l == null) {
            return ResponseEntity.status(500).body("Not Found");
        }
        return ResponseEntity.status(200).body(l);
    }
}

