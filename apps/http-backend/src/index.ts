
import express from "express"
import {JWT_SECRET} from "@repo/backend-common/config"
import {signInuser, userCreate} from "@repo/common/types"

const app=express()
  const data=userCreate.safeParse(req.body)
    if(!data){
        res.json({
            message:"incorrect inputs"
        })
        return ;
    }

app.use("/register",(req,res)=>{



})

app.use("/login",(req,res)=>{

   const data=signInuser.safeParse(req.body);
   if(!data){
    res.json({
        message:"incorrect inputs"
    })
    return
   }
    const {username,password}=req.body
    const user=UserActivation.find({
        username,password
    })

    if(user){
        const token=jwt.sign({
            userId
        },JWT_SECRET)
    }

})

app.use("/room",(req,res)=>{

    const data=room.safeParse(req.body)
    if(!data){
        res.json({
            message:"incorrect inputs"
        })
        return
    }

})
app.listen(4000)