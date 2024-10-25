import {queryOptions} from "@tanstack/react-query";
import {getMenu} from "../../services/apiRestaurant";

export const menuQueryOptions = queryOptions({
    queryKey: ['menu'],
    queryFn: () => getMenu()
})