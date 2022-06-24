const path = require('path');
const express = require('express');

const app = express();

console.log(__dirname);

// app.use(express.static("./"));
app.use(express.static(`${__dirname}/dist`));

module.exports = app;
