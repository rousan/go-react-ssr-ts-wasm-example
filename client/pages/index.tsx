import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { Button, Input, message } from 'antd';
import axios from 'axios';
import { Todo } from '../types';
import TodoItem from '../components/TodoItem';
import styles from './index.module.css';
import { getAPIEndpoint } from '../utils';

interface HomeProps {
  initTodos: Todo[];
}

const Home: NextPage<HomeProps> = ({ initTodos }: HomeProps) => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoText, setNewTodoText] = useState<string>("");

  const onDeleteTodoItem = async (todoId: string) => {
    await axios.delete(`/api/v1/todos/${todoId}`);
    await refreshTodos();
  };

  const refreshTodos = async () => {
    try {
      const resp = await axios.get("/api/v1/todos");
      const newTodos = resp.data as Todo[];
      setTodos(newTodos);
      console.log("refreshTodos", newTodos);
    } catch (err) {
      message.error(String(err));
    }
  };

  const onClickAddTodo = async () => {
    await axios.post("/api/v1/todos", {
      text: newTodoText
    });
    setNewTodoText("");
    await refreshTodos();
  };

  return (
    <div className={styles.homePage}>
      <h2>Your todos</h2>
      <div className={styles.todoItems}>
        {
          todos.map((todo) => {
            return (
              <TodoItem
                data={todo}
                onDelete={onDeleteTodoItem}
                key={todo.id}
              />
            )
          })
        }
      </div>
      <div className={styles.newTodoPanel}>
        <Input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add text"
          className={styles.newTodoInput}
          onPressEnter={onClickAddTodo}
        />
        <Button
          type="primary"
          onClick={onClickAddTodo}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const res = await fetch(getAPIEndpoint("/api/v1/todos"));
  const data = await res.json();

  return {
    props: {
      initTodos: data as Todo[]
    }
  }
}

export default Home;
