
import { WebSocketServer,WebSocket } from "ws";

import {JWT_SECRET} from "@repo/backend-common/config"
import jwt, { JwtPayload } from "jsonwebtoken"
import { parse } from "path";
import {prismaClient} from "@repo/pridb/client"

//state management usiconst 
const wss = new WebSocketServer({ port: 8000 })

interface User{
    ws:WebSocket,
    rooms:string [],
    userId:string
    
    
}

const users:User[]=[];

function checkUser(token:string):string | null{
    try{
    const decode=jwt.verify(token,JWT_SECRET)
    if(typeof decode=="string"){
        return null
    }

    if(!decode || !decode.userId){
        return null
    }
    return decode.userId
}catch(e){
    return null
    
}
}

wss.on('connection',function connection(ws,request){
    const url=request.url  //ws:localhost:8000?token=88huihuj
    if(!url){
        return

    }
    const queryparams=new URLSearchParams(url.split('?')[1])
    const token=queryparams.get('token') || "";
   const userId=checkUser(token)
   if(userId ==null){
    ws.close()
    return 
   }

   users.push({
    userId,
    rooms:[],
    ws
   })

    ws.on('message',async function message(data){

        const parseData=JSON.parse(data as unknown  as string)

          
     //{type:"join_room" rooms:1} ws got the data in json string ,then we convert it into javascript object
         if(parseData.type==="join_room"){
            const user=users.find(x=>x.ws===ws)
            user?.rooms.push(parseData.roomId)
            
         }

         if(parseData.type==="leave_room"){
            const user=users.find(x => x.ws===ws)
            if(!user){
                return null
            }
            user.rooms=user?.rooms.filter(x=>x===parseData.room )
         }

         if(parseData.type==="chat"){
            const roomId=parseData.roomId
            const message=parseData.message
            console.log(roomId,message);

            await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId
        }
      });
      console.log(data);

            users.forEach(user=>{
               if( user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type:"chat",
                    message:message,
                    roomId
                }))

                }
            })
         }
    })
})