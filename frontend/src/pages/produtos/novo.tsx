import { api } from "@/api/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NovoProduto() {
  // TODO: um useState para cada campo do produto (nome, descricao, preco, quantidade)
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST /produtos com os dados do formulário
    await api.post("/produtos", {
      nome,
      descricao,
      preco: Number(preco),
      quantidade: Number(quantidade),
    });

    // TODO: redirecionar para /produtos após sucesso (useRouter)
    router.push("/produtos");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: inputs controlados para nome, descricao, preco e quantidade */}
      <div>
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div>
        <label>Descrição</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>

      <div>
        <label>Preço</label>
        <input type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
      </div>

      <div>
        <label>Quantidade</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </div>

      {/* TODO: botão de submit */}
      <button type="submit">Cadastrar</button>
    </form>
  );
}