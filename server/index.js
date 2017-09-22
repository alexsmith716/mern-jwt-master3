
import dotenv from 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import favicon from 'serve-favicon';
import webpack from 'webpack';

import router from './router';
import apiRoutes from './api_routes';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern2017', { useMongoClient: true });

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// app.use('/public', express.static('../public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/favicon', 'favicon.ico')));

app.use((req, res, next) => {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW <<<<<<<<<<<<<');
  res.locals.publicViews = path.join(__dirname, 'public')
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers)
  next();
});

app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//app.use('/', router);
app.use('/api', apiRoutes)
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);

module.exports = app;
