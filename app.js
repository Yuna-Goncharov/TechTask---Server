const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const router = require('./dal/Logs.js');
const winston = require('./winstonLogs/winston');


app.use(morgan('combined', { stream: winston.stream }));
//logs out logs on calls

app.use(bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.use(router);

const PORT = process.env.PORT || 3003;


app.get("/",(req,res) =>{
    console.log("responding to root");
    res.send("root working")
});

app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
});

