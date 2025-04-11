import React, { useState } from "react";
import "./Principal.css";

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

  const transacoesAgrupadas = transacoes.reduce((acc, transacao) => {
    const { data } = transacao;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(transacao);
    return acc;
  }, {});

  const adicionarTransacao = () => {
    if (!descricao || !valor) return;

    const valorNumerico = parseFloat(valor);

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: valorNumerico,
      tipo,
      data: dataFormatada,
      hora: horaFormatada,
    };

    setTransacoes([...transacoes, novaTransacao]);

    setDescicao("");
    setValor("");
    setTipo("entrada");
  };

  return (
    <div className="container">
      <h1>Olá, user!</h1>

      <div className="resumo-transacoes">
        <h2>Transações</h2>
        <div className="painel-info">
          <div className="info-card">
            <p>Entrada</p>
            <h3>R$ {entradas.toFixed(2)}</h3>
          </div>
          <div className="info-card">
            <p>Saída</p>
            <h3>R$ {saidas.toFixed(2)}</h3>
          </div>
          <div className="info-card">
            <p>Total de transações</p>
            <h3>{transacoes.length}</h3>
          </div>
          <div className="exportar">
            <button className="botao-exportar">⬇ Exportar</button>
          </div>
        </div>
      </div>

      <div className="cards">
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
        <button className="button-add" onClick={adicionarTransacao}>
          Adicionar
        </button>

        <div className="historico">
          {Object.entries(transacoesAgrupadas).map(([data, lista]) => (
            <div key={data} className="grupo-data">
              <h3>{data}</h3>
              {lista.map((t) => (
                <div key={t.id} className="item-transacao">
                  <div className="info-transacao">
                    <div className="descricao">
                      <strong>{t.descricao}</strong>
                    </div>
                    <div
                      className={`tipo-transacao ${
                        t.tipo === "entrada" ? "entrada" : "saida"
                      }`}
                    >
                      {t.tipo}
                    </div>
                    <div className="hora">às {t.hora}</div>
                    <div className="valor">
                      {t.tipo === "saida" ? "-" : ""} R$ {t.valor.toFixed(2)}
                    </div>
                    <button onClick={() => removerTransacao(t.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Principal;
