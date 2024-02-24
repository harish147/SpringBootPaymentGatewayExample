# SpringBootPaymentGatewayExample
This is an example project for implementing Razorpay Payment Gateway in Spring Boot and ReactJs Project.

## Prerequisites
* Java Development Kit (JDK) version 17
* Node.js and npm installed on your machine
* Maven (mvn)
* Razorpay API Key and Secret (Steps are given below get the key and secret)

## Get Razorpay API Key and Secret
* Sign up for a Razerpay account [here](https://razorpay.com/).
* Generate Razorpay API key and secret
  * Log In to your Razorpay account
  * Navigate to `Account & Settings` > `API keys`
  * Generate new keys and download it to your PC
  * You will get the key and secret in the CSV file

## Installation

* Clone the repository 

  ```bash
  git clone https://github.com/harish147/SpringBootPaymentGatewayExample.git
  ```

* **Backend Installation (Spring Boot Project)**
  
  * Change the directory to the project directory
    ```bash
    cd PaymentGatewayExample
    ```
  * Install dependencies
    ```bash
    mvn install
    ```
* **Fronted Installation (React Js Project)**
  * Change the directory to the project directory
    ```bash
    cd frontend_payment_gateway_example
    ```
  * Install dependencies
    ```bash
    npm install
    ```
## Configure & Run Application

* **Backend**
  * configurations in `application.properties`
    * Add database details
    * Add `razorpay.key` and `razorpay.secret` values, (use the values from CSV file which you have downloaded from Razorpay) 
  * After adding the database configurations, you can run the application using the below command in `PaymentGatewayExample` directory
    ```bash
    mvn spring-boot:run
    ```
* **Frontend**
  * Run the application using the below command in `frontend_payment_gateway_example` directory
    ```bash
    npm start
    ```
## Usage
* Open the frontend URL in your browser
* Fill details in the form
* Make the payment using the Razorpay window

## Useful Links
* [Build Integration in Java](https://razorpay.com/docs/payments/server-integration/java/payment-gateway/build-integration/)
* [How Payment Gateway Works](https://razorpay.com/docs/payments/payment-gateway/how-it-works/)
* [Fetch an Order](https://razorpay.com/docs/api/orders/fetch-with-id/)
* [Order APIs](https://razorpay.com/docs/api/orders/)
