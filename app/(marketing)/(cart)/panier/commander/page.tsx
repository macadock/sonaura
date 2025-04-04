import { CheckoutForm, OrderSummary } from './components';

export default function CheckoutPage() {
  return (
    <div className={'p-8 w-full max-w-7xl mx-auto'}>
      <CheckoutForm>
        <OrderSummary />
      </CheckoutForm>
    </div>
  );
}
