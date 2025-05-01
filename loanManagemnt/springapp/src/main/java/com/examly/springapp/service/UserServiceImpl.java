package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNameNotFound;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{
   @Autowired
    UserRepo userRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    
    @Override
    public User registerUser(User user) {
        User existsUser=userRepo.findByUsername(user.getUsername());
        if(existsUser !=null)
        {
            throw new UserNotFoundException();        
        }
       user.setPassword(passwordEncoder.encode(user.getPassword()));
       
       return userRepo.save(user);

    }
    @Override
    public User getUser(String username){
     return userRepo.findByEmail(username).orElse(null);
    }
    @Override
    public User getUserById(long userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
 
    @Override
    public User userLogin(String email, String password) throws UserNameNotFound {
        User user=userRepo.findByEmail(email).orElse(null);
        if(user==null || !passwordEncoder.matches(password, user.getPassword())){
            throw new UserNameNotFound("User not found");
        }
        // if(user==null || (!password.equals(user.getPassword()))){
        //     throw new UserNameNotFound("User not found");
        // }
        return user;
    }

    // @Override
    // public User loginUser(LoginDto user) {
    //     User fetchUser=userrepo.findByUsername(user.getUsername()).orElse(null);
    //     return fetchUser;
    // }


}
