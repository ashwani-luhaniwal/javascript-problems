/**
 * --------------------------------------------------------------------------------------------
 * Q1: Describe inheritance and the prototype chain in JavaScript. Give an example.
 * --------------------------------------------------------------------------------------------
 * Although JavaScript is an object-oriented language, it is prototype-based and does not 
 * implement a traditional class-based inheritance system.
 * 
 * In JavaScript, each object internally references another object, called its prototype. That 
 * prototype object, in turn, has a reference to its prototype object, and so on. At the end of 
 * this prototype chain is an object with null as its prototype. The prototype chain is the 
 * mechanism by which inheritance – prototypal inheritance to be precise – is achieved in 
 * JavaScript. In particular, when a reference is made to a property that an object does not 
 * itself contain, the prototype chain is traversed until the referenced property is found (or 
 * until the end of the chain is reached, in which case the property is undefined).
 * 
 * Here’s a simple example:
 * 
      function Animal() { this.eatsVeggies = true; this.eatsMeat = false; }

      function Herbivore() {}
      Herbivore.prototype = new Animal();

      function Carnivore() { this.eatsMeat = true; }
      Carnivore.prototype = new Animal();

      var rabbit = new Herbivore();
      var bear = new Carnivore();

      console.log(rabbit.eatsMeat);   // logs "false"
      console.log(bear.eatsMeat);     // logs "true"
 */

/**
 * ---------------------------------------------------------------------------------------------
 * Q2: Compare and contrast objects and hashtables in JavaScript.
 * ---------------------------------------------------------------------------------------------
 * This is somewhat of a trick question since, in JavaScript, objects essentially are hashtables; 
 * i.e., collections of name-value pairs. In these name-value pairs, a crucial point to be 
 * aware of is that the names (a.k.a., keys) are always strings.
 */

/**
 * -----------------------------------------------------------------------------------------------
 * Q3: Consider the code snippet below (source). What will the alert display? Explain your answer.
 * 
        var foo = new Object();
        var bar = new Object();
        var map = new Object();

        map[foo] = "foo";
        map[bar] = "bar";

        alert(map[foo]);  // what will this display??
 * 
 * ------------------------------------------------------------------------------------------------
 * 
 * It is the rare candidate who will correctly answer that this alerts the string “bar”. Most 
 * will mistakenly answer that it alerts the string “foo”. So let’s understand why “bar” is 
 * indeed the correct
 * 
 * As mentioned in the answer to the prior question, a JavaScript object is essentially a 
 * hashtable of name-value pairs where the names (i.e., keys) are strings. And they are always 
 * strings. In fact, when an object other than a string is used as a key in JavaScript, no 
 * error occurs; rather, JavaScript silently converts it to a string and uses that value as the 
 * key instead. This can have surprising results, as the above code demonstrates.
 * 
 * To understand the above code snippet, one must first recognize that the map object shown does 
 * not map the object foo to the string “foo”, nor does it map the object bar to the string “bar”. 
 * Since the objects foo and bar are not strings, when they are used as keys for map, JavaScript 
 * automatically converts the key values to strings using each object’s toString() method. And 
 * since neither foo nor bar defines its own custom toString() method, they both use the same 
 * default implementation. That implementation simply generates the literal string 
 * “[object Object]” when it is invoked. With this explanation in mind, let’s re-examine the 
 * code snippet above, but this time with explanatory comments along the way:
 * 
        var foo = new Object();
        var bar = new Object();
        var map = new Object();

        map[foo] = "foo";    // --> map["[Object object]"] = "foo";
        map[bar] = "bar";    // --> map["[Object object]"] = "bar";
                            // NOTE: second mapping REPLACES first mapping!

        alert(map[foo]);     // --> alert(map["[Object object]"]);
                            // and since map["[Object object]"] = "bar",
                            // this will alert "bar", not "foo"!!
                            //    SURPRISE! ;-)
 */

