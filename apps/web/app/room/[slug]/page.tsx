import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";
async function getRoomId(slug: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    console.log(response.data, 'Room data');
    return response?.data?.room?.id;
  } catch (error) {
    console.error('Room not found:', error);
    return null;
  }
}

export default async function ChatRoom1({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("slug", slug);

  const roomId = await getRoomId(slug);

  if (!roomId) {
    return (
      <div className="p-4">
        <h1>Room not found</h1>
        <p>The room "{slug}" doesn't exist.</p>
        <a href="/" className="text-blue-500 underline">Go back to create or join a room</a>
      </div>
    );
  }

  return <ChatRoom id={roomId} />;
}
