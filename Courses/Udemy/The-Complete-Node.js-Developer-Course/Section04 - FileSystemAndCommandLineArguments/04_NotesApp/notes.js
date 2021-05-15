const fs = require('fs');

const fileName = 'notes.json';

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(fileName);
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const jsonNotes = JSON.stringify(notes);
  fs.writeFileSync(fileName, jsonNotes);
};

const addNote = (title, body) => {
  const notes = loadNotes();

  // Return the value of the first element, otherwise return undefined
  const duplicateNote = notes.find((note) => note.title === title);

  // Add notes only when there is no duplicate note
  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log('New note added !');
  } else {
    console.log('Note title already taken !');
  }
};

const removeNote = (title) => {
  // Load all the notes
  const notes = loadNotes();

  // Find the index of the corresponding note
  const targetNoteIndex = notes.findIndex((note) => note.title === title);

  // Remove note only if it is in the array
  if (targetNoteIndex != -1) {
    console.log('Note removed !');
    // Remove note from the array
    notes.splice(targetNoteIndex, 1);
    // Save new notes array
    saveNotes(notes);
  } else {
    console.log('Note Not Found !');
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log('Your Notes!');
  notes.forEach((note, i) => console.log(`${i}: ${note.title}`));
};

const readNote = (title) => {
  const notes = loadNotes();
  const queryNote = notes.find((note) => note.title === title);

  if (queryNote) {
    console.log('One match found');
    console.log(`Title: ${queryNote.title} \nBody: ${queryNote.body}`);
  } else {
    console.log('Note Not Found');
  }
};

module.exports = { addNote, removeNote, listNotes, readNote };
