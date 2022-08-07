import React from 'react';
import { Button, Divider } from 'antd';
import axios from 'axios';
import { Todo } from '../../types';
import styles from './index.module.css';

interface TodoItemProps {
  data: Todo;
  onDelete: (todoId: string) => void
}

function TodoItem({ data, onDelete }: TodoItemProps) {
  const onClickDelete = () => {
    onDelete(data.id);
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoText}>
        {data.text}
      </div>
      <div className={styles.todoActions}>
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
