import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem.tsx';
import UpdateItemQuantity from './UpdateItemQuantity.tsx';
import { useCurrentQuantity } from '../../store/useCart.ts';

interface CartItemProps {
  pizzaId: number;
  name: string;
  quantity: number;
  totalPrice: number;
}

const CartItem = (props: CartItemProps) => {
  const { pizzaId, name, quantity, totalPrice } = props;
  const currentQuantity = useCurrentQuantity(pizzaId);
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;
