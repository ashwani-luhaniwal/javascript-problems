/**
 * ------------
 * 1. addAll()
 * ------------
 * This allows you to merge all key/value pairs of the provided map to the current one.
 * 
        var user = {
          "firstName": "Tom",
          "age": 25,
        };

        user.addAll({
          "lastName": "Smith",
          "age": 26,
        });

        print(user); // => {"firstName": "Tom", "age": 26, "lastName": "Smith"}
 * 
 * If a key already exists, its value will be replace. This works similarly to Object.assign in 
 * JavaScript.
 * 
 * ------------------
 * 2. containsKey()
 * ------------------
 * Checks whether the given key exists.
 * 
        print(user.containsKey("age")); // => true
        print(user.containsKey("accessToken")); // => false
 * 
 * --------------------
 * 3. containsValue()
 * --------------------
 * Checks whether the given value exists.
 * 
        print(user.containsValue("Smith")); // => true
        print(user.containsValue(40)); // => false
 * 
 * -------------
 * 4. forEach()
 * -------------
 * Runs the given function over each key/value pair.
 * 
        user.forEach((key, value) => print('Key: $key, Value: $value')); 
        // => "Key: firstName, Value: Tom" "Key: age, Value: 26" "Key: lastName, Value: Smith"
 *
 * -----------------
 * 5. putIfAbsent()
 * -----------------
 * Adds a key/value pair if non-existent. If key already exists, a value will be set if there 
 * isn’t one.
 * 
        user.putIfAbsent("accessToken", () => "abf329jklr90rnlk2..."); 
        // => {"firstName": "Tom", "age": 26, "lastName": "Smith", "accessToken": "abf329jklr90rnlk2..."}
 * 
 * ------------
 * 6. remove()
 * ------------
 * Removes the provided key and its associated value.
 * 
        user.remove("accessToken"); // => abf329jklr90rnlk2...
 * 
 * This will return the value that was removed.
 * 
 * -----------------
 * 7. removeWhere()
 * -----------------
 * Removes the key/value pair if the given condition is true
 * 
          user.removeWhere((key, value) => key == "lastName");
 * 
 * -----------
 * 8. clear()
 * -----------
 * Removes every key/value pair in the map.
 * 
          user.clear();
          print(user); // => {}
 * 
 * ------------
 * 9. update()
 * ------------
 * Updates the value for the given key.
 * 
          user["age"] = 25;
          user.update("age", (dynamic val) => ++val); // => 26
 * 
 * This also returns the new value. To prevent an error being thrown should the key not exist, 
 * there’s a third parameter:
 * 
          user.update("name", (dynamic val) => "Jim", ifAbsent: () => "Jane");
          print(user); // => {"age": 26, "name": "Jane"};
 * 
 * In most cases you could update using the array bracket notation:
 * 
          user["name"] = "Mary";
 * 
 * ---------------
 * 10. Map.from()
 * ---------------
 * This technically is a constructor, but still useful as a utility. It creates and returns a copy 
 * of the provided map.
 * 
          var userCopy = Map.from(user);
 *
 */