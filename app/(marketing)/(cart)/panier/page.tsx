import { CartContent, CartSummary, CartTitle } from './components';

export default function CartPage() {
  return (
    <div
      className={
        'flex flex-col gap-4 p-4 md:p-8 flex-1 overflow-hidden md:max-h-screen-without-header max-w-7xl m-auto w-full'
      }
    >
      <h1 className={'text-2xl md:text-4xl font-medium'}>Panier</h1>
      <CartTitle />
      <div className={'flex-1 flex flex-col md:flex-row gap-4 overflow-hidden'}>
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
}
