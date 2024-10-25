import Button from '../../ui/Button.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../../services/apiRestaurant';
import { useParams } from '@tanstack/react-router';

// type UpdateOrderProps = OrderType;
const UpdateOrder = () => {
  const params = useParams({ from: '/order/$orderId' });
  const queryClient = useQueryClient();
  const MakePriMutation = useMutation({
    mutationFn: ({
      id,
      updateObj,
    }: {
      id: string;
      updateObj: { priority: boolean };
    }) => updateOrder(id, updateObj),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ['order', { orderId: params.orderId }] })
        .then();
    },
  });
  const handleMakePriority = () => {
    const data = { priority: true };
    MakePriMutation.mutate({ id: params.orderId, updateObj: data });
  };
  return (
    <div className="text-right">
      <Button
        variant="primary"
        className="uppercase"
        onClick={handleMakePriority}
      >
        {MakePriMutation.isPending ? 'Loading...' : 'MAKE PRIORITY'}
      </Button>
    </div>
  );
};

export default UpdateOrder;
