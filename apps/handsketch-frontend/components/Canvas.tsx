import { InitDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({roomId,socket}:{socket:WebSocket,roomId:string}){
     const canvasRef=useRef<HTMLCanvasElement>(null)
      useEffect(()=>{

  
  
        if(canvasRef.current){
          
InitDraw(canvasRef.current,roomId,socket);


     }

    },[canvasRef]);
    return <div className="bg-white"> 

            <canvas ref={canvasRef} width={1000} height={1000} ></canvas>
        </div>
}