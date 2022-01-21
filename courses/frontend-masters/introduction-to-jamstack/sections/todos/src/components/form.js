import React, { useState } from 'react';
import axios from 'axios';
import * as styles from './form.module.css';

const Form = ({ reloadTodos }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (text === '') return;

    await axios.post('/api/create-todo', { text }).catch((err) => {
      console.error(err);
    });

    setText('');
    reloadTodos();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>Add a Todo</label>
      <input
        type="text"
        className={styles.input}
        value={text}
        onChange={(event) => setText(event.target.value)}
      ></input>
      <button className={styles.button}>Save TODO</button>
    </form>
  );
};

export default Form;
