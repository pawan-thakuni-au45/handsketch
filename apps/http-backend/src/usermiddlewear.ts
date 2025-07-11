import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";



export function usermiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded,"usermidlewear");

    if (decoded) {
        //@ts-ignore
        req.userId = (decoded as jwt.JwtPayload).userId;
        next();
    } else {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}



