/**
 * --------------------------------------
 * Implement Array.reduce with Recursion
 * --------------------------------------
 * 
 * My last two posts covered recursive Array.map and Array.filter implementations. I don’t recommend 
 * anyone actually use them in their apps due to performance and uncaught edge-cases.
 * 
 * That being said, walking through these alternate solutions helps broaden our perspectives and 
 * perhaps apply the concepts in other situations.
 * 
 * You might see this naive reduce implementation:
 * 
          reduce = (fn, acc, arr) => {
            for (let i = 0; i < arr.length; i++) {
              acc = fn(acc, arr[i]);
            }
            return acc;
          }
 * 
 * And use it like this:
 * 
          add = (x, y) => x + y;
          reduce(add, 0, [1, 2, 3]); // 6
 * 
 * You’d get the same result with this recursive implementation:
 * 
          reduce = (fn, acc, [head, ...tail]) => head === undefined ?
            acc : reduce(fn, fn(acc, head), tail);
 * 
 * I find this one much easier to read than recursive map and filter. If you understand those, 
 * this one’s a piece of cake.
 * 
 * Let’s step through this in the browser console. Here’s an expanded version with debugger 
 * statements:
 * 
          reduce = (fn, acc, [head, ...tail]) => {
            if (head === undefined) {
              debugger;
              return acc;
            }
            debugger;
            return reduce(fn, fn(acc, head), tail);
          };
 * 
 * Then we’ll call this in the console:
 * 
          add = (x, y) => x + y;
          reduce(add, 0, [1, 2, 3]);
 * 
 * Round 1
 * ========
 * We see our local variables:
 *  - acc: our initial value of 0
 *  - fn: our add function
 *  - head: the array’s first element, 1
 *  - tail: the array’s other elements packed into a separate array, [2, 3]
 * 
 * Since head isn’t undefined we’re going to recursively call reduce, passing along its required 
 * parameters:
 *  - fn: Obviously the add function again
 *  - acc: The result of calling fn(acc, head). Since acc is 0, and head is 1, add(0, 1) returns 1.
 *  - tail: The array’s leftover elements. By always using tail, we keep cutting the array down 
 *    until nothing’s left!
 */