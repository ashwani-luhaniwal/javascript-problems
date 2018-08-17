/**
 * ---------------------------
 * JavaScript Design Patterns
 * ---------------------------
 * 
 * ---------------------
 * Constructor Pattern
 * ---------------------
 * In classical object-oriented programming languages, a constructor is a special method used to 
 * initialize a newly created object once memory has been allocated for it. In JavaScript, as 
 * almost everything is an object, we’re most often interested in object constructors.
 * 
 * Object constructors are used to create specific types of objects — both preparing the object 
 * for use and accepting arguments which a constructor can use to set the values of member 
 * properties and methods when the object is first created.
 * 
 * 1. Object Creation
 * ===================
 */

// Each of the following options will create a new empty object:
var newObject = {};
// or 
var newObject = Object.create( Object.prototype );
// or 
var newObject = new Object();

/**
 * 2. Basic Constructors
 * ======================
 */

function person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function () {
    return this.firstName + " " + this.lastName;
  }
}
var person1 = new person('Akash', 'Pal');
var person2 = new person('Black', 'Panther');
person1.fullName(); // Akash Pal
person2.fullName(); // Black Panther
person1 // {firstName: "Akash", lastName: "Pal", fullName: f}
person2 // {firstName: "Black", lastName: "Panther", fullName: f}

// Another example

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);
console.log(civic.toString());
console.log(mondeo.toString());

/**
 * 3. Constructor with prototypes
 * ================================
 */

function Car (model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
// Note here that we are using Object.prototype.newMethod rather than Object.prototype so as to avoid
// redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
var civic = new Car("Honda Civic", 2009, 20000);
console.log(civic.toString());

/**
 * ---------------
 * Module Pattern
 * ---------------
 * The Module pattern was originally defined as a way to provide both private and public 
 * encapsulation for classes in conventional software engineering.
 * 
 * In JavaScript, the Module pattern is used to further emulate the concept of classes in such a 
 * way that we’re able to include both public/private methods and variables inside a single object, 
 * thus shielding particular parts from the global scope. What this results in is a reduction in 
 * the likelihood of our function names conflicting with other functions defined in additional 
 * scripts on the page.
 */

var personModule = (function() {
  var firstName;
  var lastName;

  return {
    setName(f, l) {
      firstName = f;
      lastName = l;
    },
    getName() {
      return firstName + " " + lastName;
    }
  }
})();
personModule.setName('akash', 'pal');
personModule.getName()  // akash pal

// Another example

var testModule = (function() {
  var counter = 0;
  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    }
  };
})();
testModule.incrementCounter();
testModule.resetCounter();

/**
 * -------------------------
 * Revealing Module Pattern
 * -------------------------
 * An updated pattern where we would simply define all of our functions and variables in the 
 * private scope and return an anonymous object with pointers to the private functionality we 
 * wished to reveal as public.
 */

var personModule = (function() {
  var firstName;
  var lastName;

  function setName(f, l) {
    firstName = f;
    lastName = l;
  }

  function getName() {
    return firstName + " " + lastName;
  }

  return {
    setName: setName,
    getName: getName
  }
})();
personModule.setName('ashwani', 'kumar');
personModule.getName(); // ashwani kumar

/**
 * ------------------
 * Singleton Pattern
 * ------------------
 * The Singleton pattern is thus known because it restricts instantiation of a class to a single 
 * object. Classically, the Singleton pattern can be implemented by creating a class with a method 
 * that creates a new instance of the class if one doesn’t exist. In the event of an instance 
 * already existing, it simply returns a reference to that object.
 */

var singleton = (function() {
  var instance;

  function init() {
    var name;

    this.setName = function(name) {
      this.name = name;
    }

    this.getName = function() {
      return this.name;
    }

    return {
      setName: setName,
      getName: getName
    }
  }

  function getInstance() {
    if (!instance) {
      instance = init();
    }

    return instance;
  }

  return {
    getInstance: getInstance
  }

})();

var one = singleton.getInstance();
var two = singleton.getInstance();

// the two instances are same
one == two  // true

one.setName('Ashwani');
two.getName();  // Ashwani

// Another example

var mySingleton = (function() {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton

    // Private methods and variables
    function privateMethod() {
      console.log('I am private');
    }

    var privateVariable = 'Im also private';

    var privateRandomNumber = Math.random();

    return {
      // Public methods and variables
      publicMethod: function() {
        console.log('The public can see me!');
      },

      publicProperty: 'I am also public',

      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if doesn't
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };

})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

// Note: as we are working with random numbers, there is a mathematical possibility both numbers
// will be the same, however unlikely. The above example should otherwise still be valid.

