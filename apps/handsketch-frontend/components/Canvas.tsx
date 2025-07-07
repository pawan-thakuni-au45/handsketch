import { InitDraw } from "@/draw";
import { Game } from "@/draw/Game";
import { Circle, Pencil, RectangleHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ButtonIcons } from "./ButtonIcons";


 export type Tool="circle" | "rect" | "pencil"
export function Canvas({roomId,socket}:{socket:WebSocket,roomId:string}){
     const canvasRef=useRef<HTMLCanvasElement>(null)
     const [game,setGame]=useState<Game>()

     const [selectedTool,setSelectedtool]=useState<Tool>("circle")

     //whenever state will change this useEffedt will be called
     useEffect(()=>{
        //@ts-ignore
        game?.setTool(selectedTool) ;//whenerver we want to change the state among many components just put it with "WINDOW"

     },[selectedTool,game])

      useEffect(()=>{


  
  
        if(canvasRef.current){
                const g=new Game(canvasRef.current,roomId,socket)
                setGame(g)
           return () => {
                g.destroy();
            }



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
        selectedTool:Tool,
        setSelectedtool:(s:Tool)=>void
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