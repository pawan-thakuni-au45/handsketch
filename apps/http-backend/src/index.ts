
import express from "express"
import { JWT_SECRET } from "@repo/backend-common/config"
import { signInuser, userCreate, room } from "@repo/common/types"
import { prismaClient } from "@repo/pridb/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {usermiddleware } from "./usermiddlewear"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {

    const parsedData = userCreate.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputsss"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10)



    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                // TODO: Hash the pw
                password: hashedPassword,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id,
            message:"user register succesfully"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = signInuser.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }



    // TODO: Compare the hashed pws here
    const user = await prismaClient.user.findFirst({


        where: {
            email: parsedData.data.email,
           

        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return;
    }
    const matchPassword = await bcrypt.compare(parsedData.data.password, user.password)
    
    if (!matchPassword) {
        res.json({
            message: "you have entered wrong password"
        })
        return
    }


    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);
    console.log("tokenjwt",token);

    res.json({
        token,
       
        

    })
    console.log(token,"tokeen")
})

app.post("/room", usermiddleware, async (req, res) => {
    const parsedData = room.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore: TODO: Fix this
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})


app.get("/chats/:roomId", async (req, res) => {

    try {
        const roomId = Number(req.params.roomId);
        console.log(roomId,"Rgergergregergergergerg");
        const messages = await prismaClient.chat.findMany({
            where:{
                roomId:roomId
                    
            },
            orderBy: {
                id: "desc"
            },
            take: 10000
        });
        console.log(roomId,"Rgergergregergergergerg");


        res.json({
            messages
        })
    } catch (e) {
        console.log(e);
        res.json({
            messages: []
        })
    }

})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug
    console.log(slug, "backend chieking")

    try {
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });
        console.log(room,"room get");
        res.json({
            room
        }
        )
    } catch (e) {
        console.log(e,"error===================================");
    }
})















app.listen(4001)