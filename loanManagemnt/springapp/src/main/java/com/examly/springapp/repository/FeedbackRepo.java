package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.model.Feedback;

public interface FeedbackRepo extends JpaRepository<Feedback,Long>{

    @Query("Select f from Feedback f where f.user.userId=:userId" )
    List<Feedback> findByUserId(Long userId);

    @Query("Select f from Feedback f where f.loanApplication.loanApplicationId=:loanApplicationId" )
    Optional<Feedback> findByLoanApplicationId(Long loanApplicationId);
      
}
