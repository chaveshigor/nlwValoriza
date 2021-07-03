import 'reflect-metadata'
import express from "express"
import './database'

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send({hello: 'world'})
})

app.post('/', (req, res) => {
    return res.status(200).send({hello: 'world'})
})

const port = 8080

app.listen(port, () => {
    console.log(`Server started at port ${port} :)`)
})