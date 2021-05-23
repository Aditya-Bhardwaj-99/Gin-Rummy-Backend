const express = require('express');
const cors = require('cors');
const webSocket = require('ws');
const http = require('http');
const router = require('./api/HttpAPI')
const wsreducer = require('./reducers/websocketReducer').wsreducer
const SecurityConstants = require('./constants/SecurityConstants')

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({server:server,path:'/realtime'});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api',router)

app.listen(process.env.PORT || 3000,(err)=>{
    if(err){
        console.log(err)
    }
})

wss.on('connection',(ws,req)=>{
    ws.on('message',(data)=>{
        wsreducer(data,ws)
    })
})