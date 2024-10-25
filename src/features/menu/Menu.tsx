import { useSuspenseQuery } from '@tanstack/react-query';
import { menuQueryOptions } from './menuQueryOptions.ts';
import MenuItem from './MenuItem.tsx';

export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

const Menu = () => {
  const menuQuery = useSuspenseQuery(menuQueryOptions);
  const menu = menuQuery.data as Pizza[];
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem {...pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

export default Menu;
