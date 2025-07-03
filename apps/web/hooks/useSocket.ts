import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket(){
    const [loading,setLoading]=useState(true)
    const[socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MDBiYmVlOC01NzJjLTQ4MzctYjA2MS1mYmVkMGJlYjBhZDgiLCJpYXQiOjE3NTE0NDcyNzV9.teoBbga0BfTb-rWlA2v_J8Dx6d6dmArxGXX3fVM5Z7s`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws)
        }
    },[])
    return {
        socket,
        loading
    }


}