/**
 * -------------------------------------------------
 * Flattening multidimensional Arrays in JavaScript
 * -------------------------------------------------
 * 
 * There are the three known ways to merge multidimensional array into a single array.
 * 
 * Given this array:
 *    var myArray = [[1, 2], [3, 4, 5], [6, 7, 8, 9]];
 * 
 * We wanna have this result:
 *    [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * 
 * -----------------------------------------------
 * Solution 1: Using concat() and apply() methods
 * -----------------------------------------------
 */
var myArray = [[1, 2], [3, 4, 5], [6, 7, 8, 9]];
var myNewArray = [].concat.apply([], myArray);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * ---------------------------
 * Solution 2: Using reduce()
 * ---------------------------
 */
var myArray = [[1, 2], [3, 4, 5], [6, 7, 8, 9]];
var myNewArray = myArray.reduce((prev, curr) => {
  return prev.concat(curr);
});

// Solution 3

var myNewArray = [];
for (var i = 0; i < myArray.length; i++) {
  for (var j = 0; j < myArray[i].length; j++) {
    myNewArray.push(myArray[i][j]);
  }
}
console.log(myNewArray);

// Using spread operator in ES6
var myNewArray = [].concat(...myArray);
console.log(myNewArray);