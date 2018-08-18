/**
 * -----------------------------------
 * Functional Approach: Destructuring
 * -----------------------------------
 * When we call a JS function we have problems to identify the parameters name, once we only send 
 * the argument, like in the example below:
 */

function showNameAndAge(name, age) {
  return `Hello ${name}, you are ${age} years old`;
}

showNameAndAge('Ricardo', 32);  // right
showNameAndAge(32, 'Ricardo');  // wrong

/**
 * The problem is, the arguments have no name, but they have a specific order, depending on your 
 * code this is a door to create bugs once it is easy to put this parameter in a different order.
 * 
 * This case is only one of the things that destructuring helps you to solve! Using destructuring 
 * you could nominate your parameters using a simple array, like this:
 */

function showNameAndAge({name, age}) {
  return `Hello ${name}, you are ${age} years old`;
}

showNameAndAge({name: 'Ricardo', age: 32}); // right
showNameAndAge({age: 32, name: 'Ricardo'}); // wrong

/**
 * Cool right? Now the order doesn’t matter anymore, and you only needed to add “{“ before your 
 * parameters and “}” after.
 * 
 * But there is more, using this technique you could define a default value for your parameters 
 * like this:
 */

function showNameAndAge({name = 'Ricardo', age = 32}) {
  return `Hello ${name}, you are ${age} years old`;
}

showNameAndAge({name: 'Ricardo', age: 32}); // right
showNameAndAge({age: 32, name: 'Ricardo'}); // also right!
showNameAndAge(); // also right

/**
 * Also, you can use destructuring to extract from a long array only the keys that you want to 
 * use and transform this keys into a new variable, like this:
 */

const profile = {
  name: 'Ricardo',
  age: 32,
  eyes: 'Brown',
  origin: 'Brazil',
  occupation: 'Fullstack dev'
};

const {name, age} = profile;
console.log(name, age); // will show Ricardo, 32
