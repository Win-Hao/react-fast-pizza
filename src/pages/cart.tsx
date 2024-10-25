import {createFileRoute} from '@tanstack/react-router'
import Cart from "../features/cart/Cart.tsx";

export const Route = createFileRoute('/cart')({
    component: Cart
})
