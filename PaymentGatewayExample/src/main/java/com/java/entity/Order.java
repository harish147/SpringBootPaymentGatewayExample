package com.java.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "_order")
@Data
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String email;

	private String mobileNumber;

	private Double paymentAmount;

	private String currency;
	
	private Timestamp createdTime;
	
	private String paymentStatus;
	
	private String razorpayOrderId;
	
	private Timestamp razorpayCreatedTime;

}
