// Test ID:IIDSAT
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderQueryOptions } from './orderQueryOptions.ts';
import { useParams } from '@tanstack/react-router';
import OrderItem from './OrderItem.tsx';
import { CartType } from '../cart/Cart.tsx';
import { menuQueryOptions } from '../menu/menuQueryOptions.ts';
import { Pizza } from '../menu/Menu.tsx';
import UpdateOrder from './UpdateOrder.tsx';

export type OrderType = {
  id: string;
  customer: string;
  status: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartType[];
  orderPrice: number;
  priorityPrice: number;
};

const Order = () => {
  const { orderId } = useParams({ from: '/order/$orderId' });
  const { data: order } = useSuspenseQuery(orderQueryOptions(orderId));
  const menuQuery = useSuspenseQuery(menuQueryOptions);
  const { data: menu, isFetching: isLoadingIngredients } = menuQuery;
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    status,
  } = order as OrderType;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-200 border-t">
        {cart.map((item) => (
          <OrderItem
            {...item}
            key={item.pizzaId}
            ingredients={
              (menu as Pizza[]).find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={isLoadingIngredients}
          />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-medium text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder {...order} />}
    </div>
  );
};

export default Order;
