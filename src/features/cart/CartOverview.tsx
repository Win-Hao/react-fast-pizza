import { Link } from '@tanstack/react-router';
import { useCart, useTotalCartPrice } from '../../store/useCart.ts';
import { formatCurrency } from '../../utils/helpers';

const CartOverview = () => {
  const cart = useCart();
  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = useTotalCartPrice();
  if (!totalCartQuantity) return null;
  return (
    <div className="flex flex-row items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;
