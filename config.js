
const express = require ('express');
const http = require("http");
const mysql = require('mysql');
const winston = require('winston');

const pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'bd9924fc0b3651',
    password:'52026a30',
    database : 'eroku_1982f1217375ac8'
})

function connection(){
    return pool
}

module.exports = connection;
