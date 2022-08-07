import React, { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import './index.css';
import { Todo } from '../../types';
import TodoItem from '../../components/TodoItem';

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  useEffect(() => {
    refreshTodos()
  }, []);

  return (
    <div className="home-page">
      <h2>Your todos</h2>
      <div className="todo-items">
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
      <div className="new-todo-panel">
        <Input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add text"
          className="new-todo-input"
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

export default HomePage;
