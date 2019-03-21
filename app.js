const index = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
const sass = require('node-sass');

// register view engine as ejs
app.set('view engine', 'ejs');
// tell where views are to be found
app.set('views', 'views');
app.set('layout', 'layout/layout');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(index);

app.listen(port);
console.log(`Server is running on ${port}`);