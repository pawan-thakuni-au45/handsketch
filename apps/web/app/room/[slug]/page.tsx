import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";



async function getRoomId(slug:string){

    const response=await axios.get(`${BACKEND_URL}/room/${slug}`)
    console.log(response.data,'FRGr');
    return response?.data?.room?.id

}

export default async function ChatRoom1({
     params,
}: {
  params: Promise<{ slug: string }>
}) {

    const {slug}=await params
    console.log("slug",slug);
    const roomId=await getRoomId(slug)
    return <ChatRoom id={roomId}></ChatRoom>
}
