import Header from './components/Header';
import PaymentGatewayForm from './components/PaymentGatewayForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header title="Payment Gateway" />
      <PaymentGatewayForm />
    </div>

  );
}

export default App;
