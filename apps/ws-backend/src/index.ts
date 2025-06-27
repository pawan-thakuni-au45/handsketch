
import { WebSocketServer } from "ws";
const wss=new WebSocketServer({port:8000})
import {JWT_SECRET} from "@repo/backend-common/config"
import jwt, { JwtPayload } from "jsonwebtoken"

wss.on("connection",function connection(ws,request){
    const url=request.url  //ws:localhost:8000?token=88huihuj
    if(!url){
        return

    }
    const queryparams=new URLSearchParams(url.split('?')[1])
    const token=queryparams.get('token') || ""
    const decode=jwt.verify(token,JWT_SECRET)
    if(!decode || !(decode as JwtPayload).userId){
        ws.close();
        return
    }

    ws.on('message',function(data){
        ws.send('pong')
    })
})