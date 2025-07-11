"use client";
import { PencilRuler, Rss } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "@/config";
export default function SigninPage() {
    const [state, setState] = useState({
        name: ""
    })
    const router = useRouter();
    const token = localStorage.getItem('token');
    


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })

    }

    const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_URL}/room`, state, {
                 headers: {
    Authorization: token,
  }})
  toast.success("room created")
            const roomId = res.data.roomId
            router.push(`/canvas/${roomId}`)


                if(res.data.success){
                    console.log(res,"eggrgrgrgrgresss");

                    toast.success("room created")
            const roomId = res.data.roomId
            router.push(`/canvas/${roomId}`)
        }
            console.log(res, "roooom");

    }catch (error: any) {
        toast.error(error)

    }
}



    


return (
    <>
        <div className="bg-gradient-to-t from-indigo-900 to-white via-indigo-300 dark:from-gray-950 dark:to-indigo-900">
            <div className="absolute top-50 right-50 p-4 cursor-pointer">
                <PencilRuler
                    className="h-8 w-auto text-indigo-600 dark:text-indigo-400"
                    onClick={() => {
                        router.push("/");
                    }}
                />
            </div>
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Create a room and collaborate
                        </h1>
                    </div>
                    <form className="mt-6" onSubmit={createRoom}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Please enter your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={state.name}
                                onChange={onChangeHandler}
                                className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Harkirat"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium"
                            >
                                Create room
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-zinc-700">Want to join a room? <a className="underline" href="/join-room">Join room</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
);
}