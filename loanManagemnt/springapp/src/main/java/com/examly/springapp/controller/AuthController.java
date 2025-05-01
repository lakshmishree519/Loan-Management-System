package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.dto.LoginRequestDto;
import com.examly.springapp.dto.LoginResponseDto;
import com.examly.springapp.exception.UserNameNotFound;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;


@RestController
public class AuthController {
     @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtservice;

      
    @PostMapping("/api/register")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        System.out.println("User object : "+ user);
        System.out.println("***************************************");
        User newUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);

    }
    
    @PostMapping("/api/login")
    @PreAuthorize("permitAll()")
    public LoginResponseDto authenticateAndGetToken(@RequestBody LoginRequestDto user){
        //passing username and password to authenticate
        System.out.println("***************************************");
        Authentication authentication = authenticationManager
                                       .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if(authentication.isAuthenticated()){
               User responseUser =userService.getUser(user.getUsername());
               LoginResponseDto reponse=new LoginResponseDto();
               reponse.setJwtToken(jwtservice.generateToken(user.getUsername()));
               reponse.setUserId(responseUser.getUserId());
               reponse.setUsername(responseUser.getEmail());
               reponse.setRole(responseUser.getUserRole());
               System.out.println("***************************************");
               System.out.println(reponse);
               return reponse;

            
        }
         else {
            throw new UsernameNotFoundException("Invalid user request..!!");
        }
    }

    @GetMapping("/api/user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable long userId) {
        User getUser=userService.getUserById(userId);
        return ResponseEntity.status(200).body(getUser);
    }

    @GetMapping("/api/user")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> getUsers=userService.getAllUsers();
        return ResponseEntity.status(200).body(getUsers);
    }

    // @PostMapping("/api/login")
    // public ResponseEntity<User> userLogin(@RequestBody User user) throws UserNameNotFound{
    //     User existingUser=userService.userLogin(user.getEmail(),user.getPassword());
    //     existingUser.setPassword(null);
    //     return ResponseEntity.status(200).body(existingUser);
    // }
}
