const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000.')
});
