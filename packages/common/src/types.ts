

import {z} from "zod"

export const userCreate=z.object({
    username:z.string().min(3).max(10),
    password:z.string().min(3).max(10),
    name:z.string().min(3).max(10)
})

export const signInuser=z.object({
    username:z.string().min(3).max(10),
    password:z.string().min(3).max(10)
})

export const room=z.object({
    name:z.string().min(1)
})