/*
Prototype
 - Every constructor function has a property on it called 
   "prototype", which is an object
 - The Prototype object has property on it called "constructor", 
   which points back to the constructor function
 - Anytime an object is created using the "new" keyword, a property called "__proto__"
   gets created, linking the object and the prototype property of the
   constrctor function
*/

// This is the constructor function
function Person(name) {
  this.name = name;
}

// These are object created from Person
var elie = new Person("Elie");
var colt = new Person("Colt");

// Since we used the "new" keyword, we have established
// a link between the object and the prototype property
// we can access that using __proto__
console.log(elie.__proto__ === Person.prototype); // true
console.log(colt.__proto__ === Person.prototype); // true

// The Person.prototype object also has a property
// called constructor which points back to the function
console.log(Person.prototype.constructor === Person); // true

Person.prototype.isInstructor = true;

console.log(elie.isInstructor); // true
console.log(colt.isInstructor); // true
// How we are able to access property on the prototype => __proto__

/*
+-----------------------------------------------+
| Refactoring                                   |
| But every time we make an object using the    |
| "new" keyboard we have to redefine the        |
| sayHi function                                |
+-----------------------------------------------+
 */
function Person(name) {
  this.name = name;
  this.sayHi = function () {
    return "Hi " + this.name;
  };
}

/*
+-----------------------------------------------+
| Refactoring                                   |
| Avoid redefine sayHi function for multiple    |
| Person definition                             |
+-----------------------------------------------+
*/
function Person(name) {
  this.name = name;
}

// Example
Person.prototype.sayHi = function () {
  return "Hi " + this.name;
};

function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

Vehicle.prototype.turnOn = function () {
  this.isRunning = true;
};
Vehicle.prototype.turnOff = function () {
  this.isRunning = false;
};
Vehicle.prototype.honk = function () {
  if (this.isRunning) return "beep";
};

/*
+-----------------------------------------------+
| Exercise                                      |
+-----------------------------------------------+
    1 - Create a constructor function for a Person. 
        Each person should have a 
        firstName, lastName, favoriteColor, favoriteNumber)

    2 - Add a function on the Person.prototype called 
        fullName that returns the firstName and lastName 
        property of an object created by the Person
        constructor concatenated together.
    
    Examples
    var person = new Person("Elie", "Schoppik", "purple", 34)
    person.fullName() // "Elie Schoppik"

    3 - Add a property on the object created from the Person
        function called family which is an empty array. 
        This will involve you going back and adding an additional 
        line of code to your Person constructor you previously 
        created in exercise 1.

    4 - Add a function on the Person.prototype called addToFamily
        which adds an object constructed from the Person constructor
        to the family array. To make sure that the object you
        are adding is an object construced from the Person 
        constructor (HINT - take a look at the instanceof keyword). 
        Make sure that your family array does not include duplicates!
        This method should return the length of the family array.
    
    Examples: 
    var person = new Person("Elie", "Schoppik", "purple", 34)
    var anotherPerson = new Person()
    person.addToFamily(anotherPerson); // 1
    person.addToFamily(anotherPerson); // 1
    person.family.length // 1
  
    person.addToFamily("test"); // 1
    person.addToFamily({}); // 1
    person.addToFamily([]); // 1
    person.addToFamily(false); // 1
    person.family.length // 1ƒ
*/

function Person(firstName, lastName, favoriteColor, favoriteNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
  this.family = [];
}

Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.addToFamily = function (p) {
  if (p instanceof Person) {
    this.family.push(p);
    this.family = [...new Set(this.family)];
  }
  return this.family.length;
};

/*

 1 - Implement your own version of Array.prototype.map. 
     The function should accept a callback and return a 
     new array with the result of the callback for each 
     value in the array.

 2 - Implement a function called reverse that reverses
     a string and place it on the String.prototype

 Examples:
     "test".reverse() // "tset"
     "tacocat".reverse() // "tacocat"
*/
Array.prototype.map = function (fn) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(fn(this[i], i, this));
  }
  return newArr;
};

String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};
