package com.in28minutes.learn_oauth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class OauthSecurityConfiguration {
	
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				auth ->{
					auth.anyRequest().authenticated();
				});	
		//http.formLogin()
		//http.httpBasic()
		http.oauth2Login(Customizer.withDefaults());
		return http.build();
	}

}
