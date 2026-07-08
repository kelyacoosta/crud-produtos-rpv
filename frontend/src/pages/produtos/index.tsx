import { api } from "@/api/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function Produtos() {
  // TODO: estado para guardar a lista de produtos vinda da API
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get("/produtos");
        const payload = response.data?.data ?? response.data;
        setProdutos(Array.isArray(payload) ? payload : []);
      } catch (error) {
        console.error(error);
      }
    }

    carregarProdutos();
  }, []);

  async function excluirProduto(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;

    try {
      await api.delete(`/produtos/${id}`);
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* TODO: link para a página de cadastro (/produtos/novo) */}
      <Link href="/produtos/novo">
        Novo Produto
      </Link>

      {/* TODO: tabela listando os produtos (nome, preco, quantidade) */}
      <table border={1}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.quantidade}</td>
              <td>
                {/* TODO: botão Editar -> leva para /produtos/[id] */}
                <button onClick={() => router.push(`/produtos/${produto.id}`)}>
                  Editar
                </button>

                {/* TODO: botão Excluir -> chama DELETE /produtos/:id */}
                <button onClick={() => excluirProduto(produto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
} 