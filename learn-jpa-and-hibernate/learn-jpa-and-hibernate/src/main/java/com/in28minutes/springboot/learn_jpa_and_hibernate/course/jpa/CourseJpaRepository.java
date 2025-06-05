package com.in28minutes.springboot.learn_jpa_and_hibernate.course.jpa;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.in28minutes.springboot.learn_jpa_and_hibernate.course.Course;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class CourseJpaRepository {

	@PersistenceContext
	private EntityManager entityManager;

	public void insert(Course course) {
		entityManager.merge(course);
	}
	
	public Course selectById(long id) {
		return entityManager.find(Course.class, id);
	}

	public void deleteById(long id) {
		Course course = selectById(id);
		entityManager.remove(course);
	}
	
	public void updateById(long id, String name, String Author) {
		Course courseFound = selectById(id);
		courseFound.setName(name);
		courseFound.setAuthor(Author);
		entityManager.merge(courseFound);
	}
	
	public List<?> select() {
		List<?> courses = null;
		courses = entityManager.createQuery("from Course").getResultList();
		return courses;
	}
}
