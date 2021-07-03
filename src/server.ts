import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import { router } from "./routes"
import "./database"

const app = express()

app.use(express.json())
app.use(router)

// Error midleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            status: "error",
            description: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        description: "Unexpected error"
    })
})

const port = process.env.APLICATION_PORT || 8080

app.listen(port, () => {
    console.log(`Server started at port ${port} :)`)
})