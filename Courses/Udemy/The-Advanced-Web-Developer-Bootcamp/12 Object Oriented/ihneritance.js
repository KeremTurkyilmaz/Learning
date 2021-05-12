function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.sayHi = function () {
  return "Hi " + this.firstName + " " + this.lastName;
};

function Student() {
  Person.apply(this, arguments);
}
Student.prototype = Object.create(Person.prototype);
// Reset the constructor property
Student.prototype.constructor = Student;

var elie = new Student("Elie", "Steal");

elie.sayHi(); // Hi Elie Steal

/* 
+-----------------------------------------------+
| Exercise                                      |
+-----------------------------------------------+
    1 - Create a constructor function for a Vehicle. 
        Each vehicle should have a 
        make, model and year property.

    2 - Add a function to the Vehicle 
        prototype called start which returns 
        the string "VROOM!"

    3 - Add a function to the Vehicle prototype 
        called toString which returns the string 
        "The make, model, and year are" 
        concatenated with the make, model and year property

    4 - Create a constructor function for a Car. 
        Each object created from the Car function should 
        also have a make, model, and year and a property 
        called numWheels which should be 4. 
        The Car prototype should inherit all of 
        the methods from the Vehicle prototype
    
    5 - Create a constructor function for a Motorcycle. 
        Each object created from the Motorcycle function should 
        also have a make, model, and year and a property called 
        numWheels which should be 2. The Motorcycle prototype 
        should inherit all of the methods from the Vehicle prototype

*/

// Step 01
function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// Step 02
Vehicle.prototype.start = function () {
  return "VROOM!";
};

// Step 03
Vehicle.prototype.toString = function () {
  return `The make, model, and year are ${this.make} ${this.model} ${this.year}`;
};

function Car(make, model, year) {
  Vehicle.apply(this, arguments);
  this.numWheels = 4;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(make, model, year) {
  Vehicle.apply(this, arguments);
  this.numWheels = 2;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
