import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket(){
    const [loading,setLoading]=useState(true)
    const[socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YzhkOTYzNy0xZWJkLTQzNTktYTA0Zi00NjNhNDg5Mzg1ZjciLCJpYXQiOjE3NTEyNzI3MTF9.-dxQ9DpqNFeG29O5Iuh_ioDLPw0e4dOqGo31Tjp_sqU`);
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