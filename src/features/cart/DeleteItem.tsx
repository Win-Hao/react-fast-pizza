import Button from '../../ui/Button.tsx';
import { ButtonHTMLAttributes } from 'react';
import { useDeleteItem } from '../../store/useCart.ts';

interface DeleteItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pizzaId: number;
}

const DeleteItem = (props: DeleteItemProps) => {
  const { pizzaId, ...others } = props;
  const deleteItem = useDeleteItem();
  const handleDeleteItem = () => {
    deleteItem(pizzaId);
  };
  return (
    <Button variant="small" {...others} onClick={handleDeleteItem}>
      Delete
    </Button>
  );
};

export default DeleteItem;
