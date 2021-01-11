const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const app = express();
// const mongoose = require('mongoose');
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/MERN_Login';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());

//Server Setup
const port = process.env.PORT || 3090;

router(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})