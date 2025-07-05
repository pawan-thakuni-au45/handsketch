import { BACKEND_URL } from "@/config";
import axios from "axios"
import { parse } from "path";

type Shape={
    type:"rect",
    x:number;
    y:number;
    width:number;
    height:number



} | {
    type:"circle",
    centerX:number;
    centerY:number;
    radius:number
}

export async function InitDraw(canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){

      
            const ctx=canvas.getContext("2d")

            let existingShpaes:Shape[]=await  getallExistingShapes(roomId)
            console.log(existingShpaes,"shpaes");
            if(!ctx){
                return
            }
            socket.onmessage =(event)=>{
                const message=JSON.parse(event.data)

                if(message.type=="chat"){
                    const parsedShape=JSON.parse(message.message)
                    existingShpaes.push(parsedShape.shape)
            clearCanvas(existingShpaes,canvas,ctx)

                }
            }
            clearCanvas(existingShpaes,canvas,ctx)
           let clicked=false
           let startX=0;
           let startY=0;
            canvas.addEventListener("mousedown",(e)=>{
                clicked=true
                startX=e.clientX
                startY=e.clientY
            })

            canvas.addEventListener("mouseup",(e)=>{
                clicked=false
                const width=e.clientX-startX;
                const height=e.clientY-startY
const shape:Shape={
                    type:"rect",
                    x:startX,
                    y:startY,
                    width,
                    height
}
                existingShpaes.push(
                   shape
                )

                socket.send(JSON.stringify({
                    type:"chat",
                    message:JSON.stringify({
                        shape
                    }),
                    roomId
                }))

               

        });
        canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
               const  width=e.clientX-startX;
               const  height=e.clientY-startY
               
              clearCanvas(existingShpaes,canvas,ctx)
               
               ctx.strokeStyle="rgba(255,255,255)"
               ctx.strokeRect(startX,startY,width,height)

            }
})
}

function clearCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    existingShapes.map((Shape)=>{
        if(Shape.type==="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(Shape.x,Shape.y,Shape.width,Shape.height)

        }
    })
}


async function getallExistingShapes(roomId:string){
   const res= await axios.get(`${BACKEND_URL}/chats/${roomId}`)
   const messages= res.data.messages

   const shapes=messages.map((x:{message:string})=>{
    const messageData=JSON.parse(x.message)
    return messageData.shape
   })
   return shapes


}