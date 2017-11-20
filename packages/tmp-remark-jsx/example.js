'use strict';
const beautify = require("json-beautify");
const unified = require('unified');
const parseMD = require('remark-parse');
const customElementCompiler = require('.');

const processor = unified()
  .use(parseMD)
  .use(customElementCompiler, {componentWhitelist: ['MyStuff', 'MyOtherStuff']})
  .process('## Hello world!\n<MyStuff name="Hello">World<MyOtherStuff /></MyStuff>', function (err, file) {
    console.log(beautify(file.contents, null, 2, 100));
    // then https://github.com/wooorm/remark-vdom/blob/master/index.js
  });
