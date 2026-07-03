import { Request, Response } from 'express'
import { db } from '../database/connection'

// GET /produtos (aceitar ?q= para busca por nome, ex: whereILike igual ao exemplo de /users)
export const getProducts = async (req: Request, res: Response) => {
    // TODO: buscar todos os produtos na tabela `produtos`
    // Dica: usar req.query.q para filtrar por nome (whereILike)

    try {
        const { q } = req.query

        let query = db('produtos')

        if (q) {
            query = query.whereILike('nome', `%${q}%`)
        }

        const produtos = await query.select('*')

        return res.json(produtos)
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar produtos.' })
    }
}

// GET /produtos/:id
export const getProductById = async (req: Request, res: Response) => {
    // TODO: buscar um produto pelo id (req.params.id)
    // Se não encontrar, retornar 404

    try {
        const { id } = req.params

        const produto = await db('produtos')
            .where({ id })
            .first()

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado.' })
        }

        return res.json(produto)
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao buscar produto.' })
    }
}

// POST /produtos
export const createProduct = async (req: Request, res: Response) => {
    // TODO: inserir um novo produto (req.body: nome, descricao, preco, quantidade)

    try {
        const { nome, descricao, preco, quantidade } = req.body

        const [id] = await db('produtos').insert({
            nome,
            descricao,
            preco,
            quantidade
        })

        return res.status(201).json({
            mensagem: 'Produto criado com sucesso.',
            id
        })
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao criar produto.' })
    }
}

// PUT /produtos/:id
export const updateProduct = async (req: Request, res: Response) => {
    // TODO: atualizar um produto existente (req.params.id + req.body)
    // Se não encontrar, retornar 404

    try {
        const { id } = req.params
        const { nome, descricao, preco, quantidade } = req.body

        const atualizado = await db('produtos')
            .where({ id })
            .update({
                nome,
                descricao,
                preco,
                quantidade
            })

        if (atualizado === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.' })
        }

        return res.json({
            mensagem: 'Produto atualizado com sucesso.'
        })
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao atualizar produto.' })
    }
}

// DELETE /produtos/:id
export const deleteProduct = async (req: Request, res: Response) => {
    // TODO: remover um produto pelo id (req.params.id)
    // Se não encontrar, retornar 404

    try {
        const { id } = req.params

        const removido = await db('produtos')
            .where({ id })
            .del()

        if (removido === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.' })
        }

        return res.json({
            mensagem: 'Produto removido com sucesso.'
        })
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao remover produto.' })
    }
}