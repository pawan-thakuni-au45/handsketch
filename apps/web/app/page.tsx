"use client"

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";



export default function Home() {
  const[roomId,setRoomId]=useState("");
  const router=useRouter()
  console.log(roomId,"roomidfor");
  
  
    return(
    <div>
      
      <input value={roomId} onChange={(e)=>{
          setRoomId(e.target.value);
      }} type="text" placeholder="roomId"></input>
      <button onClick={()=>{
        router.push(`/room/${roomId}`);
      }}>click me</button>
    </div>
    )
}
