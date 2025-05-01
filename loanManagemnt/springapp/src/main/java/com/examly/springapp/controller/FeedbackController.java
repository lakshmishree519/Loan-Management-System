package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

@RestController
@CrossOrigin
public class FeedbackController {
    

    @Autowired
    private FeedbackService feedbackService;


    @DeleteMapping("/api/feedback/{feedbackId}")
    public ResponseEntity<?>  deleteFeed(@PathVariable long feedbackId){
          return ResponseEntity.status(200).body(feedbackService.deleteFeed(feedbackId));
    }

   @GetMapping("/api/feedback/user/{userId}")
   public ResponseEntity<?>   getFeedbackByUserId(@PathVariable long userId){
    return ResponseEntity.status(200).body(feedbackService.getFeedbackByUserId(userId));
   }

   @GetMapping("/api/feedback/user/loanApplication/{loanApplicationId}")
   public ResponseEntity<?>   getFeedbackByLoanApplicationId(@PathVariable long loanApplicationId){
    return ResponseEntity.status(200).body(feedbackService.getFeedbackByLoanApplicationId(loanApplicationId));
   }

   @PostMapping("/api/feedback")
   public ResponseEntity<?>  addFeedback(@RequestBody Feedback feedback){
           return ResponseEntity.status(200).body(feedbackService.addFeedback(feedback));
   }

   @PutMapping("/api/feedback/{feedbackId}")
   public ResponseEntity<?> updateFeeback(@RequestBody Feedback feedback,@PathVariable long feedbackId){
      return ResponseEntity.status(200).body(feedbackService.updateFeedback(feedbackId, feedback));
   }

   @GetMapping("/api/feedback")
   public ResponseEntity<?> getAllFeedback(){
       return ResponseEntity.status(200).body(feedbackService.getAllFeedBackAll());
   }


}

  

