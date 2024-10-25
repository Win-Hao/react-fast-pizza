import LinkButton from '../../ui/LinkButton.tsx';
import Button from '../../ui/Button.tsx';
import CartItem from './CartItem.tsx';
import { useUsername } from '../../store/useUserInfo.ts';
import { useCart, useClearCart } from '../../store/useCart.ts';
import EmptyCart from './EmptyCart.tsx';

export type CartType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

const Cart = () => {
  const cart = useCart();
  const username = useUsername();
  const clearCart = useClearCart();
  const handleClearCart = () => {
    clearCart();
  };
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to={'/menu'}>Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem {...item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button variant="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
