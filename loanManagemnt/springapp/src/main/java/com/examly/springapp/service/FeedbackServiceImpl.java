package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService{
  
     @Autowired
     private FeedbackRepo feedbackRepo;

    @Override
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback deleteFeed(Long id) {
        Optional<Feedback> opt = feedbackRepo.findById(id);
        feedbackRepo.deleteById(id);
        return opt.get();
    }

    @Override
    public List<Feedback> getAllFeedBackAll(){
          List<Feedback> listOfFeedbacks = feedbackRepo.findAll();
        return listOfFeedbacks;
    }

    @Override
    public Optional<Feedback> getFeedbackById(Long id) {
         Optional<Feedback> optOfFeedback = feedbackRepo.findById(id);
         return optOfFeedback;
    }

    @Override
    public List<Feedback> getFeedbackByUserId(Long userId) {
      List<Feedback>  listOfFeedbacksOfUser = feedbackRepo.findByUserId(userId);

        return listOfFeedbacksOfUser;
    }

    @Override
    public Feedback getFeedbackByLoanApplicationId(Long laonApplicationId) {
      Optional<Feedback>  opt = feedbackRepo.findByLoanApplicationId(laonApplicationId);

        return opt.get();
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
           Optional<Feedback> opt = feedbackRepo.findById(id);
           Feedback existingFeedback=opt.get();
           updatedFeedback.setFeedbackId(existingFeedback.getFeedbackId());
           feedbackRepo.save(updatedFeedback);
           return updatedFeedback;
    }
    
}
