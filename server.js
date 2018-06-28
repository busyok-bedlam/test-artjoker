const express = require('express');
const config = require('./config');
const database = require('./db');
const bodyParser = require('body-parser');
const { PORT } = config;
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',indexRouter);
app.use('/users',usersRouter);

database()
    .then( () => {
        app.listen(PORT,() => console.log("CONNECTED TO EXPRESS"))
    })