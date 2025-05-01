package com.examly.springapp.dto;

public class LoginResponseDto {
    private Long userId;
    private String jwtToken;
    private String username;
    private String role;

    
    public LoginResponseDto() {
    }

    
    public Long getUserId() {
        return userId;
    }
    public LoginResponseDto(Long userId, String jwtToken, String username, String role) {
    this.userId = userId;
    this.jwtToken = jwtToken;
    this.username = username;
    this.role = role;
}
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getJwtToken() {
        return jwtToken;
    }
    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    
}
