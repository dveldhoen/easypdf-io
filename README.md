<h1 align="center">Easy PDF</h1>



<p align="center">
If this package helped you out please star us on Github!
<br/>
Much appreciated!
<br/>
<br/>
<a href="https://github.com/dveldhoen/easy-pdf/"><img src="https://img.shields.io/github/stars/dveldhoen/easy-pdf.svg?style=social&label=Star" alt="Pull Request's Welcome"></a>
</p>

# Important! 
This package is under development and is being finalized. It will start working in the coming days.  
If you try to use it before then, it will not work.

## Installing

Using npm:

```bash
$ npm install easy-pdf --save
```

Using yarn:

```bash
$ yarn add easy-pdf
```

Using unkpg CDN:

```html
<script src="https://unpkg.com/easy-pdf/dist/easy-pdf.min.js"></script>
```

## Import

Html

```html
<script src="https://unpkg.com/easy-pdf/dist/easy-pdf.min.js"></script>
```

CommonJS

```js
var easyPdf = require('easy-pdf');
```

ES6

```js
import easyPdf from 'easy-pdf';
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
var easyPdf = require('easy-pdf');

// Prepare your PDF content using HTML
var html = '<p>Hello world!</p>';

var data = {
    // btoa === base64 encode
    html: btoa(html), // Must be base64 encoded html. This example contains 'Hello World!' in base64
    background: "https://public.easy-pdf.io/img/watermark-draft.jpg",
    settings: {
        // "margin-top": 25, // Default to 25
        // "margin-right": 25, // Default to 25
        // "margin-left": 25, // Default to 25
        // "margin-bottom": 25, // Default to 25
        // "format": "Letter" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
    },
};

//Create your PDF! Easy!
easyPdf.create(data, function (result) {
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

//Use the code below to read your local file as a base64 string
const data = {
    background: fs.readFileSync('images/background.png', 'base64')
};
```

[Click here for an online tool to convert an image to base64](https://base64.guru/converter/encode/image)

### Async/await support

```js
var fs = require('fs');

var html = btoa('<p>Hello world!</p>');
const result = await easyPdf.create({html});
await fs.writeFileSync("sample.pdf", result.pdf, 'base64');
```

### Download your pdf (browser only)

Using callback

```js
var html = btoa('<p>Hello world!</p>');
easyPdf.create({html}, function (result) {
    easyPdf.download('sample.pdf', result.pdf);
    //	you can download like this as well:
    //	easyPdf.download();
    //	easyPdf.download('sample.pdf');   
});
```

Using async/await

```js
var html = btoa('<p>Hello world!</p>');
const result = await easyPdf.create({html});
easyPdf.download('sample.pdf', result.pdf);
//	you can download like this as well:
//	easyPdf.download();
//	easyPdf.download('sample.pdf');
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
easyPdf.create({html}, function (result) {
    easyPdf.render(elementId, result.pdf, function () {
        console.log('PDF rendered!');
    });
});
```

js: Using async/await

```js
var html = btoa('<p>Hello world!</p>');
const elementId = 'pdf';
const result = await easyPdf.create({html});
await easyPdf.render(elementId, result.pdf);
```

You could view your base64 pdf through the following website:
https://base64.guru/converter/decode/pdf

Paste the base64 string and click 'Decode Base64 to PDF'.

