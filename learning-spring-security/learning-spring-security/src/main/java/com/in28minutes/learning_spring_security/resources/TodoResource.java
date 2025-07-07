package com.in28minutes.learning_spring_security.resources;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.security.RolesAllowed;

@RestController
@EnableMethodSecurity(jsr250Enabled = true, securedEnabled = true)
public class TodoResource {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private static final List<Todo> TODO_LIST = List.of(
			new Todo("in28minutes","Learn AWS"),
			new Todo("in28minutes","Get AWS certified"));

	@GetMapping("/todos")
	public List<Todo> retrivelAllTodos() {
		return TODO_LIST;
	}
	
	@GetMapping("/users/{username}/todo")
	@PreAuthorize("hasRole('USER') and #username == authentication.name")//optional use
	@PostAuthorize("returnObject.username == 'in28Minutes'")//optional use
	@RolesAllowed({"ADMIN", "USER"})//optional use
	@Secured({"ROLE_ADMIN", "ROLE_USER"})//optional use
	public Todo retrieveTodoForSpecificUser(@PathVariable String username){
		return TODO_LIST.get(0);
	}
	
	@PostMapping("/user/{username}/todo")
	public void createTodo(@PathVariable String username, 
			@RequestBody Todo todo) {
		logger.info("created {} for {}", todo, username);
	}	
	
}

record Todo (String username, String description) {}
