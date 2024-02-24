package com.java.controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.java.entity.Order;
import com.java.service.OrderService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Value("${razorpay.key}")
	private String razorpayKey;

	@Value("${razorpay.secret}")
	private String razorpaySecret;

	@PostMapping("/createorder")
	public ResponseEntity<String> createNewOrder(@RequestBody Order order) {

		order.setCurrency("INR");
		order.setPaymentStatus("creating");
		order.setCreatedTime(new Timestamp(System.currentTimeMillis()));
		Order createdOrder = orderService.createNewOrder(order);

		try {
			RazorpayClient razorPayClient = new RazorpayClient(razorpayKey, razorpaySecret);
			JSONObject razorpayOrderObject = new JSONObject();
			razorpayOrderObject.put("amount", createdOrder.getPaymentAmount() * 100);
			razorpayOrderObject.put("currency", createdOrder.getCurrency());
			razorpayOrderObject.put("receipt", createdOrder.getId().toString());

			com.razorpay.Order razorPayCreatedOrder = razorPayClient.orders.create(razorpayOrderObject);

			createdOrder.setRazorpayOrderId(razorPayCreatedOrder.get("id"));
			createdOrder.setPaymentStatus(razorPayCreatedOrder.get("status"));

			createdOrder
					.setRazorpayCreatedTime(new Timestamp(((Date) razorPayCreatedOrder.get("created_at")).getTime()));

			orderService.updateOrder(createdOrder);

			return ResponseEntity.ok(razorPayCreatedOrder.toString());

		} catch (RazorpayException e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}

	}

	@PostMapping("/updateorder")
	public void updateOrder(@RequestBody Map<String, String> orderDetails) {

		String orderId = orderDetails.get("orderId");
		Order order = orderService.getOrderByRazorpayOrderId(orderId);

		RazorpayClient razorpay;
		try {
			razorpay = new RazorpayClient(razorpayKey, razorpaySecret);
			com.razorpay.Order razorpayOrder = razorpay.orders.fetch(orderId);
			String orderStatus = razorpayOrder.get("status");
			order.setPaymentStatus(orderStatus);
			orderService.updateOrder(order);

		} catch (RazorpayException e) {
			e.printStackTrace();
		}

	}
}
