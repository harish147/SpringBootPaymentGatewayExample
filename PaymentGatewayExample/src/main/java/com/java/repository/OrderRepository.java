package com.java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.java.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

	Order findByRazorpayOrderId(String razorpayOrderId);
}
