# Spread Operator

`Spread syntax is used to unpack iterables such as arrays, objects, and function calls.`

#### `Spread with Arrays`

```js
// Create an Array
const tools = ["hammer", "screwdriver"];
const otherTools = ["wrench", "saw"];

// Unpack the tools Array into the allTools Array
const allTools = [...tools, ...otherTools];

// Add a new item
const updatedAllTools = [...allTools, "parek"];
```

#### `Convert Set to Array`

```js
// Create a set
const set = new Set();

set.add("octopus");
set.add("starfish");
set.add("whale");

// Convert Set to Array
const seaCreatures = [...set];
```

#### `Convert String to Array`

```js
const string = "hello";

const stringArray = [...string];
```

#### `Spread with Objects`

```js
const user = {
  id: 3,
  name: "Ron",
};

// add an item
const updatedUser = { ...user, isLoggedIn: true };

const user = {
  id: 3,
  name: "Ron",
  organization: {
    name: "Parks & Recreation",
    city: "Pawnee",
  },
};

// add item in nested object
const updatedUser = {
  ...user,
  organization: {
    ...user.organization,
    position: "Director",
  },
};
```

#### `Spread with Function Calls`

```js
function multiply(a, b, c) {
  return a * b * c;
}

const numbers = [1, 2, 3];
multiply(...numbers); // 12
```
