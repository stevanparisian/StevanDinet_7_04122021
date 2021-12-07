const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require("helmet");
require('dotenv').config();



const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(morgan('dev'));


app.use(express.json());


app.use(helmet());



module.exports = app;