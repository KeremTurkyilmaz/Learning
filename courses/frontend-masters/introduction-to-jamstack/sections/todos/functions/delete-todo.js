const sendQuery = require('./utils/send-query');

const DELETE_TODO = `
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`;

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(DELETE_TODO, { id });
  console.log(data, errors);
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  console.log('Data', data);
  return {
    statusCode: 200,
    body: JSON.stringify({ deletedTodo: data.deleteTodo }),
  };
};
