
"use client"
import { WS_URL } from "@/config";
import { InitDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import {Canvas} from "./Canvas";

export default function RoomCanvas({roomId}:{roomId:string}){
          
           const[socket,setSocket]=useState<WebSocket | null>(null)

           useEffect(()=>{
            const token = localStorage.getItem("token")
            const ws=new WebSocket(`${WS_URL}?token=${token}`)

            ws.onopen=()=>{
                setSocket(ws)

                const data=JSON.stringify({
                    type:"join_room",
                    roomId
                })
                console.log(data)
               ws.send(data)
            }
           },[])
    

    if(!socket){
        return <div>
            connecting to server ....
        </div>
    }

    return<div>
        <Canvas roomId={roomId} socket={socket}/>
        </div>
    
}