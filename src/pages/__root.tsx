import * as React from 'react';
import { createRootRouteWithContext } from '@tanstack/react-router';
import AppLayout from '../ui/AppLayout.tsx';
import { QueryClient } from '@tanstack/react-query';
import Error from '../ui/Error.tsx';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <React.Fragment>
      <AppLayout />
    </React.Fragment>
  ),
  notFoundComponent: () => <Error />,
});
