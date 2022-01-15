const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World !!! Test #2');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);