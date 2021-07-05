import { app } from "./server"

const port = process.env.APLICATION_PORT || 8080

app.listen(port, () => {
    console.log(`Server started at port ${port} :)`)
})