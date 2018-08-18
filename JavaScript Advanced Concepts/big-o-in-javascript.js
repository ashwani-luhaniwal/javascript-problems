/**
 * ---------------------------------------------
 * Big O in JS: The basic that you need to know
 * ---------------------------------------------
 * 
 * There are many ways to analyse how good is a code that you have written, some people believe 
 * that a beautiful code is better and others prefer a code with fewer lines, but there a 
 * universal way to analyse that help you to understand how fast your approach is and how 
 * sustainable your system is when running millions of operations.
 * 
 * Its a common mistake to think that performance doesn’t matter anymore once the servers and 
 * devices processing capacity is increasing every year, we always have to remember that there are 
 * a considerable number of users using old devices or low power devices like smartphones, even 
 * updated smartphones reduce its processing capacity when the battery is running low, and yet 
 * powerful devices running low when dozen of tabs is running at the same time or several apps 
 * running together.
 * 
 * So, remember, performance matters, always matters.
 * 
 * Big O Notation analyses how fast your code will run, regardless of the processing power, so 
 * when you have to choose an approach to create your system Big O Notation will help you to 
 * select the most efficient solution, let’s take some examples:
 */

const people = {
  aline: 26,
  john: 35,
  peter: 21,
  james: 45
};

const getAge = name => people[name];

/**
 * In the example above it is possible execute this operation using precisely the same time 
 * regardless the number of items inside People array, it always takes the same time, in Big O 
 * Notation its called O(1) or constant.
 * 
 * O(1) is the best scenario possible, always when is possible try to look for a way to use 
 * functions that have O(1) Notation, is impossible to have a better performance than this.
 * 
 * But in the example below the situation changes, take a look:
 */

const persons = [
  { name: 'lucy', age: 13 },
  { name: 'aline', age: 13 },
  { name: 'john', age: 35 },
  { name: 'peter', age: 21 },
  { name: 'james', age: 45 },
  { name: 'marcela', age: 17 }
];

const getGreaterThan18 = () => persons.filter(person => person.age > 18);
// or using destructuring
const getGreaterThan18_2 = () => persons.filter(({ age }) => age > 18);

/**
 * Now the number of operations will increase according to the items inside an array, it is 
 * called O(n) or Linear, this approach is the second best that you could take when you’re coding 
 * something new, of course there a lot of situations that isn’t possible use functions with O(n), 
 * but sometimes we merely decide to use an approach that will spend more processing.
 * 
 * When you use a for each inside other for each to loop the same array you have worst performance 
 * than O(1) and O(n), like below:
 */

const printItemAndNext = (...items) => {
  items.forEach((item, index) => {
    items.forEach((innerItem, innerIndex) => {
      innerIndex === index + 1 && console.log(item, innerItem)
    });
  });
}

printItemAndNext(1, 2, 3, 4)

/**
 * This case is called O(n²) or quadratic, depending on the number of items inside your array 
 * this operation will take a very long time, and sometimes is possible to do the same using O(n), 
 * you could convert this example to this:
 */

const printItemAndNext = (...items) => {
  items.forEach((item, index) => {
    items[index + 1] && console.log(item, items[index + 1])
  })
}
printItemAndNext(1, 2, 3, 4);

/**
 * When you have inside an algorithm more than one O(x) you will always consider that have the 
 * worst O(x):
 */

const people = [
  {
    name: 'Joseph',
    age: 32,
    gender: 'male'
  },
  {
    name: 'Anna',
    age: 27,
    gender: 'female'
  },
  {
    name: 'Patrick',
    age: 31,
    gender: 'male'
  },
  {
    name: 'Ricardo',
    age: 32,
    gender: 'male'
  },
  {
    name: 'Lisa',
    age: 27,
    gender: 'male'
  }
];

const peopleData = () => {
  const total = people.length;
  const names = people.map(({ name }) => name);

  const peopleWithSameAge = people.filter(({ age }) => {
    people.filter(person => person.age === age).length > 1
  });

  return {
    total,
    names,
    peopleWithSameAge
  };
};

/**
 * In this case, your algorithm has:
 * 
 * A constant operation O(1):
      
      const total = people.length;
 * 
 * 2. A Linear operation O(n)
 * 
      const names = people.map(({ name }) => name);
 * 
 * 3. A Quadratic operation O(n²)
 * 
      const peopleWithSameAge = people.filter(
        ({ age }) => people.filter(person => person.age == age).length > 1,
      );
 * 
 * In this case, we could think in this way O(1) + O(n) + O(n²) right? Nope, is more simple than 
 * that, you ignore the faster operations and consider only the slower operation, in this case, 
 * O(n²), so this is an algorithm with O(n²) notation.
 * 
 * You’ll use this same approach when you have more than one operation with the same type:
 */

const people = [
  {
    name: 'Joseph',
    age: 32,
    gender: 'male'
  },
  {
    name: 'Anna',
    age: 27,
    gender: 'female'
  },
  {
    name: 'Patrick',
    age: 31,
    gender: 'male'
  },
  {
    name: 'Ricardo',
    age: 31,
    gender: 'male'
  },
  {
    name: 'Lisa',
    age: 27,
    gender: 'female'
  }
];

const peopleData = () => {
  const total = people.length;
  const names = people.map(({ name }) => name);

  const peopleWithSameAge = people.filter(({ age }) => {
    people.filter(person => person.age === age).length > 1
  });

  const peopleWithDifferentAge = people.filter(({ age }) => {
    people.filter(person => person.age === age).length === 1
  });

  return {
    total,
    names,
    peopleWithSameAge,
    peopleWithDifferentAge
  };
};

/**
 * No, this isn’t O(2n²), it’s merely O(n²), when you have constants like this you ignore the 
 * constant and use only the original notation.
 * 
 * There are a lot of other examples of Big O Notation that you could discover, beyond that I 
 * showed there one that I really like called logarithmic notation or O(log(n)), in this case, the 
 * operations increase, ahn, in a logarithmic way, take a look in this famous example called 
 * binary search:
 */

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

/**
 * In this case the operations that you need to get the number that you’re searched increase less 
 * than in a quadratic or linear way, for example, to search for 4096 items you need only 12 
 * operations! Cool right?
 */