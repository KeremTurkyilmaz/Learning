/*
So what is 'this': 
 - A reserved keyword in Javascript
 - Usually determined by how a function is called (execution context)
 - Can be determined using four rules (global, object/implicit, explicit, new)
*/

/*
--------------------------------
Global Context
--------------------------------
*/
console.log(this); // Window

function whatIsThis() {
  return this;
}
whatIsThis(); // Window

function variablesInThis() {
  this.person = "Ellie";
}
variablesInThis(); // The keyword "this" inside the function is the window
console.log(person); // Ellie

/*
--------------------------------
Implicit / Object
--------------------------------
*/
var person = {
  firstName: "Elie",
  sayHi: function () {
    return "Hi " + this.firstName;
  },
  determineContext: function () {
    return this === person;
  },
};
person.sayHi(); // Hi Elie
person.determineContext(); // True

var person = {
  firstName: "Elie",
  determineContext: this,
};
person.determineContext; //window

var person = {
  firstName: "Colt",
  sayHi: function () {
    return "Hi " + this.firstName;
  },
  determineContext: function () {
    return this === person;
  },
  dog: {
    sayHello: function () {
      return "Hello " + this.firstName;
    },
    determineContext: function () {
      return this === person;
    },
  },
};
person.dog.sayHello()  // Undefined
person.dog.determineContext()  // False


