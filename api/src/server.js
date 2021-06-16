const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const routers = require('./routers/router');
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routers);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log('listening on port ' + process.env.PORT);
});