/**
 * -----------------
 * Observer Pattern
 * -----------------
 * The Observer is a design pattern where an object (known as a subject) maintains a list of 
 * objects depending on it (observers), automatically notifying them of any changes to state.
 *  - Subject: maintains a list of observers, facilitates adding or removing observers
 *  - Observer: provides an update interface for objects that need to be notified of a Subject’s 
 *    changes of state
 *  - ConcreteSubject: broadcasts notifications to observers on changes of state, stores the 
 *    state of ConcreteObservers
 *  - ConcreteObserver: stores a reference to the ConcreteSubject, implements an update 
 *    interface for the Observer to ensure state is consistent with the Subject’s
 * 
 * --------------------------
 * Publish/Subscribe Pattern
 * --------------------------
 * The Observer pattern requires that the observer (or object) wishing to receive topic 
 * notifications must subscribe this interest to the object firing the event (the subject).
 * 
 * The Publish/Subscribe pattern however uses a topic/event channel which sits between the objects 
 * wishing to receive notifications (subscribers) and the object firing the event (the publisher). 
 * This event system allows code to define application specific events which can pass custom 
 * arguments containing values needed by the subscriber. The idea here is to avoid dependencies 
 * between the subscriber and publisher.
 * 
 * This differs from the Observer pattern as it allows any subscriber implementing an appropriate 
 * event handler to register for and receive topic notifications broadcast by the publisher.
 */

var pubsub = {};

(function(myObject) {
  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // A topic identifier
  var subUid = -1;
  
  // Publish or broadcast events of interest with a specific topic name and arguments such as the
  // data to pass along
  myObject.publish = function (topic, args) {
    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic],
        len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  };

  // Subscribe to events of interest with a specific topic name and a callback function, to be
  // executed when the topic/event is observed
  myObject.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  // Unsubscribe from a specific topic, based on a tokenized reference to the subscription
  myObject.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0; j = topics[m].length && i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };
}(pubsub));

// Another simple message handler

// A simple message logger that logs any topics and data received through our subscriber
var messageLogger = function (topics, data) {
  console.log('Logging: ' + topics + ': ' + data);
};

// Subscribers listen for topics they have subscribed to and invoke a callback function 
// (eg. messageLogger) once a new notification is broadcast on that topic
var subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

// Publishers are in change of publishing topics or notifications of interest to the application.
pubsub.publish('inbox/newMessage', 'hello world!');

// or
pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

// or
pubsub.publish('inbox/newMessage', {
  sender: 'hello@google.com',
  body: 'Hey again!'
});

// We can also unsubscribe if we no longer wish for our subscribers to be notified
pubsub.unsubscribe(subscription);

// Once unsubscribed, this for example won't result in our messageLogger being executed as the
// subscriber is no longer listening
pubsub.publish('inbox/newMessage', 'Hello! are you still there?');

/**
 * -----------------
 * Mediator Pattern
 * -----------------
 * A Mediator is an object that coordinates interactions (logic and behavior) between multiple 
 * objects. It makes decisions on when to call which objects, based on the actions (or inaction) 
 * of other objects and input.
 */

var orgChart = {
  addNewEmployee: function () {
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();

    // when the employee detail is complete, the mediator (the 'orgchart' object) decides what
    // should happen next
    employeeDetail.on('complete', function(employee) {
      // set up additional objects that have additional events, which are used by the mediator
      // to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on('save', function(employee) {
        employee.save();
      });
    });
  },
  // ....
}

/**
 * ------------------
 * Prototype Pattern
 * ------------------
 * We can think of the prototype pattern as being based on prototypal inheritance where we create 
 * objects which act as prototypes for other objects. The prototype object itself is effectively 
 * used as a blueprint for each object the constructor creates. If the prototype of the constructor 
 * function used contains a property called name for example (as per the code sample lower down), 
 * then each object created by that same constructor will also have this same property.
 * 
 * Real prototypical inheritance, as defined in the ECMAScript 5 standard, requires the use of 
 * Object.create
 */

function person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

person.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

var person1 = new person('Ashwani', 'Kumar');
var person2 = new person('Black', 'Pearl');
person1 // {firstName: "Ashwani", lastName: "Kumar"}
person2 // {firstName: "Black", lastName: "Pearl"}
person1.fullName()  // Ashwani Kumar
person2.fullName()  // Black Pearl

// Another example
var myCar = {
  name: 'Ford Escort',
  drive: function() {
    console.log('Weee. Im driving');
  },
  panic: function() {
    console.log('Wait. How do you stop this thing?');
  }
};

// use Object.create to instantiate a new car
var yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name);

/**
 * The prototype pattern without directly using Object.create
 */

var vehiclePrototype = {
  init: function(carModel) {
    this.model = carModel;
  },

  getModel: function() {
    console.log('the model is this vehicle is..' + this.model);
  }
};

var vehicle = (function() {
  function F() {}

  return function (proto) {
    F.prototype = proto;
    return new F();
  };
})();

var car = vehicle(vehiclePrototype);
car.init('Ford');
car.getModel(); // The model of this vehicle is..Ford

/**
 * ----------------
 * Command Pattern
 * ----------------
 * The Command pattern aims to encapsulate method invocation, requests or operations into a 
 * single object and gives us the ability to both parameterize and pass method calls around that 
 * can be executed at our discretion. In addition, it enables us to decouple objects invoking the 
 * action from the objects which implement them, giving us a greater degree of overall flexibility 
 * in swapping out concrete classes(objects).
 */

