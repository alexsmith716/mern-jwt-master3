
import dotenv from 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './router';
import apiRoutes from './api_routes';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern2017', { useMongoClient: true });

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// app.use('/public', express.static('../public'));
app.use(express.static(path.join(__dirname, '../public')))

app.use(function (req, res, next) {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW <<<<<<<<<<<<<');
  res.locals.publicViews = path.join(__dirname, 'public')
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers)
  next();
})

//app.use('/', router);
app.use('/api', apiRoutes)
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);

module.exports = app;

// SERVER:
// home/index >>>>> 'https://localhost:3000/'
// about      >>>>> 'https://localhost:3000/about'
// contact    >>>>> 'https://localhost:3000/contact'
// signup     >>>>> 'https://localhost:3000/signup'
// signin     >>>>> 'https://localhost:3000/signin'

// API:
// signup >>>>>>>>> 'https://localhost:3000/api/signup'
// signin >>>>>>>>> 'https://localhost:3000/api/signin'

// states: 'Authenticated' || 'Not Authenticated'
