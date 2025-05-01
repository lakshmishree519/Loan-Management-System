package com.examly.springapp.exception;

public class UserNameNotFound extends Exception{
    public UserNameNotFound(String string) {
        super(string);
    }
}
