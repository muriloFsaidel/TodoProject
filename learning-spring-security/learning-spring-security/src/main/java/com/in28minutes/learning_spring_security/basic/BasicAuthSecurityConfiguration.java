package com.in28minutes.learning_spring_security.basic;

import static org.springframework.security.config.Customizer.withDefaults;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthSecurityConfiguration {
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				 auth -> {
					 auth
					 .requestMatchers("/users").hasRole("USER")//optional config
					 .requestMatchers("/admin/**").hasRole("ADMIN")//optional config
					 .anyRequest().authenticated();
				 });
		http.sessionManagement(
				 session -> {
					 session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
				 });
		//http.formLogin(withDefaults()); disposing form login authentication
		http.httpBasic(withDefaults());
		
		http.csrf(csrf -> {
				csrf.disable();	
		});
		
		http.headers(headers -> headers.frameOptions(
				frameOptionConfig -> frameOptionConfig.disable()));
		return http.build();
	}
	
  /* In memory without database
   	@Bean
	public UserDetailsService userDetailsService() {
		var user = User.withUsername("in28minutes")
				       .password("{noop}dummy")
				       .roles("USER")
				       .build();
		
		var admin = User.withUsername("admin")
				        .password("{noop}dummy")
				        .roles("ADMIN")
				        .build();
		
		return new InMemoryUserDetailsManager(user, admin);
		
	}
	
   */
	@Bean
	public DataSource datasource() {
		return new EmbeddedDatabaseBuilder()
				.setType(EmbeddedDatabaseType.H2)
				.addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
				.build();
	}
	
	@Bean
	public UserDetailsService userDetailsService(DataSource dataSource) {
		var user = User.withUsername("in28minutes")
				       .password("dummy")
				       .passwordEncoder(str -> passwordEncoder().encode(str))
				       .roles("USER")
				       .build();
		
		var admin = User.withUsername("admin")
				        .password("dummy")
				        .passwordEncoder(str -> passwordEncoder().encode(str))
				        .roles("ADMIN","USER")
				        .build();
		
	   var jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
	   jdbcUserDetailsManager.createUser(user);
	   jdbcUserDetailsManager.createUser(admin);
	   
	   return jdbcUserDetailsManager;
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