/**
 * -----------------------------------------------------------------------------------------------
 * Q4: Explain closures in JavaScript. What are they? What are some of their unique features? 
 * How and why might you want to use them? Provide an example.
 * -----------------------------------------------------------------------------------------------
 * 
 * A closure is a function, along with all variables or functions that were in-scope at the time 
 * that the closure was created. In JavaScript, a closure is implemented as an “inner function”; 
 * i.e., a function defined within the body of another function. Here is a simplistic example:
 * 
        (function outerFunc(outerArg) {
          var outerVar = 3;

          (function middleFunc(middleArg) {
            var middleVar = 4;

            (function innerFunc(innerArg) {
              var innerVar = 5;
              // EXAMPLE OF SCOPE IN CLOSURE:
              // Variables from innerFunc, middleFunc, and outerFunc,
              // as well as the global namespace, are ALL in scope here.
              console.log("outerArg="+outerArg+
                          " middleArg="+middleArg+
                          " innerArg="+innerArg+"\n"+
                          " outerVar="+outerVar+
                          " middleVar="+middleVar+
                          " innerVar="+innerVar);
              // --------------- THIS WILL LOG: ---------------
              //    outerArg=123 middleArg=456 innerArg=789
              //    outerVar=3 middleVar=4 innerVar=5
            })(789);
          })(456);
        })(123);
 * 
 * An important feature of closures is that an inner function still has access to the outer 
 * function’s variables even after the outer function has returned. This is because, when 
 * functions in JavaScript execute, they use the scope that was in effect when they were created.
 * 
 * A common point of confusion that this leads to, though, is based on the fact that the inner 
 * function accesses the values of the outer function’s variables at the time it is invoked 
 * (rather than at the time that it was created). To test the candidate’s understanding of 
 * this nuance, present the following code snippet that dynamically creates five buttons and 
 * ask what will be displayed when the user clicks on the third button:
 * 
        function addButtons(numButtons) {
          for (var i = 0; i < numButtons; i++) {
            var button = document.createElement('input');
            button.type = 'button';
            button.value = 'Button ' + (i + 1);
            button.onclick = function() {
              alert('Button ' + (i + 1) + ' clicked');
            };
            document.body.appendChild(button);
            document.body.appendChild(document.createElement('br'));
          }
        }

        window.onload = function() { addButtons(5); };
 * 
 * Many will mistakenly answer that “Button 3 clicked” will be displayed when the user clicks on 
 * the third button. In fact, the above code contains a bug (based on a misunderstanding of the 
 * way closures work) and “Button 6 clicked” will be displayed when the user clicks on any of 
 * the five buttons. This is because, at the point that the onclick method is invoked (for any 
 * of the buttons), the for loop has already completed and the variable i already has a value of 5.
 * 
 * An important follow-up question is to ask the candidate how to fix the bug in the above code, 
 * so as to produce the expected behavior (i.e., so that clicking on button n will display 
 * “Button n clicked”). The correct answer, which demonstrates proper use of closures, is as 
 * follows:
 * 
        function addButtons(numButtons) {
          for (var i = 0; i < numButtons; i++) {
            var button = document.createElement('input');
            button.type = 'button';
            button.value = 'Button ' + (i + 1);
            // HERE'S THE FIX:
            // Employ the Immediately-Invoked Function Expression (IIFE)
            // pattern to achieve the desired behavior:
            button.onclick = function(buttonIndex) {
              return function() {
                alert('Button ' + (buttonIndex + 1) + ' clicked');
              };
            }(i);
            document.body.appendChild(button);
            document.body.appendChild(document.createElement('br'));
          }
        }

        window.onload = function() { addButtons(5); };
 * 
 * Although by no means exclusive to JavaScript, closures are a particularly useful construct for 
 * many modern day JavaScript programming paradigms. They are used extensively by some of the 
 * most popular JavaScript libraries, such as jQuery and Node.js.
 */

/**
 * ---------------------------------------------------------------------------------------------
 * Q5: Describe the different ways of creating objects and the ramifications of each. Provide 
 * examples.
 * ---------------------------------------------------------------------------------------------
 * 
 * The graphic below contrasts various ways in JavaScript to create objects and the differences 
 * in the prototype chains that result from each.
 * 
 *  var o = Object.create(null);  // null
 * 
 *  var o = {id: 42, name: 'John'}; -> Object.prototype -> null
 * 
 *  var a = ['John']; -> Array.prototype -> Object.prototype -> null

    function Entity(id, name) {
      this.id = id;
      this.name = name;
    }
    var o = new Entity(42, 'John'); -> Entity.prototype -> Object.prototype -> null
 *
 */

