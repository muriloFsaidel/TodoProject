package com.in28minutes.learning_spring_security.resources;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HellowWorldResource {

	@GetMapping("/hello-world")
	public String HellowWorld() {
		return "Hello World";
	}
}
