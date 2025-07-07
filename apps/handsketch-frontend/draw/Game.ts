import { getallExistingShapes } from "./Http";
import { Tool } from "@/components/Canvas";

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

export class Game{

     private canvas:HTMLCanvasElement;
     private ctx:CanvasRenderingContext2D;
     private existingShapes:Shape[];
     private roomId:string;
     private clicked :boolean;
     private startX=0;
     private startY=0;
     private selectedTool:Tool="circle"

     socket:WebSocket

    constructor (canvas:HTMLCanvasElement,roomId:string,socket:WebSocket){
        this.canvas=canvas;
        this.ctx=canvas.getContext("2d")!;
        this.existingShapes=[];
        this.roomId=roomId;
        this.socket=socket;
        this.clicked=false;
        this.init();
        this.initHandler();
        this.initMouseHandlers();
    }

      destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandlers)

        this.canvas.removeEventListener("mouseup", this.mouseUpHandler)

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler)
    }

    setTool(tool:"circle" | "pencil" | "rect"){
        this.selectedTool =tool;
    }

    async init(){
        this.existingShapes=await getallExistingShapes(this.roomId)
        this.clearCanvas()

    }
    initHandler(){
        this.socket.onmessage =(event)=>{
                        const message=JSON.parse(event.data)
        
                        if(message.type=="chat"){
                            const parsedShape=JSON.parse(message.message)
                            this.existingShapes.push(parsedShape.shape)
                    this.clearCanvas()
        
                        }
                    }
    }
clearCanvas(){
     this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
   this.ctx.fillStyle="rgba(0,0,0)"
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)

    this.existingShapes.map((Shape)=>{
        if(Shape.type==="rect"){
            this.ctx.strokeStyle="rgba(255,255,255)"
            this.ctx.strokeRect(Shape.x,Shape.y,Shape.width,Shape.height)

        } else if(Shape.type==="circle"){
            this.ctx.beginPath()
            this.ctx.arc(Shape.centerX,Shape.centerY,Math.abs(Shape.radius),0,Math.PI*2)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    })

}

mouseDownHandlers=(e)=>{
     
                this.clicked=true;
                this.startX=e.clientX
                this.startY=e.clientY
            }


mouseUpHandler=(e)=>{
                this.clicked=false
                const width=e.clientX-this.startX;
                const height=e.clientY-this.startY
                          //@ts-ignore
const selectedTool=this.selectedTool
let shape:Shape | null=null
if(selectedTool==="rect"){
shape={
                    type:"rect",
                    x:this.startX,
                    y:this.startY,
                    width,
                    height
}
         
}
                else if(selectedTool==="circle"){
                    const radius=Math.max(width,height)/2;
                    shape={
                        type:"circle",
                        radius:radius,
                        centerX:this.startX+radius,
                        centerY:this.startY+radius
                    }
                

                }
                if(!shape){
                    return 
                }

                this.existingShapes.push(shape)


                this.socket.send(JSON.stringify({
                    type:"chat",
                    message:JSON.stringify({
                        shape
                    }),
                    roomId:this.roomId
                }))

               

        };

         mouseMoveHandler=(e)=>{
            if(this.clicked){
               const width=e.clientX-this.startX;
               const height=e.clientY-this.startY;
               
              this.clearCanvas()
               
               this.ctx.strokeStyle="rgba(255,255,255)"
               //@ts-ignore
               const selectedTool=this.selectedTool
               if(selectedTool==="rect"){
               this.ctx.strokeRect(this.startX,this.startY,width,height)
               }else if(selectedTool==="circle"){
                const radius=Math.max(width,height)/2;
                 const centerX=this.startX+radius
                 const centerY=this.startY+radius
                 
                 this.ctx.beginPath()
                 this.ctx.arc(centerX,centerY,radius,0,Math.PI*2)
                 this.ctx.stroke()
                 this.ctx.closePath()
               }
            }
}



initMouseHandlers() {
        this.canvas.addEventListener("mousedown", this.mouseDownHandlers)

        this.canvas.addEventListener("mouseup", this.mouseUpHandler)

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler)    

    }
}