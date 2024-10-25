import Button from '../../ui/Button.tsx';
import {
  useDecreaseItemQuantity,
  useIncreaseItemQuantity,
} from '../../store/useCart.ts';

interface Props {
  pizzaId: number;
  currentQuantity: number;
}

const UpdateItemQuantity = ({ pizzaId, currentQuantity }: Props) => {
  const increaseItemQuantity = useIncreaseItemQuantity();
  const decreaseItemQuantity = useDecreaseItemQuantity();
  const handleIncrease = () => {
    increaseItemQuantity(pizzaId);
  };
  const handleDecrease = () => {
    decreaseItemQuantity(pizzaId);
  };
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button variant="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button variant="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
