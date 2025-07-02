import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket(){
    const [loading,setLoading]=useState(true)
    const[socket,setSocket]=useState<WebSocket>()

    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmExZjdkNC0wYWViLTRlMDgtOGExMi0zNTVjYTE0ZWU1YzYiLCJpYXQiOjE3NTE0MjQwMjJ9.NxyUGbhH8ozqCELEpjIHEyfProsabe6vG8teGS71BDA`);
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