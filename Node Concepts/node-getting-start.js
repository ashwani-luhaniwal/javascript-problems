/**
 * ----------------------
 * Basic Intro on NodeJS
 * ----------------------
 * Node.js is a run time environment to execute JavaScript code outside a browser.
 * 
 * ------------------
 * Node Architecture
 * ------------------
 * Before Node.js, JavaScript’s scope was only limited to browsers. JavaScript engine inside the 
 * browsers provide run time environment to execute JavaScript code inside browsers only.
 * 
 * Ryan Dahl came up with a brilliant idea to execute JavaScript outside browsers. He wrote a 
 * C++ program and embeds Chrome’s engine V8 in it to execute JavaScript code outside browsers.
 * 
 * JavaScript engine inside Node environment has some other capabilities also, like to interact 
 * with file system, to interact with operating system, to create web servers and handle HTTP 
 * requests. However, JavaScript engine inside browser can not do these things.
 * 
 * --------------------
 * How Node.js works ?
 * --------------------
 * Node.js has non-blocking or asynchronous architecture.
 * 
 * Asynchronous? Lets have a look at an analogy to understand asynchronous and synchronous 
 * architecture.
 *  - Asynchronous : In a restaurant, there are n number of tables and a single waiter. When a 
 *    person on table gives his order, Waiter takes the order and give it to chef. While chef 
 *    was preparing the order, waiter goes to another table to take an order. Waiter also kept 
 *    looking towards the kitchen if any order is prepared. If, any order is prepared, waiter 
 *    serves the order to table. So, a single waiter is serving multiple tables. This is 
 *    asynchronous approach.
 *  - Synchronous : The waiter takes order from table and gives it to chef and keep waiting in 
 *    kitchen for the order to be prepared and after the preparation it serves the meal to table. 
 *    So, the waiter is serving only a single table until the meal is served to table. This is 
 *    synchronous approach. If the restaurant has n number of waiters to serve n number of tables, 
 *    we can call it as multi-threaded synchronous approach.
 * 
 * Node JS works like the asynchronous example given above. Think of the waiter as processing 
 * thread, tables as client , chef as server and the waiter looking at kitchen for prepared orders 
 * as event queue monitoring.
 * 
 * When the request arrives, the thread listens the request and take it to server.
 * 
 * If the server has to query file system or database, the thread doesn’t need to wait. Instead it 
 * will be ready to handle another request.
 * 
 * When the response is ready from server for client 1, it will put a message in Event Queue.
 * 
 * The thread is continuously monitoring the queue. Whenever there is a message in event queue, it 
 * takes the data from server and process it to specific client.
 * 
 * We can see here, a single thread is serving multiple client requests. That’s why Node.js is 
 * called single threaded.
 * 
 * As we know Node JS is a C++ program with embedded V8 engine. When we pass the file to Node, it 
 * gives the file to V8 engine which executes the JS and prints the output.
 * 
 * Node.js doesn’t have ‘window’ or ‘document’ objects. These objects are available in only browser 
 * run time environment. Node has some other objects which are not available in browser environment, 
 * like OS, FS, HTTP, PATH etc.
 * 
 * -------------------
 * Node Module System
 * -------------------
 * Modules are the core concept of Node.js. Module can be referred as a single JavaScript file.
 * There are two types of modules in Node JS:
 *  - Built-in modules
 *  - Custom modules
 * 
 * --------------
 * Global Object
 * --------------
 * As we know we have two run time environments:
 *  - Browser run time environment (To execute JavaScript inside browser)
 *  - Node run time environment (To execute JavaScript outside browser)
 * 
 * In browser environment, if we have a global variable, it is be accessible by ‘window’ object. 
 * All the function like console.log(), setTimeout() are accessible with ‘window’ object. 
 * Internally, global variables and functions are executed using ‘window’ object.
 * 
        // Browser run time Environment 
        var a = 10;
        console.log(a)             // 10
        console.log(window.a)      // 10
        window.console.log(a)      // 10
 * 
 * As we have already seen in an example that we don’t have ‘window’ object in Node run time 
 * environment. But, In Node modules, there are also some global objects which are available 
 * globally i.e we can use them in any module. 
 * 
 * Example: console.log(), setTimeout(), clearTimeout() etc. This is possible because we have 
 * ‘global’ object which is available globally.
 * 
        // Node run time Environment 
        console.log('Hello World')             //Hello World
        global.console.log('Hello World')      //Hello Wolrd
 * 
 * But, variables and methods declared globally in Node JS are not accessible with global object.
 * 
        var name= 'shergill';
        console.log(name)                //shergill
        console.log(global.name)         //undefined
 * 
 * Scope of variables declared globally in Node JS run time environment is limited to single file 
 * or module only.
 * 
 * Wondering why global variables are not available with global object and how Node prevent other 
 * modules to use other module’s global variable?We will look into this but first lets see the 
 * benefit of this approach:
 * 
 * In browser environment, if the global variable is declared with same name in two files, the 
 * variable is overwritten by later declaration. But this is not applicable in Node environment, 
 * because the scope of globally declared variables is limited to single module or file only. 
 * Global variables in different modules are treated as different variables.
 * 
 * Now thinking, then how to access variables of one module in other module. eh..?
 * 
 * If we want to use the variables in different modules, we have to explicitly export variables, 
 * methods to make them public.
 * 
 * We will be using some objects like modules, exports, require further to understand the variable 
 * global scope, exporting variable, importing variable. It may look, these objects are available 
 * with global object, but these are not. These are specific to module. 
 * 
 *  - module: module is a JSON object which which keeps the data of module.
 *  - exports: exports is an object in module object which contains the information of exported 
 *    variables and methods.
 *  - require: require object is used to import a module.
 * 
 * ----------------------------------------------------------
 * Code syntax for using module,exports and require objects:
 * ----------------------------------------------------------
 * Exporting a variable or method :
 * 
        module.exports.customName = variableToExport
 * 
 * Importing a variable or method :
 * We import the whole module and the variables exported in that module can be used in module.
 * 
        var variableName = require(‘./moduleName’);
 * 
 * variableName.customName is used to use exported variable or method.
 * 
 * It is always a good practice to import module using const keyword. This will help us to not 
 * overwrite the imported module. If we accidentally, overwrites the variable, we will get an 
 * error that const variable can’t be overwritten.
 * 
 * Now come back to the question, how Node JS prevent global variable from accessing by other 
 * modules. The answer is Module Wrapper function.
 * 
 * ------------------------
 * Module wrapper function
 * ------------------------
 * Lets break the Magician’s Code:
 * 
 * There is a very simple trick used to prevent the access of variables by other modules and that 
 * trick is IIFE (Immediately invoked function expression).
 * 
 * Actually Node doesn’t run the code directly. Code is executed by an IIFE.
 * 
          var name = 'shergill'
          console.log(name) 
 * 
 * Code given above is actually executed as following:
 * 
          (function(exports, require, module,__filename, __dirname){
                var name = 'shergill'
                console.log(name)
          })();
 * 
 * So, the variable name is not a global variable in real. It is actually declared inside a 
 * function. That’s why it not available to access by other modules. Parameters exports, module, 
 * require are used to export and import the variables and methods. __filename , __dirname 
 * contains the path of file and directory respectively. You can print the values of these 
 * variables and verify them.
 * 
 * We can also see that module, exports, require objects are passed as arguments to IIFE. These 
 * objects are available in current module only. The only reason that these objects are available 
 * in all modules is that, they are passed in IIFE. It may look like these are available globally,
 * but these are not. These objects are specific to its module only.
 */