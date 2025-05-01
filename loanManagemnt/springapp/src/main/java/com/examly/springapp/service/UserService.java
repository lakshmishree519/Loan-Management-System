package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.exception.UserNameNotFound;
import com.examly.springapp.model.User;

public interface UserService {
    User registerUser(User user);
    User getUserById(long userId);
    User getUser(String username);
    List<User> getAllUsers();
    public User userLogin(String email,String password) throws UserNameNotFound;

}
