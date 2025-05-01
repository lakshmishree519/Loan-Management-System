package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Feedback {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     long feedbackId;
     String feedbackText;
     LocalDate date;
     @OneToOne
     LoanApplication loanApplication;
     @ManyToOne
     @JoinColumn(name="userId")
     User user;

	public Feedback() {
	}

	public Feedback(long feedbackId, String feedbackText, LocalDate date, 
			LoanApplication loanApplication, User user) {
		this.feedbackId = feedbackId;
		this.feedbackText = feedbackText;
		this.date = date;
		this.loanApplication = loanApplication;
		this.user = user;
	}

	public long getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(long feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getFeedbackText() {
		return feedbackText;
	}

	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}


	public LoanApplication getLoanApplication() {
		return loanApplication;
	}

	public void setLoanApplication(LoanApplication loanApplication) {
		this.loanApplication = loanApplication;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
       
    
}
