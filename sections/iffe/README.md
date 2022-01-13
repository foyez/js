# IFFE (Immediately Invoked Function Expression)

**IFFE** - runs as soon as it is defined.

```js
(function () {
  statements;
})();
```

#### Use cases

- Avoid polluting the global namespace

```js
// If we have some initiation code that we don't need to use again,
// we could use the IIFE pattern.

(function () {
  // some initiation code
  let firstVariable;
  let secondVariable;
})();

// firstVariable and secondVariable will be discarded after the function is executed.
```

- The module pattern

```js
// We would also use IIFE to create private and public variables and methods.

const makeWithdraw = (balance) =>
  (function (copyBalance) {
    let balance = copyBalance; // This variable is private
    let doBadThings = function () {
      console.log("I will do bad things with your money");
    };
    doBadThings();
    return {
      withdraw: function (amount) {
        if (balance >= amount) {
          balance -= amount;
          return balance;
        } else {
          return "Insufficient money";
        }
      },
    };
  })(balance);

const firstAccount = makeWithdraw(100); // "I will do bad things with your money"
console.log(firstAccount.balance); // undefined
console.log(firstAccount.withdraw(20)); // 80
console.log(firstAccount.withdraw(30)); // 50
console.log(firstAccount.doBadThings); // undefined, this method is private
const secondAccount = makeWithdraw(20); // "I will do bad things with your money"
secondAccount.withdraw(30); // "Insufficient money"
secondAccount.withdraw(20); // 0
```
