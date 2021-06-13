const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
};

// Convert JSON Object to String
const bookString = JSON.stringify(book);

// Convert string to JSON Object
const bookJson = JSON.parse(bookString);