var name = {
  fName: 'aaa',
  lName: 'bbb',
  setName: function(fName, lName) {
    this.fName = fName;
    this.lName = lName;
  },
  getName: function() {
    return this.fName + " " + this.lName;
  }
}

name.execute = function(key) {
  var methodName = name[key];
  var functionParamsArray = [].splice.call(arguments, 1);
  return methodName.apply(name, functionParamsArray);
}

name.execute('setName', 'Ashwani', 'Kumar');
console.log(name.execute('getName')); // Ashwani Kumar

// Another example
var carManager = {
  // request information
  requestInfo: function (model, id) {
    return 'This information for ' + model + ' with ID ' + id + ' is foobar';
  },

  // purchase the Car
  buyVehicle: function (model, id) {
    return 'You have successfully purchased Item ' + id + ', a ' + model;
  },

  // arrange a viewing
  arrangeViewing: function (model, id) {
    return 'You have successfully booked a viewing of ' + model + ' ( ' + id + ' ) ';
  }
};

carManager.execute = function (name) {
  return carManager[name] && carManager[name].apply(carManager, [].splice.call(arguments, 1));
};

console.log(carManager.execute('buyVehicle', 'Ford Escort', '453543'));
console.log(carManager.execute('arrangeViewing', 'Ferrari', '14523'));
console.log(carManager.execute('requestInfo', 'Ford Mondeo', '54323'));

/**
 * ---------------
 * Facade Pattern
 * ---------------
 * Facades are a structural pattern which can often be seen in JavaScript libraries like jQuery 
 * where, although an implementation may support methods with a wide range of behaviors, only a 
 * “facade” or limited abstraction of these methods is presented to the public for use.
 * 
 * Facades can also be integrated with other patterns such as the Module pattern.
 */

var module = (function() {
  var _private = {
    i: 5,
    get: function() {
      console.log('current value: ' + this.i);
    },
    set: function(val) {
      this.i = val;
    },
    run: function() {
      console.log('running');
    },
    jump: function() {
      console.log('jumping');
    }
  };

  return {
    facade: function(args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  };
}());

// Outputs: 'current value: 10' and 'running'
module.facade({run: true, val: 10});

/**
 * ----------------
 * Factory Pattern
 * ----------------
 * The Factory pattern is another creational pattern concerned with the notion of creating objects. 
 * Where it differs from the other patterns in its category is that it doesn’t explicitly require 
 * us to use a constructor. Instead, a Factory can provide a generic interface for creating objects, 
 * where we can specify the type of factory object we wish to be created.
 */

function Bike(options) {
  this.wheels = 2;
  this.color = options.color;
}

function Car(options) {
  this.wheels = 4;
  this.color = options.color;
}

function VehicleFactory() {}

VehicleFactory.prototype.createVehicle = function(options) {
  switch(options.type) {
    case 'Bike':
      this.vehicleClass = Bike;
      break;
    case 'Car':
      this.vehicleClass = Car;
      break;
    default:
      this.vehicleClass = Bike;
  }

  return new this.vehicleClass(options);
}

var vehicleFactory = new VehicleFactory();

var bike = vehicleFactory.createVehicle({
  type: 'Bike',
  color: 'black'
});

console.log(bike);  // Bike {wheels: 2, color: 'Black'}

var car = vehicleFactory.createVehicle({
  type: 'Car',
  color: 'white'
});

console.log(car); // Car {wheels: 4, color: 'white'}

// Another example

// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car(options) {
  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}

// A constructor for defining new trucks
function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelSize || 'large';
  this.color = options.color || 'blue';
}

// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Out default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

//Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (options) {
  switch(options.vehicleType) {
    case 'car':
      this.vehicleClass = Car;
      break;
    case 'truck':
      this.vehicleClass = Truck;
      break;
    // defaults to VehicleFactory.prototype.vehicleClass (Car)
  }

  return new this.vehicleClass(options);
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
  vehicleType: 'car',
  color: 'yellow',
  doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color 'yellow', doors: 6 in a 'brand new' state
console.log(car);

/**
 * --------------
 * Mixin Pattern
 * --------------
 * Mixins are classes which offer functionality that can be easily inherited by a sub-class or 
 * group of sub-classes for the purpose of function re-use.
 */

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Define a subclass constructor for "Superhero":
function Superhero(firstName, lastName, powers) {
  // super call

  // Invoke the superclass constructor on the new object then use .call() to invoke the 
  // constructor as a method of the object to be initialized.
  Person.call(this, firstName, lastName);

  // Finally, store their powers, a new array of traits not found in a normal 'Person'
  this.powers = powers;
};

Superhero.prototype = new Object(Person.prototype);

Superhero.prototype.showPowers = function() {
  return this.powers;
}

var superhero1 = new Superhero('Iron', 'Man', ['Flying suit', 'Jarvis']);
console.log(superhero1.fullName() + '-' + superhero1.showPowers());
// Iron Man-Flying suit, Jarvis