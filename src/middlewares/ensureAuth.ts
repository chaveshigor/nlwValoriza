import { Request, Response, NextFunction } from "express"
import { verify, decode } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    
    if(!authToken) {
        return res.status(401).json({
            status: 'error',
            description: 'A token must be provided'
        })
    }

    const token = authToken.split(" ")[1]
    
    try {
        const { sub: user_id } = verify(token, process.env.SECRET_KEY_TO_JWT) as IPayload
        req.user_id = user_id
        
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            description: 'Token invalid'
        }) 
    }

    next()
}