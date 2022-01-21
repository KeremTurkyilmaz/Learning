import React from 'react';
import axios from 'axios';
import * as styles from './todo.module.css';

const Todo = ({ todo, reloadTodos }) => {
  // Handle toggle todo status
  const toggleCompleted = async (event) => {
    event.preventDefault();
    await axios
      .post('/api/toggle-completed', {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
      .then(reloadTodos)
      .catch((err) => console.error(err));
  };
  // Handle delete todo action
  const deleteTodo = async (event) => {
    event.preventDefault();
    await axios
      .post('/api/delete-todo', {
        id: todo._id,
      })
      .then(reloadTodos)
      .catch((err) => console.error(err));
  };

  return (
    <>
      <label htmlFor={`todo-toggle-${todo._id}`} className={styles.label}>
        Mark complete
      </label>
      <input
        htmlFor={`todo-toggle-${todo._id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className={styles.toggle}
      />
      <p className={`${styles.text} ${todo.completed && styles.completed}`} onClick={deleteTodo}>
        {todo.text}
      </p>
    </>
  );
};

export default Todo;
