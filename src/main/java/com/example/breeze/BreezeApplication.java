package com.example.breeze;

import com.example.breeze.entity.*;
import com.example.breeze.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Transient;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class BreezeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreezeApplication.class, args);
	}
}
