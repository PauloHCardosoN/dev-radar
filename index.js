const express = require('express')
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')
const routes = require('./routes')
const { setupWebsoket } = require('./websocket')


const app = express();
const server = http.Server(app);

setupWebsoket(server);

app.use(cors())
app.use(express.json());
app.use(routes);



mongoose.connect('mongodb+srv://<user>:<password>@cluster0-3xdns.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


server.listen(5000,()=>{})