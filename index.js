const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

//db setup
mongoose.connect('mongodb://localhost:27017')

//App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);
//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log('svr listening on: ', port);
