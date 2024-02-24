package com.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.entity.Order;
import com.java.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public Order getOrderById(Integer id) {
		return orderRepository.findById(id).get();
	}

	public Order createNewOrder(Order order) {
		return orderRepository.save(order);
	}

	public Order updateOrder(Order order) {
		return orderRepository.save(order);
	}
	
	public Order getOrderByRazorpayOrderId(String razorpayOrderId) {
		return orderRepository.findByRazorpayOrderId(razorpayOrderId);
	}
}
