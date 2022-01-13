# Destructuring

`Destructuring is used to create varibles from array items or object properties.`

#### `Object Destructuring`

```js
const note = {
  id: 1,
  title: "My first note",
  author: {
    firstName: "Sherlock",
    lastName: "Holmes",
  },
};

// Destructure properties into variables
const { id, title } = note;

// Assign a custom name to a destructured value
const { id: noteId, title } = note;

// Destructure nested properties
const {
  id,
  title,
  author: { firstName, lastName },
} = note;

// Access object and nested values
const {
  author,
  author: { firstName, lastName },
} = note;

// setting new variable with default value
const { title = "foyez", date = new Date() } = note;

// destructring on function parameter
const func = ({ id, title }) => `ID: ${id}, Title: ${title}`;
func(note);
```

#### `Array Destructuring`

```js
const date = ["1970", "12", "01"];
const nestedArray = [1, 2, [3, 4], 5];

// Destructure Array values into variables
const [year, month, day] = date;

// Skip the second item in the array
const [year, , day] = date;

// Destructure nested items
const [one, two, [three, four], five] = nestedArray;
```

#### `Destructure the parameters in a function`

```js
const note = {
  id: 1,
  title: "My first note",
  date: "01/01/1970",
};

// Using forEach
Object.entries(note).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Using a for loop
for (let [key, value] of Object.entries(note)) {
  console.log(`${key}: ${value}`);
}
```
