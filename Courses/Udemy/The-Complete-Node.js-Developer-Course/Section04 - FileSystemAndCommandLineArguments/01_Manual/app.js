// Command Line Arguments

// Grab the user parameter
const command = process.argv[2];

// node app.js add
if (command === 'add') console.log('Adding Notes');

// node app.js remove
if (command === 'remove') console.log('Removing note!');
