import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { FormEvent, useState } from 'react';
import { orderFormProps } from '../features/order/CreateOrder.tsx';
import { createOrder } from '../services/apiRestaurant';
import { useCart, useClearCart } from '../store/useCart.ts';
import {
  fetchAddress,
  useAddress,
  useAddressError,
  usePosition,
  useSetAddress,
  useSetError,
  useSetPosition,
  useUsername,
} from '../store/useUserInfo.ts';

const useCreateOrder = () => {
  const isValidPhone = (str: string) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str,
    );
  const cart = useCart();
  const navigate = useNavigate({ from: '/order/new' });
  const [formError, setFormError] = useState({} as any);
  const clearCart = useClearCart();

  // create order mutation
  const coMutation = useMutation({
    mutationFn: (newOrder: orderFormProps) => {
      return createOrder(newOrder);
    },
    onSuccess: (data) => {
      navigate({ to: `/order/$orderId`, params: { orderId: data.id } }).then(
        () => {
          clearCart();
        },
      );
    },
  });

  // obtain geolocation mutation
  const setAddress = useSetAddress();
  const setPosition = useSetPosition();
  const setError = useSetError();
  const geoMutation = useMutation({
    mutationFn: () => {
      return fetchAddress();
    },
    onSuccess: (data) => {
      setAddress(data.address);
      setPosition(data.position['latitude'], data.position['longitude']);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleGetAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    geoMutation.mutate();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const order = {
      ...data,
      cart: JSON.parse(data.cart as string),
      priority: data.priority === 'on',
    };
    const newOrder = { ...order } as orderFormProps;
    if (!isValidPhone(newOrder.phone)) {
      setFormError((prev: any) => {
        return { ...prev, phone: 'Please enter a valid phone number' };
      });
      return;
    }
    coMutation.mutate(newOrder);
  };
  const isSubmitting = coMutation.isPending;
  const username = useUsername();
  const addressError = useAddressError();
  const address = useAddress();
  const position = usePosition();
  return {
    cart,
    username,
    addressError,
    address,
    position,
    isSubmitting,
    formError,
    geoMutation,
    onSubmit,
    handleGetAddress,
  };
};
export default useCreateOrder;
