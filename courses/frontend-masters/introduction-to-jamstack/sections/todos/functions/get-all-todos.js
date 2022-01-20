const GET_ALL_TODOS = `
  query {
    allTodos {
      data {
          _id
        text
        completed
      }
    }
  }
`


