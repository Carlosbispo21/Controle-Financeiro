import React, { useState } from "react";

const Principal = () => {
  const [descricao, setDescicao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [transacoes, setTransacoes] = useState([]);

  const adicionarTrancasoes = () => {
    if (!descricao || !valor) return;

    const valorNumerico = parseFloat(valor);

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: valorNumerico,
      valor,
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
        </div>

        <div className="card-saida">
          <h2>Saídas</h2>
        </div>

        <div className="card-total">
          <h2>Total</h2>
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
        <button onClick={adicionarTrancasoes}>Adicionar</button>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Tipo</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Principal;
