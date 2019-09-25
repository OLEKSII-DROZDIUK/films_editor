const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectMongooseDB = require('./db/index');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname + '/static')); 
connectMongooseDB();

const routes = require('./routes/index');
const films = require('./routes/films');

app.use('/', routes.router); 
app.use('/films', films)

app.listen(process.env.PORT_SERVER, () => console.log(`${process.env.PORT_SERVER} you in this port now`));

