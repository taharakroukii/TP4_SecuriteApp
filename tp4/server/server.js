const mysql = require("mysql");
const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

let sql;
const saltRounds = 10;

let conn = mysql.createConnection(connString);