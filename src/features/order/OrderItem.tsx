import { formatCurrency } from '../../utils/helpers';
import { CartType } from '../cart/Cart.tsx';

type OrderItemProps = CartType & {
  ingredients?: string[];
  isLoadingIngredients?: boolean;
};

const OrderItem = (props: OrderItemProps) => {
  const { quantity, name, totalPrice, ingredients, isLoadingIngredients } =
    props;
  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
};

export default OrderItem;
