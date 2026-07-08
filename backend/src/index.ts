import express, { Response } from 'express'
import cors from 'cors'
import { login } from './controllers/authController'
import { AuthRequest, verifyJWT } from './middleware/authMiddleware'
import z from 'zod'
import { validate } from './services/validate'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './controllers/productController'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

const corsOptions = {
    origin: "*",
}

app.use(cors(corsOptions))

const schemaLogin = z.object({
    email: z.email(),
    password: z.string().min(8, 'Mínimo 8 caracteres.')
})

export type TLogin = z.infer<typeof schemaLogin>

app.get('/', (req, res) => {
    res.status(200).json({ message: "Servidor rodando!" })
})

app.post('/login', validate(schemaLogin), login)

app.get('/perfil', verifyJWT, (req: AuthRequest, res: Response) => {
    res.status(200).json({ message: `Seja bem vindo! Seu id é ${req.userId}` })
})

app.get('/users', (req, res) => {
    // return res.status(400).json({ message: "Não habilitado!" })
    res.status(200).json({
        data: {
            infos: {
                users: [
                    { name: "Daniel", age: 35 },
                    { name: "Joel", age: 45 }
                ]
            }
        }
    })
})

// ########## TRABALHO CRUD PRODUTOS ########################

// GET	/produtos	Não	Listar todos os produtos. Aceitar ?q= para buscar por nome
// GET	/produtos/:id	Não	Buscar um produto pelo id
// POST	/produtos	Não	Criar um novo produto
// PUT	/produtos/:id	Não	Atualizar um produto existente
// DELETE	/produtos/:id	Não	Remover um produto

const schemaCreateProduct = z.object({
    nome: z.string('Cara eu só aceito string').min(3, 'Mínimo 3 caracteres.'),
    descricao: z.string().min(3, 'Mínimo 3 caracteres.'),
    preco: z.number().min(0, 'Preço deve ser maior ou igual a 0.'),
    quantidade: z.optional(z.number().min(0, 'Quantidade deve ser maior ou igual a 0.'))
})

const schemaUpdateProduct = z.object({
    nome: z.optional(z.string().min(3, 'Mínimo 3 caracteres.')),
    descricao: z.optional(z.string().min(3, 'Mínimo 3 caracteres.')),
    preco: z.optional(z.number().min(0, 'Preço deve ser maior ou igual a 0.')),
    quantidade: z.optional(z.number().min(0, 'Quantidade deve ser maior ou igual a 0.'))
})

app.get('/produtos', getProducts)
app.get('/produtos/:id', getProductById)
app.post('/produtos', validate(schemaCreateProduct), createProduct)
app.put('/produtos/:id', validate(schemaUpdateProduct), updateProduct)
app.delete('/produtos/:id', deleteProduct)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})