/**
 * -------------------------------------------------------------------------------------------
 * Q6: Is there ever any practical difference between defining a function as a function 
 * expression (e.g., var foo = function(){}) or as a function statement (e.g., function foo(){})? 
 * Explain your answer.
 * ---------------------------------------------------------------------------------------------
 * 
 * Yes, there is a difference, based on how and when the value of the function is assigned.
 * 
 * When a function statement (e.g., function foo(){}) is used, the function foo may be referenced 
 * before it has been defined, through a technique known as “hoisting”. A ramification of 
 * hoisting is that the last definition of the function is the one that will be employed, 
 * regardless of when it is referenced (if that’s not clear, the example code below should help 
 * clarify things).
 * 
 * In contrast, when a function expression (e.g., var foo = function(){}) is used, the function 
 * foo may not be referenced before it is defined, just like any other assignment statement. 
 * Because of this, the most recent definition of the function is the one that will be employed 
 * (and accordingly, the definition must precede the reference, or the function will be undefined).
 * 
 * Here’s a simple example that demonstrates the practical difference between the two. Consider 
 * the following code snippet:
 * 
        function foo() { return 1; }

        alert(foo());   // what will this alert?

        function foo() { return 2; }
 *
 * Many JavaScript developers will mistakenly answer that the above alert will display “1” and 
 * will be surprised to learn that it will in fact display “2”. As described above, this is due 
 * to hoisting. Since a function statement was used to define the function, the last definition 
 * of the function is the one that is hoisted at the time it is invoked (even though it is 
 * subsequent to its invocation in the code!).
 * 
 * Now consider the following code snippet:
 * 
        var foo = function() { return 1; }

        alert(foo());   // what will this alert?

        foo = function() { return 2; }
 * 
 * In this case, the answer is more intuitive and the alert will display “1” as expected. Since a 
 * function expression was employed to define the function, the most recent definition of the 
 * function is the one that is employed at the time it is invoked.
 */

/**
 * -----------------------------------------------------------------------------------------------
 * Q7: What is the significance of, and reason for, wrapping the entire content of a JavaScript 
 * source file in a function block?
 * -----------------------------------------------------------------------------------------------
 * 
 * This is an increasingly common practice, employed by many popular JavaScript libraries (jQuery, 
 * Node.js, etc.). This technique creates a closure around the entire contents of the file which, 
 * perhaps most importantly, creates a private namespace and thereby helps avoid potential name 
 * clashes between different JavaScript modules and libraries.
 * 
 * Another feature of this technique is to allow for an easily referenceable (presumably shorter) 
 * alias for a global variable. This is often used, for example, in jQuery plugins. jQuery allows 
 * you to disable the $ reference to the jQuery namespace, using jQuery.noConflict(). If this has 
 * been done, your code can still use $ employing this closure technique, as follows:
 * 
 *      (function($) { // jQuery plugin code referencing $ } )(jQuery);
 */

/**
 * ------------------------------------------------------------------------------------------------
 * Q8: What is the difference between == and ===? Between != and !==? Give an example.
 * ------------------------------------------------------------------------------------------------
 * 
 * The difference between “triple” comparison operators (===, !==) and double comparison operators 
 * (==, !=) in JavaScript is that double comparison operators perform implicit type conversion on 
 * the operands before comparing them whereas, with the triple comparison operators, no type 
 * conversion is performed (i.e., the values must be equal and the types must be the same for the 
 * operands to be considered equal).
 * 
 * As a simple example, the expression 123 == '123' will evaluate to true, whereas 123 === '123' 
 * will evaluate to false.
 */

/**
 * -----------------------------------------------------------------------------------------------
 * Q9: What is the significance of including 'use strict' at the beginning of a JavaScript source 
 * file?
 * -----------------------------------------------------------------------------------------------
 * 
 * Though there is much more to be said on the topic, the short and most important answer here is 
 * that use strict is a way to voluntarily enforce stricter parsing and error handling on your 
 * JavaScript code at runtime. Code errors that would otherwise have been ignored or would have 
 * failed silently will now generate errors or throw exceptions. In general, it is a good practice.
 */