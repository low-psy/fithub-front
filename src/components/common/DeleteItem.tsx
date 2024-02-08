import React from 'react';
import { Form } from 'react-router-dom';

interface DeleteItemProps {
  id: number | undefined; // 삭제할 게시물의 ID
  action: string;
  itemName: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id, action, itemName }) => {
  return (
    <Form action={action} className="space-y-2" method="delete">
      <div>정말 {itemName}을 삭제 하시겠습니까?</div>
      <input hidden name="id" value={id} />
      <div className="text-right">
        <button type="submit" className="rounded-full bg-slate-200 px-6 py-1">
          삭제
        </button>
      </div>
    </Form>
  );
};

export default DeleteItem;
