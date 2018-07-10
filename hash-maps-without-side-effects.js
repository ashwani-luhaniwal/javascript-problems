/**
 * -------------------------------
 * Hash maps without side effects
 * -------------------------------
 * 
 * When you want to use javascript object as a hash map(purely for storing data), you might want 
 * to create it as follows.
 * 
 *  const map = Object.create(null);
 * 
 * When creating a map using object literal(const map = {}), the map inherits properties from 
 * Object by default. It is equivalent to Object.create(Object.prototype).
 * 
 * But by doing Object.create(null), we explicitly specify null as its prototype. So it have 
 * absolutely no properties, not even constructor, toString, hasOwnProperty, etc. so you’re 
 * free to use those keys in your data structure if you need to.
 */

// Rationale:
const dirtyMap = {};
const cleanMap = Object.create(null);

dirtyMap.constructor  // function Object() { [native code] }
cleanMap.constructor  // undefined

// Iterating maps
const key;
for (key in dirtyMap) {
  // Check to avoid iterating over inherited properties
  if (dirtyMap.hasOwnProperty(key)) {
    console.log(key + " -> " + dirtyMap[key]);
  }
}

for (key in cleanMap) {
  console.log(key + " -> " + cleanMap[key]);  // No need to add extra checks, as the object will always be clean
}