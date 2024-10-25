import {createFileRoute} from '@tanstack/react-router'
import CreateOrder from "../../features/order/CreateOrder.tsx";

export const Route = createFileRoute('/order/new')({
    component: CreateOrder
})
