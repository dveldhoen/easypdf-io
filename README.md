<h1 align="center">Easy PDF</h1>
<p align="center" style="font-size: 16px">Build for Web and Backend 💪</p>
<br/>

<p align="center">
  <a href="https://www.npmjs.com/package/easypdf-io"><img src="https://img.shields.io/npm/v/easypdf-io.svg" alt="Version"></a>
  <a href="https://github.com/dveldhoen/easypdf-io/actions?query=branch%3Amaster"><img src="https://github.com/dveldhoen/easypdf-io/workflows/build/badge.svg" alt="Build Status"></a>    
  <a href="https://npmcharts.com/compare/easypdf-io?minimal=true"><img src="https://img.shields.io/npm/dm/easypdf-io.svg" alt="Downloads"></a>
    <br/>
  <a href="https://www.npmjs.com/package/easypdf-io"><img src="https://img.shields.io/npm/l/easypdf-io.svg" alt="License"></a>
  <a href="https://github.com/dveldhoen/easypdf-io"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="Pull Request's Welcome"></a>
</p>

<p align="center">
If this package helped you out please star us on Github!
<br/>
Much appreciated!
<br/>
<br/>
<a href="https://github.com/dveldhoen/easypdf-io/"><img src="https://img.shields.io/github/stars/dveldhoen/easypdf-io.svg?style=social&label=Star" alt="Pull Request's Welcome"></a>
</p>

## Demo

[JS Fiddle: Plain Javascript](https://jsfiddle.net/easyinvoice/0semw5cn/)

## Installing

Using npm:

```bash
$ npm install easypdf-io --save
```

Using yarn:

```bash
$ yarn add easypdf-io
```

Using unkpg CDN:

```html
<script src="https://unpkg.com/easypdf-io/dist/easypdf-io.min.js"></script>
```

## Import

Html

```html
<script src="https://unpkg.com/easypdf-io/dist/easypdf-io.min.js"></script>
```

CommonJS

```js
var pdf = require('easypdf-io');
```

ES6

```js
import pdf from 'easypdf-io';
```

## Direct REST API access

```shell
# HTTPS POST 
https://api.easypdf.io/v2/free/pdf

# POST Data
Format: JSON
Structure: {"data":{"html":""}} # Parent object must be 'data'
```

## Example (NodeJS)

```js
//Import the library into your project
var pdf = require('easypdf-io');

// Prepare your PDF content using HTML
var html = '<p>Hello world!</p>';

var data = {
    // btoa === base64 encode
    html: btoa(html), // Must be base64 encoded html. This example contains 'Hello World!' in base64
    background: "https://public.easypdf-io.io/img/watermark-draft.jpg",
    settings: {
        // "margin-top": 25, // Default to 25
        // "margin-right": 25, // Default to 25
        // "margin-left": 25, // Default to 25
        // "margin-bottom": 25, // Default to 25
        // "format": "Letter" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
    },
};

//Create your PDF! Easy!
pdf.create(data, function (result) {
    // The response will contain a base64 encoded PDF file
    // Using the below line we can decode the base64 and store the file locally
    fs.writeFileSync("sample.pdf", result.pdf, 'base64');
});
```

## Return values

|<b>Key</b> | Value | Data Type |
|---|---|---|
| result.pdf | The PDF file as base64 string | String |

## Background

The background and url inputs accept either a URL or a base64 encoded file.

Supported file types:

- JPG, PNG, etc. (most common image types)
- PDF

### URL

```js
const data = {
    background: "https://public.easypdf.io/img/watermark_draft.jpg"
};
```

### Base64

```js
const data = {
    //Note: Sample base64 string
    //Please use the link below to convert your image to base64
    background: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
};
```

### Local File (NodeJS only)

```js
//Import fs to be able to read from the local file system
var fs = require("fs");
var pdf = require('easypdf-io');

//Use the code below to read your local file as a base64 string
const data = {
    background: fs.readFileSync('images/background.png', 'base64')
};
```

[Click here for an online tool to convert an image to base64](https://base64.guru/converter/encode/image)

### Async/await support

```js
var fs = require('fs');
var pdf = require('easypdf-io');

var html = btoa('<p>Hello world!</p>');
const result = await pdf.create({html});
await fs.writeFileSync("sample.pdf", result.pdf, 'base64');
```

### Download your pdf (browser only)

Using callback

```js
var pdf = require('easypdf-io');

var html = btoa('<p>Hello world!</p>');
pdf.create({html}, function (result) {
    pdf.download('sample.pdf', result.pdf);
    //	you can download like this as well:
    //	pdf.download();
    //	pdf.download('sample.pdf');   
});
```

Using async/await

```js
var pdf = require('easypdf-io');

var html = btoa('<p>Hello world!</p>');
const result = await pdf.create({html});
pdf.download('sample.pdf', result.pdf);
//	you can download like this as well:
//	pdf.download();
//	pdf.download('sample.pdf');
```

### Render(view) your PDF (browser only)

html

```html
<!-- Only include when rendering is required -->
<script src="https://unpkg.com/pdfjs-dist/build/pdf.min.js"></script>
<script src="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js"></script>

<!-- Include pdfjs version 2.3.200 for Internet Explorer compatibility, no worker required -->
<!-- <script src="https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js"></script> -->

<!-- The pdf will be rendered within this div -->
<div id="pdf"></div>
```

css (optional)

```css
#pdf {
    text-align: center;
}

#pdf canvas {
    border: 1px solid black;
    width: 95%;
}
```

js: Using Callback

```js
var html = btoa('<p>Hello world!</p>');
var elementId = 'pdf';
pdf.create({html}, function (result) {
    pdf.render(elementId, result.pdf, function () {
        console.log('PDF rendered!');
    });
});
```

js: Using async/await

```js
var html = btoa('<p>Hello world!</p>');
const elementId = 'pdf';
const result = await pdf.create({html});
await pdf.render(elementId, result.pdf);
```

