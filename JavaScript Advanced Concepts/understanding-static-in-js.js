/**
 * -----------------------------------
 * Understanding Static in JavaScript
 * -----------------------------------
 * 
 * Static properties are properties of a class, not of an instance of a class.
 * 
 * In university, I was taught object-oriented programming in Java. Like most beginners, the first 
 * thing I learned was some version of this:
 * 
              public class HelloWorld {
                public static void main(String[] args) {
                  System.out.println("Hello World");
                }
              }
 * 
 * Getting started, I was confused by all these keywords. public, static, void, String, etc… What 
 * are all these things!?
 * 
 * Eventually, I learned the meaning behind most of these keywords and how to use them through 
 * passive exposure. public makes a class or method available to be used by other programs, void is 
 * a type of none, String is an array of chars. These all came naturally as I wrote more Java code. 
 * However, static remained a mystery to me for years to come. It simply didn’t come up that often 
 * in assignments and projects (except for in that boilerplate main Java method shown above) so 
 * there was never a real need to learn its meaning.
 * 
 * When I started learning React a couple years ago I started seeing static and began interacting 
 * with it more actively. Here’s an example:
 */

import React from 'react';

class Hello extends React.Component {
  static defaultProps = {
    name: 'World'
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

/**
 * Over time, static subconsciously worked it’s way into my development vocabulary, but I still 
 * didn’t know why I was using it. I would use it with defaultProps, propTypes, contextTypes, and 
 * displayName, and I just assumed it needed to be there for some syntactic reason. I was following 
 * patterns that I saw on StackOverflow, and in docs without stopping to think about what static 
 * means.
 * 
 * Then I saw a neat example defining state without a constructor:
 */

import React from 'react';

class Counter extends React.Component {
  static displayName = 'Counter';

  state = { count: 0 };

  render() {
    return <h1>{this.state.count}</h1>;
  }
}

/**
 * In previous examples I’d seen, state was always defined in the constructor of a class, so it 
 * caught my interest when I realized state could be defined without a constructor. I also noticed 
 * that state isn’t preceded by static which prompted the question: What the heck does static 
 * actually do?
 * 
 * And after a quick Google search, I had my answer…
 * 
 *    Static properties are properties of a class, not of an instance of a class.
 * 
 * Let’s break that down a bit with an example.
 * 
 * If we have two instances of a React component Foo, the displayName, propTypes, defaultProps will 
 * remain the same across both instances, but the state of each instance will be able to update 
 * independently of one another.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Foo extends Component {
  // attached to the class definition (or prototype)
  static displayName = 'Foo';
  static propTypes = { bar: PropTypes.string };
  static defaultProps = { bar: 'Bar' };

  // attached to each new instance of the class/prototype
  state = { hello: 'Hello' };

  render() {
    return this.state.hello + this.props.bar;
  }
}

/**
 * If we have two instances "thisFoo" and "thatFoo" then thisFoo will have a state and thatFoo will 
 * have a state, but both share the same static properties — displayName, propTypes, and 
 * defaultProps— from the class definition.
 */

