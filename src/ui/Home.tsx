import { useRouter } from '@tanstack/react-router';
import CreateUser from '../features/user/CreateUser.tsx';
import { useUsername } from '../store/useUserInfo.ts';
import Button from './Button.tsx';

const Home = () => {
  const router = useRouter();
  const username = useUsername();
  console.log(router);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button variant="primary" to={'/menu'}>
          Continue ordering,{username}
        </Button>
      )}
    </div>
  );
};

export default Home;
