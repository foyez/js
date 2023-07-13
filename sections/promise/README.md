# Promise

## Promise Methods (all, allSettled, any, and rcace)

We can run promises in sequential/serial and parallel flows. These promise methods run in parallel flows.

Here is an example of promise in serial flow:

```js
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

async function init() {
  console.time("timeSerial");
  await wait(1000);
  await wait(2000);
  console.timeEnd("timeSerial");
}

init(); // timeSerial: 3.006s

|                       |
-- 1.004s --            |
|                       |
            -- 2.002s --|
|                       |
```

Here is an example of promise in parallel flow:

```js
const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

async function init() {
  console.time("timeParallel");
  await Promise.all([wait(1000), wait(2000)]);
  console.timeEnd("timeParallel");
}

init(); // timeParallel: 2.002s

|           |
-- 1s --    |
|           |
-- 2.002s --|
|           |
```

## `Promise.all` vs `Promise.allSettled`

- `Promise.all` takes an array of promises and resolves to a single promise only when all the input promises are fulfilled and rejects otherwise. 
- `Promise.allSettled` also takes an array of promises and always resolves to a single promise with the status of individual input promises.

**Promise.all:**

```js
async function init() {
  try {
    const p1 = Promise.resolve("promise 1 fulfilled");
    const p2 = Promise.reject("promise 2 rejected");
    const p3 = Promise.resolve("promise 3 fulfilled");

    const allResolved = await Promise.all([p1, p2, p3]);

    console.log(allResolved);
  } catch (error) {
    console.log(error); // promise 2 rejected
  }
}

init();
```

**Promise.allSettled:**

```js
async function init() {
  const p1 = Promise.resolve("promise 1 fulfilled");
  const p2 = Promise.reject("promise 2 rejected");
  const p3 = Promise.resolve("promise 3 fulfilled");

  const allResolved = await Promise.allSettled([p1, p2, p3]);

  console.log(allResolved);
  /*
  [
    { status: 'fulfilled', value: 'promise 1 fulfilled' },
    { status: 'rejected', reason: 'promise 2 rejected' },
    { status: 'fulfilled', value: 'promise 3 fulfilled' }
  ]
  */
}

init();
```

## `Promise.any` vs `Promise.race`

- `Promise.any` takes an array of promises and cares only about the fastest one to resolve. If all the promises are rejected then the returned promise is also rejected with an error.
- `Promise.race` takes an array of promises and cares about the fastest one that either resolves or rejects.

**Promise.any:**

```js
async function init() {
  try {
    const p1 = Promise.reject('promise1 rejected');
    const p2 = new Promise((resolve) => setTimeout(resolve, 300, "promise2 fulfilled"));
    const p3 = new Promise((resolve) => setTimeout(resolve, 100, "promise3 fulfilled"));

    const firstResolved = await Promise.any([p1, p2, p3]);

    console.log(firstResolved); // promise3 fulfilled
  } catch (error) {
    console.log(error);
  }
}

init();
```

```js
async function init() {
  try {
    const p1 = Promise.reject('promise1 rejected');
    const p2 = Promise.reject('promise2 rejected');
    const p3 = Promise.reject('promise3 rejected');

    const firstResolved = await Promise.any([p1, p2, p3]);

    console.log(firstResolved);
  } catch (error) {
    console.log(error); // All promises were rejected
  }
}

init();
```

**Promise.race:**

```js
async function init() {
  try {
    const p1 = new Promise((resolve) => setTimeout(resolve, 300, "promise1 fulfilled"));
    const p2 = new Promise((resolve) => setTimeout(resolve, 100, "promise2 fulfilled"));

    const firstResolved = await Promise.race([p1, p2]);

    console.log(firstResolved); // promise2 fulfilled
  } catch (error) {
    console.log(error);
  }
}

init();
```

```js
async function init() {
  try {
    const p1 = new Promise((resolve) => setTimeout(resolve, 300, "promise1 fulfilled"));
    const p2 = new Promise((_, reject) => setTimeout(reject, 100, "promise2 rejected"));

    const firstResolved = await Promise.race([p1, p2]);

    console.log(firstResolved);
  } catch (error) {
    console.log(error); // promise2 rejected
  }
}

init();
```
