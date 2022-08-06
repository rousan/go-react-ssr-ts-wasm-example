import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Divider, message } from 'antd';
import axios from 'axios';
import './index.css';
import { Todo } from '../../types';
import TodoItem from '../TodoItem';

interface AppState {
  todos: Todo[]
}

declare global {
  interface Window {
    __INIT_STATE__: AppState;
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(window.__INIT_STATE__.todos);
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
    <div className="app">
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

export default App;
