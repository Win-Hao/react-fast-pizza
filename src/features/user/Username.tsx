import { useUsername } from '../../store/useUserInfo.ts';

const Username = () => {
  const username = useUsername();
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
};

export default Username;
