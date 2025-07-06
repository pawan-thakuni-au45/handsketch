import { InitDraw } from "@/draw";
import { Circle, Pencil, RectangleHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonIcons } from "./ButtonIcons";

 type Shape="circle" | "rect" | "pencil"
export function Canvas({roomId,socket}:{socket:WebSocket,roomId:string}){
     const canvasRef=useRef<HTMLCanvasElement>(null)

     const [selectedTool,setSelectedtool]=useState<Shape>("circle")
      useEffect(()=>{

  
  
        if(canvasRef.current){
          
InitDraw(canvasRef.current,roomId,socket);


     }

    },[canvasRef]);
    return <div className="bg-red overflow-hidden height-100vh"> 

            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
            <div >
                <TopBar selectedTool={selectedTool} setSelectedtool={setSelectedtool}/>

            </div>
        </div>
}

function TopBar({selectedTool,setSelectedtool}:{
        selectedTool:Shape,
        setSelectedtool:(s:Shape)=>void
}){
        return <div style={{
                position:"fixed",
                top:10,
                left:10
        }}>
                <div className="flex gap-1">
                        <ButtonIcons activated={selectedTool==="pencil"} icon={<Pencil/>} onClick={()=>{
                                setSelectedtool("pencil")
                        }} >
                        
                        </ButtonIcons>
                        <ButtonIcons activated={selectedTool==="rect"} icon={<RectangleHorizontal/>} onClick={()=>{
                                setSelectedtool("rect")
                        }} ></ButtonIcons>

                        <ButtonIcons  activated={selectedTool==="circle"} icon={<Circle/>} onClick={()=>{
                                setSelectedtool("circle")
                        }} ></ButtonIcons>


                </div>

        </div>

}