import LinkButton from '../../ui/LinkButton.tsx';

const EmptyCart = () => {
  return (
    <div>
      <LinkButton to="/menu" className="px-4 py-3">
        &larr; Back to menu
      </LinkButton>
      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
};

export default EmptyCart;
