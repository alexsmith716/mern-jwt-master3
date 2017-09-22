
import dotenv from 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import webpack from 'webpack';

// dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  //
}

import router from './router';
import apiRoutes from './api_routes';
import serverConfig from './config/config';

if (process.env.NODE_ENV === 'development') {
  //
}

app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(favicon(path.join(__dirname, '../public/favicon', 'favicon.ico')));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use(helmet())
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  console.log('>>>>>>>>>>> GOING THROUGH APP NOW <<<<<<<<<<<<<');
  res.locals.publicViews = path.join(__dirname, 'public')
  console.log('REQ.method +++++: ', req.method);
  console.log('REQ.url ++++++++: ', req.url);
  console.log('REQ.headers ++++: ', req.headers)
  next();
});


app.use('/api', apiRoutes);

// http://mongoosejs.com/docs/connections.html
// http://mongodb.github.io/node-mongodb-native/2.1/api/Server.html
mongoose.Promise = global.Promise;
const mongooseOptions = { useMongoClient: true, autoReconnect: true, keepAlive: 2, connectTimeoutMS: 400000 };
mongoose.connect('mongodb://localhost/mern2017', mongooseOptions, error => {
  if (error) {
    console.error('>>>>>> mongoose.connect error <<<<<<<: ', error);
    throw error;
  }
});


router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);

module.exports = app;
