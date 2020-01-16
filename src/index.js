const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./routes')


const app = express()

app.use(cors())
app.use(express.json());
app.use(routes);



mongoose.connect('mongodb+srv://paulocardoso:donthackmeplease@cluster0-3xdns.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//console.log(tech)

app.listen(5000,()=>{})