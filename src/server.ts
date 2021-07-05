import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import cors from "cors"
import { router } from "./routes"
import "./database"
import { ErrorHandler } from "./services/HandlingErrors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

// Error midleware
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            status: "error",
            description: err.description
        })
    }

    return res.status(500).json({
        status: "error",
        description: "Unexpected error"
    })
})

export { app }