const validator = require('validator');

// True
console.log(validator.isEmail('info@ekerem.ch'));

// False (Missing double slash )
console.log(validator.isURL('https:/www.kerem.ch'));

// True
console.log(validator.isURL('https://www.kerem.ch'));


