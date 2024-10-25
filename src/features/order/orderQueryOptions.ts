import {queryOptions} from "@tanstack/react-query";
import {getOrder} from "../../services/apiRestaurant";

export const orderQueryOptions = (orderId: string) => queryOptions({
    queryKey: ['order', {orderId}],
    queryFn: () => getOrder(orderId)
})