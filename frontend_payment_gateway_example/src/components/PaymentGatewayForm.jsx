import { useState, useEffect } from "react";
import { Card, CardTitle, Button, CardBody, Form, FormGroup, Label, Input, Alert, Spinner } from "reactstrap"

const PaymentGatewayForm = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const [formValues, setFormValues] = useState({ paymentAmount: "500", email: "", mobileNumber: "" })
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
    const [alertStates, setAlertStates] = useState({ isAlertOpen: false, alertMessage: "", alertType: "" })

    const updatePaymentDetails = (orderId) => {
        fetch('http://localhost:8080/updateorder', {
            method: "POST",
            body: JSON.stringify({ "orderId": orderId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    const handlePayment = (e) => {

        e.preventDefault()
        setIsPaymentProcessing(true)

        fetch('http://localhost:8080/createorder',
            {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error occured during transaction: " + response.status)
                }

                return response.json()
            })
            .then(data => {
                console.log(data)

                const options = {
                    "key": "rzp_test_thhJwWmcnWtRXw",
                    "amount": data.amount,
                    "currency": data.currency,
                    "name": "Test @ Corporation",
                    "description": "Test Transaction",
                    "order_id": data.id,
                    "handler": function (response) {
                        updatePaymentDetails(response.razorpay_order_id)
                        setAlertStates({
                            ...alertStates,
                            alertMessage: "Payment Successful, Payment ID: " + response.razorpay_payment_id + " Order ID: " + response.razorpay_order_id,
                            isAlertOpen: true,
                            alertType: "success"
                        })
                        setTimeout(() => {
                            setAlertStates({ ...alertStates, alertMessage: "", isAlertOpen: false })
                        }, 3000);
                    }
                }
                // eslint-disable-next-line no-undef
                const rzp1 = new Razorpay(options)
                rzp1.on('payment.failed', function (response) {
                    updatePaymentDetails(response.error.metadata.order_id)
                    setAlertStates({ ...alertStates, alertMessage: response.error.code + " " + response.error.description, isAlertOpen: true, alertType: "danger" })
                    setTimeout(() => {
                        setAlertStates({ ...alertStates, alertMessage: "", isAlertOpen: false })
                    }, 3000);
                });

                rzp1.open();
                setIsPaymentProcessing(false)
            })
            .catch(error => {
                setAlertStates({ ...alertStates, alertMessage: error.message, isAlertOpen: true, alertType: "danger" })
                setTimeout(() => {
                    setAlertStates({ ...alertStates, alertMessage: "", isAlertOpen: false })
                }, 3000);
                setIsPaymentProcessing(false)
            })
    }

    return (
        <>
            <Alert isOpen={alertStates.isAlertOpen} color={alertStates.alertType}>{alertStates.alertMessage}</Alert>
            <Card
                body
                className="m-auto"
                color="light"
                style={{
                    width: '20rem',
                    position: "relative",
                    top: "-50px",
                    borderColor: "#ffc107",
                    flexGrow: "0"
                }}
            >
                <CardTitle tag="h5" className="text-center">
                    Premium Plan
                </CardTitle>
                <CardBody>
                    <Form onSubmit={handlePayment} >
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter email ID"
                                type="email"
                                value={formValues.email}
                                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mobileNumber">
                                Mobile Number
                            </Label>
                            <Input
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Enter mobile number"
                                type="text"
                                pattern="\d{10}"
                                value={formValues.mobileNumber}
                                onChange={(e) => setFormValues({ ...formValues, mobileNumber: e.target.value })}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Amount (INR)
                            </Label>
                            <Input
                                type="text"
                                value={formValues.paymentAmount}
                                placeholder="Enter Amount"
                                disabled
                                required
                            />
                        </FormGroup>
                        <Button color="warning" style={{ width: "100%" }} className="my-2" disabled={isPaymentProcessing} type="submit">
                            {
                                isPaymentProcessing ?
                                    <>
                                        <Spinner size="sm">
                                            Processing
                                        </Spinner>
                                        <span>
                                            {' '}Processing
                                        </span>
                                    </>
                                    :
                                    <>
                                        Purchase
                                    </>
                            }
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </>

    )
}

export default PaymentGatewayForm