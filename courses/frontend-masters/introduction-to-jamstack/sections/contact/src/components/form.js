import React, { useReducer } from 'react'
import * as styles from './form.module.css'

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'IDLE',
  error: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value }
    case 'updateStatus':
      return { ...state, status: action.status }
    case 'reset':
    default:
      return INITIAL_STATE
  }
}

const Form = () => {
  // https://reactjs.org/docs/hooks-reference.html#usereducer
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const setStatus = (status) => dispatch({ type: 'updateStatus', status })

  const updateFieldValue = (field) => (event) => {
    dispatch({ type: 'updateFieldValue', field, value: event.target.value })
  }

  // Form Handler
  const handlerSubmit = (event) => {
    event.preventDefault()
    setStatus('PENDING')

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setStatus('SUCCESS')
      })
      .catch((error) => {
        console.log(error)
        updateFieldValue({ type: 'updateFieldValue', error: error.message })
        setStatus('ERROR')
      })
  }

  if (state.status === 'SUCCESS') {
    return (
      <div className={styles.successStatus}>
        <p className={styles.success}>Message Sent!</p>
        <button type="reset" className={styles.button} onClick={() => dispatch({ type: 'reset' })}>
          Send another email!
        </button>
      </div>
    )
  }

  return (
    <div className={styles.formWrapper}>
      {state.status === 'ERROR' && (
        <p className={styles.error}>
          Something went wrong. Please try again <span>{state.error}</span>
        </p>
      )}
      <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handlerSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={updateFieldValue('name')}
          ></input>
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue('email')}
          ></input>
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={state.subject}
            onChange={updateFieldValue('subject')}
          ></input>
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue('body')}
          ></textarea>
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </div>
  )
}

export default Form
