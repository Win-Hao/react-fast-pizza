import {createFileRoute} from '@tanstack/react-router'
import {menuQueryOptions} from "../features/menu/menuQueryOptions.ts";
import Menu from "../features/menu/Menu.tsx";
import Error from "../ui/Error.tsx";

export const Route = createFileRoute('/menu')({
    loader: ({context: {queryClient}}) => queryClient.ensureQueryData(menuQueryOptions),
    component: Menu,
    errorComponent: Error
})
