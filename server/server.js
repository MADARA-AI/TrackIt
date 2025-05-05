const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');


app.use(express.json());

app.use('/',userRoutes);

app.listen (5000,()=>console.log('server is running on port 5000'));