import {LineChart} from "lucide-react"
import { ReactNode } from "react"
export function ButtonIcons({icon,onClick,activated}:{icon:ReactNode,onClick:()=>void,activated:boolean}){
    return <div className={`m-2 pointer rounded-3xl hover:bg-gray border bg-black ${activated ? "text-red-400" :"text-white"}`}  onClick={onClick}>
        {icon} 

    </div>
}