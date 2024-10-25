import Header from './Header.tsx';
import CartOverview from '../features/cart/CartOverview.tsx';
import { Outlet, useRouterState } from '@tanstack/react-router';
import Loader from './Loader.tsx';

const AppLayout = () => {
  const state = useRouterState();
  const isLoading = state.status === 'pending';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
