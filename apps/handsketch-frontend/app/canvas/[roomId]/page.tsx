"use client"
import { InitDraw } from "@/draw";
import { useEffect, useRef } from "react"
import { start } from "repl";


export default function Canvas(){
    const canvasRef=useRef<HTMLCanvasElement>(null);

  useEffect(()=>{

  

        if(canvasRef.current){
          
InitDraw(canvasRef.current)


        
    
    
    
    
    
    }

    },[canvasRef])

    return(
        <div className="bg-white"> 

            <canvas ref={canvasRef} width={900} height={900} ></canvas>
        </div>
    );
}
