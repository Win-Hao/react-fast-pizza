import LinkButton from './LinkButton.tsx';

const Error = ({ error }: { error?: any }) => {
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error?.message}</p>
      <LinkButton back>&larr; Go back</LinkButton>
    </div>
  );
};

export default Error;
