import { FormEvent, useState } from 'react';
import Button from '../../ui/Button.tsx';
import { useUpdateName } from '../../store/useUserInfo.ts';
import { useNavigate } from '@tanstack/react-router';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const updateName = useUpdateName();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    updateName(username);
    navigate({ to: '/menu' }).then();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10">
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
};

export default CreateUser;
