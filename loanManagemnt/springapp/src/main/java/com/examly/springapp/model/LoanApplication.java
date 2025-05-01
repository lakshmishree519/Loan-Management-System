package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class LoanApplication {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     long loanApplicationId;
     LocalDate submissionDate;
     String course;
     String institution;
     double tuitionFee;
     int loanStatus;
     String address;
     String file;
     int hasFeedback;
     @ManyToOne
     @JoinColumn(name = "userId")
     User user;

     @ManyToOne
     Loan loan;

    //  @OneToOne
    //  Feedback feedback;

	public LoanApplication() {
	}
 
	 
	public LoanApplication(long loanApplicationId, LocalDate submissionDate, String course, String institution,
			double tuitionFee, int loanStatus, String address, String file, int hasFeedback, User user, Loan loan) {
		this.loanApplicationId = loanApplicationId;
		this.submissionDate = submissionDate;
		this.course = course;
		this.institution = institution;
		this.tuitionFee = tuitionFee;
		this.loanStatus = loanStatus;
		this.address = address;
		this.file = file;
		this.hasFeedback = hasFeedback;
		this.user = user;
		this.loan = loan;
	}


	public long getLoanApplicationId() {
		return loanApplicationId;
	}

	public void setLoanApplicationId(long loanApplicationId) {
		this.loanApplicationId = loanApplicationId;
	}

	public LocalDate getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(LocalDate submissionDate) {
		this.submissionDate = submissionDate;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public double getTuitionFee() {
		return tuitionFee;
	}

	public void setTuitionFee(double tuitionFee) {
		this.tuitionFee = tuitionFee;
	}

	public int getLoanStatus() {
		return loanStatus;
	}

	public void setLoanStatus(int loanStatus) {
		this.loanStatus = loanStatus;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public int getHasFeedback() {
		return hasFeedback;
	}

	public void setHasFeedback(int hasFeedback) {
		this.hasFeedback = hasFeedback;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Loan getLoan() {
		return loan;
	}

	public void setLoan(Loan loan) {
		this.loan = loan;
	}

	
     
	
   

    

    

}
