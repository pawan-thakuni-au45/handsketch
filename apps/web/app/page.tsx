



"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

    const [roomId, setRoomId] = useState("");
    const router = useRouter();


    return (
        <div style={{height:"100vh" , width:"100vh",display:"flex",position:"relative"}}>
            <div style={{  justifyContent:"center" , alignItems:"center" , padding:"10" , position:"absolute" , top:"300px" , left:"500px"}}>
              <input type="text" value={roomId}   onChange={(e)=>{setRoomId(e.target.value)}} />
              <button onClick={()=>{
                router.push(`/room/${roomId}`)
              }}>join room</button>
            </div>
        </div>

    )
}
