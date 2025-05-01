package com.examly.springapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.swing.plaf.basic.BasicInternalFrameTitlePane.SystemMenuBar;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.ResponseDto;
import com.examly.springapp.service.LoanApplicationService;

@RestController
@CrossOrigin
public class LoanApplicationController {
    @Autowired
    private LoanApplicationService loanApplicationService;

    private static final String UPLOAD_DIR = "/home/coder/project/workspace/angularapp/src/assets/image/";
    
    @PostMapping("/api/loanapplication")
    public ResponseEntity<?> addLoanApplication(@RequestBody LoanApplication loanApplication){
        return ResponseEntity.status(201).body(loanApplicationService.addLoanApplication(loanApplication));
        //500
    }

    @GetMapping("/api/loanapplication/user/{userId}")
    public ResponseEntity<?> getLoanApplicationByUserId(@PathVariable long userId){
        return ResponseEntity.status(200).body(loanApplicationService.getLoanApplicationByUserId(userId));
    }

    @GetMapping("/api/loanapplication/{id}")
    public ResponseEntity<?> getLoanApplicationById(@PathVariable long id){
        return ResponseEntity.status(200).body(loanApplicationService.getLoanApplicationById(id));
    }
    @GetMapping("/api/loanapplication")
    public ResponseEntity<?> getAllApplication(){
        List<LoanApplication> loanApplicationList = loanApplicationService.getAllLoanApplications();
        return ResponseEntity.status(200).body(loanApplicationList);
    }


    @PutMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<?> updatedLoanApplication(@PathVariable long loanApplicationId,@RequestBody LoanApplication loanApplication){
        LoanApplication updateLoanApplication = loanApplicationService.updateLoanApplication(loanApplicationId, loanApplication);
        return ResponseEntity.status(200).body(updateLoanApplication);
    }

    @DeleteMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable long loanApplicationId){
      System.out.println("*********************************************");
        LoanApplication loanApplication = loanApplicationService.deleteLoanApplication(loanApplicationId);
        return ResponseEntity.status(200).body(loanApplication);

    }
    @PutMapping("/api/loanapplication/status/{loanApplicationId}")
    public ResponseEntity<?>  updateLoanApplicaticationStatus(@PathVariable long loanApplicationId,@RequestBody LoanApplication loanApplication){
        LoanApplication updateLoanApplication = loanApplicationService.updateLoanApplication(loanApplicationId, loanApplication);
        return ResponseEntity.status(200).body(updateLoanApplication);
    }
    @PutMapping("/api/loanapplication/feedback/status/{loanApplicationId}")
    public ResponseEntity<?> updateLoanApplicaticationFeedbackStatus(@PathVariable long loanApplicationId,@RequestBody LoanApplication loanApplication){
        LoanApplication updateLoanApplication = loanApplicationService.updateLoanApplicaticationFeedbackStatus(loanApplicationId, loanApplication);
        return ResponseEntity.status(200).body(updateLoanApplication);
    }
   
    
    @PostMapping("/upload/{loanApplicationId}")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,@PathVariable long loanApplicationId){
        System.out.println("Request recevied");
        System.out.println(file);
        if(file.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto("File is empty"));
        }
        try{
            Path path = Paths.get(UPLOAD_DIR+"loan"+loanApplicationId+".jpeg");
            Files.createDirectories(path.getParent());
            Files.write(path,file.getBytes());
            System.out.println("uploaded");
            return ResponseEntity.ok(new ResponseDto("File uploaded successfully"+file.getOriginalFilename()));
        }catch(IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDto("Error uploading file"));
        }
    }

}
