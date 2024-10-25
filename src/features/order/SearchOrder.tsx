import { FormEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

const SearchOrder = () => {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate({ to: '/order/$orderId', params: { orderId: query } }).then();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
