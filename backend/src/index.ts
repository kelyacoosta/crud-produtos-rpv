import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World" })
})

app.get('/users', (req, res) => {
    return res.status(400).json({ message: "Não habilitado!" })
    res.status(200).json({
        data: {
            infos: {
                users: [
                    { name: "Daniel", age: 35 }
                ]
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})