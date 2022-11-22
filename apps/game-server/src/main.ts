import geckos from '@geckos.io/server';
import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
// import path from 'path';
import api from './api';

const app = express();

app.use(bodyParser.json());

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', api);

const port = process.env['port'] || 3333;
const server = http.createServer(app);

const io = geckos();

io.addServer(server);

io.onConnection((channel) => {
  channel.on('', () => {
    //
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
