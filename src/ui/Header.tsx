import { Link } from '@tanstack/react-router';
import SearchOrder from '../features/order/SearchOrder.tsx';
import Username from '../features/user/Username.tsx';

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase text-stone-200 sm:px-6">
      <Link to={'/'} className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
