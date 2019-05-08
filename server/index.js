require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const ctrl = require('./controller');


const { CONNECTION_STRING, SERVER_PORT } = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Connected to database')

  app.listen(SERVER_PORT, () =>
  console.log(`Listening on port ${SERVER_PORT}`)
  );
});

const app = express();

app.use(bodyParser.json());