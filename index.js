const express = require('express');
const cors = require('cors');
const webSocket = require('ws');
const http = require('http');
const router = require('./api/HttpAPI');
const fs = require('fs');
const wsreducer = require('./reducers/websocketReducer').wsreducer
const SecurityConstants = require('./constants/SecurityConstants');
const Log = require('./utils/consoleLogs')
const LogConst = require('./constants/LogConst');

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({server:server,path:'/realtime'});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use((req,res,next)=>{
    Log(LogConst.time,LogConst.request,`${req.path}`)
    next();
})
app.use('/api',router)

app.listen(process.env.PORT || 8080,(err)=>{
    if(err){
        Log(LogConst.time,LogConst.err,err);
    } else {
        let msg = `Server started on port ${process.env.PORT || 8080}`;
        Log(LogConst.time,LogConst.info,msg);
    }
    
})

wss.on('connection',(ws,req)=>{
    ws.on('message',(data)=>{
        wsreducer(data,ws)
        Log(LogConst.time,LogConst.websock,`WebSocket Request ${data}`)
    })
    ws.on('error',(err)=>{
        Log(LogConst.time,LogConst.websocketerr,`WebSocketClient ${err}`)
    })
    ws.on('close',(code,reason)=>{
        Log(LogConst.time,LogConst.websock,`WebSocketClient left Code:${code} Reason:${reason}`);
    })
})
wss.on('close',()=>{
    Log(LogConst.time,LogConst.websock,`WebSocketServer Closed`);
})
wss.on('error',(err)=>{
    Log(LogConst.time,LogConst.websocketerr,`WebsocketServer ${err}`);
})