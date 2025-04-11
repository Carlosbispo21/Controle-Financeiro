import React, { useState } from "react";

const Principal = () => {
  const [descricao, setDescicao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [transacoes, setTransacoes] = useState([]);

  const entradas = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);

  const total = entradas - saidas;

  const removerTransacao = (id) => {
    const novaLista = transacoes.filter((t) => t.id !== id);
    setTransacoes(novaLista);
  };

  const adicionarTransacao = () => {
    if (!descricao || !valor) return;

    const valorNumerico = parseFloat(valor);

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: valorNumerico,
      tipo,
    };

    setTransacoes([...transacoes, novaTransacao]);

    setDescicao("");
    setValor("");
    setTipo("entrada");
  };

  return (
    <div className="container">
      <h1>Controle Financeiro</h1>

      <div className="cards">
        <div className="card-entrada">
          <h2>Entradas</h2>
          <p>R$ {entradas.toFixed(2)}</p>
        </div>

        <div className="card-saida">
          <h2>Saídas</h2>
          <p>R$ {saidas.toFixed(2)}</p>
        </div>

        <div className="card-total">
          <h2>Total</h2>
          <p>R$ {total.toFixed(2)}</p>
        </div>

        <div className="desc">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescicao(e.target.value)}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        <div className="ent-sai">
          <label>
            <input
              type="radio"
              value="entrada"
              checked={tipo === "entrada"}
              onChange={(e) => setTipo(e.target.value)}
            />
            Entrada
          </label>
          <label>
            <input
              type="radio"
              value="saida"
              checked={tipo === "saida"}
              onChange={(e) => setTipo(e.target.value)}
            />
            Saída
          </label>
        </div>
        <button onClick={adicionarTransacao}>Adicionar</button>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((T) => (
              <tr key={T.id}>
                <td>{T.descricao}</td>
                <td>R$ {T.valor}</td>
                <td>{T.tipo}</td>
                <td>
                  <button onClick={() => removerTransacao(T.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Principal;
