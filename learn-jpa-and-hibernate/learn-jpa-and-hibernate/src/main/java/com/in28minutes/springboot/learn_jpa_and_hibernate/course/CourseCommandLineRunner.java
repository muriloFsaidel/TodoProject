package com.in28minutes.springboot.learn_jpa_and_hibernate.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.in28minutes.springboot.learn_jpa_and_hibernate.course.springdatajpa.CourseSpringDataJpaRepository;

@Component
public class CourseCommandLineRunner implements CommandLineRunner {

	//@Autowired
	//private CourseJdbcRepository repository;
	
	//@Autowired
	//private CourseJpaRepository repository;
	
	@Autowired
	private CourseSpringDataJpaRepository repository;

	@Override
	public void run(String... args) throws Exception {
		repository.save(new Course("Learn AWS JPA!", "in28minutes"));
		repository.save(new Course("Learn Azure JPA!", "in28minutes"));
		repository.save(new Course("Learn DevOps JPA!", "in28minutes"));

		repository.deleteById(1l);

		System.out.println(repository.findById(2l).get());
		System.out.println(repository.findById(3l).get());

		Course courseRetrieved = repository.findById(3l).get();
		courseRetrieved.setName("Learn GC");
		courseRetrieved.setAuthor("in28minutes");
		repository.save(courseRetrieved);

		System.out.println(repository.findById(3l).get());
		
		
		
		
		
		System.out.println(repository.findByAuthor("in28minutes"));
		System.out.println(repository.findByName("Learn GC"));
		System.out.println(repository.findAll());
		System.out.println(repository.count());
		
	}

}
