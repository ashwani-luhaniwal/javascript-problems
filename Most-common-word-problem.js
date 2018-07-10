/**
 * -----------------
 * Most Common Word
 * -----------------
 * Given a paragraph and a list of banned words, return the most frequent word that is not in the 
 * list of banned words. It is guaranteed there is at least one word that isn’t banned, and that 
 * the answer is unique.
 * 
 * Words in the list of banned words are given in lowercase, and free of punctuation. Words in the 
 * paragraph are not case sensitive. The answer is in lowercase.
 * 
 * Note:
 *  1 <= paragraph.length <= 1000.
 *  1 <= banned.length <= 100.
 *  1 <= banned[i].length <= 10.
 * 
 * The answer is unique, and written in lowercase (even if its occurrences in paragraph may have 
 * uppercase symbols, and even if it is a proper noun.)
 * 
 * paragraph only consists of letters, spaces, or the punctuation symbols !?',;.
 * Different words in paragraph are always separated by a space.
 * There are no hyphens or hyphenated words.
 * Words only consist of letters, never apostrophes or other punctuation symbols.
 * 
 * paragraph= "Bob hit a ball, the hit BALL flew far after it was hit."
 * banned= ["hit"]
 * 
 * Steps to solve the problem
 *  1. We have to remove all special characters using the .replace() method.
 *  2. We have to convert the paragraph to lowercase using the .toLowerCase() method.
 *  3. We have to convert the paragraph to an array using .split() method
 *  4. Filter x for banned words using the .filter() method
 *  5. Count the number of repetitive words in the filtered array using .reduce() method and store 
 *      as an Object.
 *  6. Return the word with the highest value in the Object using the .reduce() method.
 */

const paragraph= "Bob hit a ball, the hit BALL flew far after it was hit.";
const banned= ["hit"];

const mostCommonWord = (paragraph, banned) => {
  // remove special characters, convert to lowercase and an array
  let x = paragraph.replace(/[^\w\s]/g, '').toLowerCase().split(' ');

  let w = x.filter(e => {
    // filter paragraph for banned words
    return banned.indexOf(e) < 0
  }, banned).reduce((x, y) => {
    // count number of elements in the filtered paragraph
    y in x ? x[y]++ : x[y] = 1;
    return x
  }, {});

  let r = Object.keys(w).reduce((m, n) => {
    return w[m] > w[n] ? m : n
  }, [])

  return r;
}