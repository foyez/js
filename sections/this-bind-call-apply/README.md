# this, bind, call and apply

### `this`

#### 1. Global Context

```js
console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

```js
function printThis() {
  console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
}

printThis();
```

```js
"use strict";

function printThis() {
  console.log(this); // undefined
}

printThis();
```

#### An Object Method

```js
const america = {
  name: "The United States of America",
  yearFounded: 1776,

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`); // "The United States of America was founded in 1776."
  },
};

america.describe();
```

#### Nested object

```js
const america = {
  name: "The United States of America",
  yearFounded: 1776,
  details: {
    symbol: "eagle",
    currency: "USD",
    printDetails() {
      console.log(
        `The symbol is the ${this.symbol} and the currency is ${this.currency}.`
      ); // "The symbol is the eagle and the currency is USD."
    },
  },
};

america.details.printDetails();
```

### A Function Constructor

```js
function Country(name, yearFounded) {
  this.name = name;
  this.yearFounded = yearFounded;

  this.describe = function () {
    console.log(`${this.name} was founded in ${this.yearFounded}.`); // "The United States of America was founded in 1776."
  };
}

const america = new Country("The United States of America", 1776);

america.describe();
```

#### A Class Constructor

```js
class Country {
  constructor(name, yearFounded) {
    this.name = name;
    this.yearFounded = yearFounded;
  }

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`); // "The United States of America was founded in 1776."
  }
}

const america = new Country("The United States of America", 1776);

america.describe();
```

## call, apply & bind

- `call` and `apply` are very similar—they invoke a function with a specified `this` context, and optional arguments.
- `call` requires the arguments to be passed in one-by-one, and `apply` takes the arguments as an array.
- `call` and `apply` are used to invoke the `this` context of an object on the function.
- Sometimes, you might need to use a method over and over with the `this` context of another object, and in that case you could use the `bind` method to create a brand new function with an explicitly bound `this`.

```js
const book = {
  title: "Brave New World",
  author: "Aldous Huxley",
};

function summary() {
  console.log(`${this.title} was written by ${this.author}.`);
}

summary(); // "undefined was written by undefined"

// call and apply are used to invoke the this context of book on the function.
summary.call(book); // "Brave New World was written by Aldous Huxley."
summary.apply(book); // "Brave New World was written by Aldous Huxley."

// bind
const braveNewWorldSummary = summary.bind(book);
braveNewWorldSummary(); // "Brave New World was written by Aldous Huxley."

function longerSummary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`
  );
}

longerSummary.call(book, "dystopian", 1932); // "Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
longerSummary.apply(book, ["dystopian", 1932]); // "Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```
