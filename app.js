const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// register view engine as ejs
app.set('view engine', 'ejs');

// tell where views are to be found
app.set('views', 'views');

const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);

app.listen(3000);
