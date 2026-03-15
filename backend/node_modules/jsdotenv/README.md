# dotenvjs

A runnable env environment

### About

Gone are the days of using flat `.env` files. This module will help you to build your env should you need that flexability.

### Example

Here is a simple example:

```js
// .env.js

// Set your own defaults, whatever! Its your env anyways!
const env = {
  NODE_ENV: 'develop'
}

// Dynamically change thigns...
if (env.NODE_ENV === 'develop') {
  env.LOGGING = true
}

// Put all your vars into the exports!
module.exports = env
```

And you can now just use it as expected:

```js
require('jsdotenv').config()

if (process.env.LOGGING) {
  console.log('Look Mom no hands!')
}
```

### Installation

You can simply install:

```
npm i --save jsdotenv
```

And then create a `.env.js` file in your root. After that include this package like you see above and you are ready to go!

### Additional Features

You can access this simple package with a simplified example, or use some of our additional Features.

##### parse

If you just wanna parse a file, try the following:

```js
const jsdotenv = require('jsdotenv')

const parsed = jsdotenv.parse('/path/to/some/file.js')
console.log(parsed) // will be the evaluated parsed result.
```

##### config

The example above is the minimalistic approach of the `config` function. You can also use advanced features as well like so (defaults in parenthesis):

```js
require('jsdotenv').config({
  path: '.env.js' // The .env file to evaluate.
})
```

### License

MIT
