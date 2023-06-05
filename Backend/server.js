const express = require('express')
const mongoose  = require('mongoose')
require('dotenv').config();
const bodyParser = require('body-parser')
const contactRoutes = require('./routes/contacts')

const chatBox = express();

//middleware
chatBox.use(bodyParser.json());

//routes 
chatBox.use('/api/contact', contactRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        chatBox.listen(process.env.PORT, () => {
            console.log('connectd to db & listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })