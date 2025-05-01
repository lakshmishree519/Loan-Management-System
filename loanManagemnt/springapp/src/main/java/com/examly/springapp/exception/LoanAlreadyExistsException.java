package com.examly.springapp.exception;

public class LoanAlreadyExistsException extends Exception{

   public LoanAlreadyExistsException(){
    }

   public LoanAlreadyExistsException(String msg){
        super(msg);
    }
    
}
