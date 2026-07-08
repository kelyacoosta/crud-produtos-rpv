import { Request, Response } from 'express'
import { db } from '../database/connection'

// GET /produtos (aceitar ?q= para busca por nome, ex: whereILike igual ao exemplo de /users)
export const getProducts = async (req: Request, res: Response) => {
    const { q } = req.query

    // Dica: usar req.query.q para filtrar por nome (whereILike)
    if (q) {
        const busca = await db('produtos').whereILike('nome', `%${q}%`)
        return res.status(200).json({ message: "Dados consultados com sucesso", data: busca })
    }

    // TODO: buscar todos os produtos na tabela `produtos`
    const query = await db('produtos')


    return res.status(200).json({ message: "Dados consultados com sucesso", data: query })
}

// GET /produtos/:id
export const getProductById = async (req: Request, res: Response) => {
    // TODO: buscar um produto pelo id (req.params.id)
    const { id } = req.params

    const query = await db('produtos').where({ id })

    if (query.length == 0) {
        return res.status(400).json({ message: "Produto não encontrado !" })
    }

    return res.status(200).json({ message: "Consulta realizada com sucesso !", data: query })
}

// POST /produtos
export const createProduct = async (req: Request, res: Response) => {
    // TODO: inserir um novo produto (req.body: nome, descricao, preco, quantidade)

    const { body } = req


    const { nome, descricao, preco, quantidade } = body

    const query = await db('produtos').insert({
        nome,
        descricao,
        preco,
        quantidade
    })

    return res.status(200).json({
        message: "Produto cadastrado com sucesso !",
        data: body
    })
}

// PUT /produtos/:id
export const updateProduct = async (req: Request, res: Response) => {
    // TODO: atualizar um produto existente (req.params.id + req.body)
    const { body, params: { id } } = req

    const { nome, descricao, preco, quantidade } = body

    const query = await db('produtos').update({
        nome,
        descricao,
        preco,
        quantidade
    }).where({ id })

    if (!query) {
        return res.status(400).json({ message: "Produto não encontrado !" })
    }

    res.status(200).json({ message: "Dados atualizados com sucesso !" })
    // Se não encontrar, retornar 404
}

// DELETE /produtos/:id
export const deleteProduct = async (req: Request, res: Response) => {
    // TODO: remover um produto pelo id (req.params.id)
    const { id } = req.params

    const query = await db('produtos').where({ id }).del()

    if (!query) {
        return res.status(400).json({ message: "Produto não encontrado !" })
    }

    return res.status(200).json({ message: "Dados excluídos com sucesso !" })
    // Se não encontrar, retornar 404
}