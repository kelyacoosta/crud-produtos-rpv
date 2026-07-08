import { api } from "@/api/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// [id].tsx é uma rota dinâmica do Next.js: o valor entre colchetes vira um
// parâmetro acessível via useRouter().query.id (ex: /produtos/3 -> id = "3")
export default function EditarProduto() {
  const router = useRouter();
  const { id } = router.query;

  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (!id) return;

    const carregarProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        const payload = response.data?.data ?? response.data;
        const produto = Array.isArray(payload) ? payload[0] : payload;

        if (!produto) return;

        setNome(produto.nome ?? "");
        setDescricao(produto.descricao ?? "");
        setPreco(produto.preco?.toString() ?? "");
        setQuantidade(produto.quantidade?.toString() ?? "");
      } catch (error) {
        console.error(error);
      }
    };

    carregarProduto();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: PUT /produtos/:id com os dados atualizados
    await api.put(`/produtos/${id}`, {
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
    });

    // TODO: redirecionar para /produtos após sucesso
    router.push("/produtos");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div>
        <label>Preço</label>
        <input
          type="number"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </div>

      <div>
        <label>Quantidade</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
      </div>

      {/* TODO: botão de submit */}
      <button type="submit">Salvar</button>
    </form>
  );
}