
require('dotenv').load();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('../shared/router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern2017', { useMongoClient: true });

// App Setup
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// app.use('/public', express.static('../public'));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')))

app.use(function (req, res, next) {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW <<<<<<<<<<<<<');
  res.locals.publicViews = path.join(__dirname, 'public')
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers)
  next();
})

router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);
