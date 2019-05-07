const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser());
app.use(cors({origin: '*'}));

app.use(express.static(__dirname + '/static'));

app.listen(3000, (err) => {
  console.log('server listening on port 3000');
});