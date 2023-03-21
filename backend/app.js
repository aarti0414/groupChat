const path = require('path');
const fs = require('fs');

const express = require("express");

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');
const adminRoutes = require('./routes/admin');
const User = require('./models/user');

const PORT = 4000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/admin', adminRoutes);


sequelize.sync({
  //force: true
}).then(() => {
  console.log('connection established');
  app.listen(process.env.PORT || 3000);
})
  .catch(err => {
    console.log(err);
  })
