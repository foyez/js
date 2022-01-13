# Fetch api

GET request (default)

```js
const url = "https://jsonplaceholder.typicode/users/1";
fetch(url) // call the fetch function passing the url of the API as a parameter
  .then((response) => {
    // here we get a response (data) is an object with a series of methods
    return response.json(); // Transform the data into json
  })
  .then((data) => {
    console.log(data); // json data
  })
  .catch((err) => {
    // catch errors if the server returns any errors
    console.log(err);
  });
```

**Response methods**

- clone() - As the method implies this method creates a clone of the response.
- redirect() - This method creates a new response but with a different URL.
- arrayBuffer() - In here we return a promise that resolves with an ArrayBuffer (ArrayBuffer, an array of bytes, is used to represent a generic, fixed-length raw binary data buffer. ).
- formData() - Also returns a promise but one that resolves with FormData object (FormData provides a way to easily construct a set of key/value pairs representing form fields and their values).
- blob() - This is one resolves with a Blob (A Binary Large OBject(BLOB) is a file-like object of immutable, raw data; they can be read as text or binary data).
- text() - In this case it resolves with a string.
- json() - Lastly we have the method to that resolves the promise with JSON (JavaScript Object Notation is a lightweight data-interchange format, that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and array data types. It is easy for machines to parse and generate).

Fetch api wrapper function

```js
const isObject = (val) =>
  typeof val === "object" && val !== null && !Array.isArray(val);

/**
 * handle server request using fetch api
 * @param {string} url name of the api url
 * @param {string} methodName request method name
 * @param {string} data send data to server; datatype of data depends on api
 */
const apiCall = async (url, methodName = "GET", data = null) => {
  const fetchData = {
    method: methodName,
    ...(isObject(data) && { body: JSON.stringify(data) }), // add body property if data is an object
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  try {
    // Handle response you get from the server
    const data = await (await fetch(url, fetchData)).json();
    return [data, null];
  } catch (err) {
    // Handle errors you get from the server
    return [null, err];
  }
};

const data = { title: "foo", body: "bar", userId: 1 };
const [data, err] = await apiCall(
  "https://jsonplaceholder.typicode.com/posts",
  "POST",
  data
);

if (err !== null) {
  // handle errors
}

console.log(data);
```
