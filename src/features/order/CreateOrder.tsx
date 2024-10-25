// https://uibakery.io/regex-library/phone-number
import useCreateOrder from '../../hooks/useCreateOrder.ts';
import Button from '../../ui/Button.tsx';
import { useTotalCartPrice } from '../../store/useCart.ts';
import { CartType } from '../cart/Cart.tsx';
import EmptyCart from '../cart/EmptyCart.tsx';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

export interface orderFormProps {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: CartType[];
}

const CreateOrder = () => {
  const {
    onSubmit,
    isSubmitting,
    formError,
    cart,
    geoMutation,
    username,
    address,
    addressError,
    position,
    handleGetAddress,
  } = useCreateOrder();

  const totalCartPrice = useTotalCartPrice();
  const [withPriority, setWithPriority] = useState<boolean>(false);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={geoMutation.isPending || !address}
            />
            <span className="absolute right-[3px] top-[3px] z-10 md:right-[5px] md:top-[5px]">
              {!address && (
                <Button
                  variant="small"
                  onClick={handleGetAddress}
                  disabled={geoMutation.isPending}
                >
                  Get Address
                </Button>
              )}
            </span>
            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => {
              setWithPriority(e.target.checked);
            }}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position['latitude'] && position['longitude']
                ? `${position['latitude']},${position['longitude']}`
                : ''
            }
          />
          <Button
            isSubmitting={isSubmitting || geoMutation.isPending}
            type="submit"
          >
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
