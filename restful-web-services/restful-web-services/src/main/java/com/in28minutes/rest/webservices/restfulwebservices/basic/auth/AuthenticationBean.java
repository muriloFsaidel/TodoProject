package com.in28minutes.rest.webservices.restfulwebservices.basic.auth;

public class AuthenticationBean {

	private String message;

	AuthenticationBean(String message){
		this.message = message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return "BasicAuthenticationBean [message=" + message + "]";
	}
	
}
