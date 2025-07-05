
"use client"
import { WS_URL } from "@/config";
import { InitDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import {Canvas} from "./Canvas";

export default function RoomCanvas({roomId}:{roomId:string}){
          
           const[socket,setSocket]=useState<WebSocket | null>(null)

           useEffect(()=>{
            const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYWE4YzYyYy1lM2Q4LTQyNzUtOTdjNS1kNzIyNjA3ZmViNDQiLCJpYXQiOjE3NTE3MDQyODJ9.p2RCfwREV_4bPAfA4ep3DxVRzCOScYKaDc70286FV64`)

            ws.onopen=()=>{
                setSocket(ws)

                const data=JSON.stringify({
                    type:"join_room",
                    roomId
                })
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