const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());

app.all('*', ({ url }, res) =>
  request(`https://www.binance.com/exchange-api/v1/public${url}`, (_, __, body) => {
    res.setHeader('Content-Type', 'application/json');

    res.send(body);
  }),
);

app.listen(3001, () => console.log('Server successfully started on port 3001!'));
