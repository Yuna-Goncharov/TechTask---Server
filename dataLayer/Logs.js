const express = require ('express');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const connection = require('../config.js');


const getLogs = router.get('/logs', function (req, res) {
    console.log(req);
    const queryString = "SELECT * FROM logs";
    connection().query(queryString,  function (error, results, fields) {
        if (error) return res.status(400).send({ error:true, message: 'Invalid request, please try again' });

        res.end(JSON.stringify(results));
    });
});



//search for log with primary key
const searchLogById = router.get('/logs/:logId', (req, res) => {
    let logId = req.params.logId;
    const queryString ="SELECT * FROM `logs` WHERE  `logId` = ?";
    connection().query(queryString, [logId],  (error, results, fields) => {
        if (error) return res.status(400).send({ error:true, message: 'Invalid logId, please try again' });

        res.end(JSON.stringify(results));
    });
});


//add new log to mysql table
const createNewLog = router.post('/logs',  (req, res) => {
    const logData = req.body;
    console.log(req)

    console.log(logData);
    if (!logData) {
        return res.status(400).send({ error:true, message: 'Please provide correct log data type' });
    }
    const queryString = "INSERT INTO logs SET?";
    connection().query(queryString, logData,  (error, results, fields) => {
        if (error) return res.status(400).send({ error:true, message: 'Invalid input, please try again' });

       // console.log("Updated log for new data:", results);
        res.json(results.insertId);


    });
});

//delete log by id
const deleteLog = router.delete('/logs/:logId',  (req, res) => {
    let logId = req.params.logId;
    const queryString = "DELETE FROM `logs` WHERE  `logId` = ?";
    connection().query(queryString, [logId],  (error, results, fields) => {
        if (error)return res.status(400).send({ error:true, message: 'Invalid logId to delete, please try again' });

        console.log("Deleted log for log_Id:", results.logId);
        res.json({logId});
       // res.end(JSON.stringify(results.logId));
    });
}) ;

module.exports = router;

