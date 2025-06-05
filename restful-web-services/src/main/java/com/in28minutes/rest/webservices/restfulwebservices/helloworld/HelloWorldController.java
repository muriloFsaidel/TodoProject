package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {

	@GetMapping(path = "/hello-world")
	public String helloWorld() {
		return "HelloWorld";
	}

	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World");
		//throw new RuntimeException("Some error happnened please contact support at ***-**");
	}

	@GetMapping(path = "hello-world-bean/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World, %s", name));
	}

	@GetMapping(path = "hello-world-bean/parameter")
	public HelloWorldBean helloWorldParameter(@RequestParam(
			name = "param",
			required = false,
			defaultValue = "test") String nameParam) {
		return new HelloWorldBean(String.format("Hello World, %s", nameParam));
	}

}
