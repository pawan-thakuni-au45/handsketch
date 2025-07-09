

import {z} from "zod"

export const userCreate=z.object({
    email:z.string().min(3),
    password:z.string(),
    name:z.string().max(3)
})

export const signInuser=z.object({
    email:z.string().min(3),
    password:z.string()
})

export const room=z.object({
    name:z.string().min(1)
})