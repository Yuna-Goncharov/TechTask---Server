
const express = require ('express');
const http = require("http");
const mysql = require('mysql');
const winston = require('winston');

const pool = mysql.createPool({
    connectionLimit: 10,
    host     : '127.0.0.1',
    user     : 'root',
    database : 'sql_server'
})

function connection(){
    return pool
}

module.exports = connection;
