import React from 'react';
import { Button, Divider } from 'antd';
import axios from 'axios';
import { Todo } from '../../types';
import './index.css';

interface TodoItemProps {
  data: Todo;
  onDelete: (todoId: string) => void
}

function TodoItem({ data, onDelete }: TodoItemProps) {
  const onClickDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className="todo-item">
      <div className="todo-text">
        {data.text}
      </div>
      <div className="todo-actions">
        <Button
          type="danger"
          icon="delete"
          onClick={onClickDelete}
        />
      </div>
    </div>
  );
}

export default TodoItem;
