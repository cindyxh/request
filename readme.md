# request

---

a light http request library

```js
// options example
const options = {
  url: "http://localhost:3000/user/{userId}",
  method: "POST",
  qs: "",
  urlParams: { userId: 123 },
  form: {
    grant_type: "client_credentials",
    scope: "audience",
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
  //certificate data
  pfx: fs.readFileSync(path.resolve(__dirname, "./certfile.pfx")),
  passphrase: "3ddrrffwww",

  body: "success", // or json object
  resolveWithFullResponse: true,
};
```
