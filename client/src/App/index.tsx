import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { Todo } from '../types';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

interface AppState {
  todos: Todo[]
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Not found page!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
