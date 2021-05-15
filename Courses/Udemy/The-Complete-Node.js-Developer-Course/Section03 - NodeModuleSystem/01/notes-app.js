// Import fs from node core
const fs = require('fs');

// Create and then write into a file
fs.writeFileSync('notes.txt', 'This file was created by Node.js');

// Append Text to existing file, if the file doesn't exit a new file is created
fs.appendFileSync('notes.txt', '\nAppend Text to a new line');
