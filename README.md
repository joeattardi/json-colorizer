# json-colorizer
A library for colorizing JSON strings

![](https://raw.githubusercontent.com/joeattardi/json-colorizer/master/screenshot.png)

This package is a simple console syntax highlighter for JSON.

## Installation
`npm install --save json-colorizer`

## Usage

```js
var colorize = require('json-colorizer');
console.log(colorize({ "foo": "bar" });
```

If you pass a string to the colorize function, it will treat it as pre-serialized JSON. This can be used in order to colorize pretty-printed JSON:

```js
var colorize = require('json-colorizer');
var json = JSON.stringify({"foo": "bar"}, null, 2);
console.log(colorize(json);
```


## Specifying colors

You can specify a function to use for coloring individual tokens by providing a `colors` object:

```js
var colorize = require('json-colorizer');
var chalk = require('chalk');
console.log(colorize({ "foo": "bar" }, {
  colors: {
    STRING_KEY: chalk.green
  }
}));
```

The tokens available are:

* `BRACE`
* `BRACKET`
* `COLON`
* `COMMA`
* `STRING_KEY`
* `STRING_LITERAL`
* `NUMBER_LITERAL`
* `BOOLEAN_LITERAL`
* `NULL_LITERAL`
