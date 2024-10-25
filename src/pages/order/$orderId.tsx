import {createFileRoute} from '@tanstack/react-router'
import Order from "../../features/order/Order.tsx";
import {orderQueryOptions} from "../../features/order/orderQueryOptions.ts";
import Error from "../../ui/Error.tsx";

export const Route = createFileRoute('/order/$orderId')({
    component: Order,
    loader: ({context: {queryClient}, params: {orderId}}) => {
        return queryClient.ensureQueryData(orderQueryOptions(orderId))
    },
    errorComponent: ({error}) => (<Error error={error}/>)
})
