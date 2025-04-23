import React, { useState } from "react";
import "./Principal.css";
import { useAuth } from "../Autenticacao/UserAuth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const Principal = () => {
  const { user } = useAuth();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [transacoes, setTransacoes] = useState([]);
  const [borderColor, setBorderColor] = useState("");

  const entradas = transacoes
    .filter((t) => t.tipo === "entrada")
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = transacoes
    .filter((t) => t.tipo === "saida")
    .reduce((acc, t) => acc + t.valor, 0);

  const total = entradas - saidas;

  const removerTransacao = async (id) => {
    try {
      await deleteDoc(doc(db, "transacoes", id));
      const novaLista = transacoes.filter((t) => t.id !== id);
      setTransacoes(novaLista);
    } catch (error) {
      console.error("Erro ao remover transacao", error);
    }
  };

  const transacoesAgrupadas = transacoes.reduce((acc, transacao) => {
    const { data } = transacao;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(transacao);
    return acc;
  }, {});

  const adicionarTransacao = async () => {
    if (!descricao || !valor) return;

    const valorNumerico = parseFloat(valor);

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR");
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novaTransacao = {
      descricao,
      valor: valorNumerico,
      tipo,
      data: dataFormatada,
      hora: horaFormatada,
      uid: user.uid,
      timestamp: agora,
    };

    try {
      const docRef = await addDoc(collection(db, "transacoes"), novaTransacao);
      console.log("Transação salva com ID:", docRef.id);
      setTransacoes([...transacoes, { ...novaTransacao, id: docRef.id }]);
    } catch (error) {
      console.error("Erro ao adicionar transação", error);
    }

    setDescricao("");
    setValor("");
    setTipo("entrada");
  };

  useEffect(() => {
    const carregarTransacoes = async () => {
      if (!user) return;
      console.log("UID logado:", user.uid);

      const transacoesRef = collection(db, "transacoes");
      const q = query(
        transacoesRef,
        where("uid", "==", user.uid),
        orderBy("timestamp", "asc")
      );

      const queryExe = await getDocs(q);
      const list = queryExe.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransacoes(list);
    };
    carregarTransacoes();
  }, [user]);

  const selectColor = (e) => {
    const valor = e.target.value;

    if (valor === "Categorias") {
      setBorderColor("borda-preta");
    } else if (valor === "Saude") {
      setBorderColor("borda-vermelha");
    } else if (valor === "Alimentação") {
      setBorderColor("borda-verde");
    } else if (valor === "Material") {
      setBorderColor("borda-amarela");
    }
  };

  return (
    <div className="container">
      <h1>Olá, {user ? user.displayName : "usuário!"}</h1>

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
            <p>Total R$</p>
            <h3>R$ {total.toFixed(2)}</h3>
          </div>
          <div className="info-card">
            <p>Total de transações</p>
            <h3>{transacoes.length}</h3>
          </div>
          <div className="exportar">
            <button className="botao-exportar">Exportar</button>
          </div>
        </div>
      </div>

      <div className="cards">
        <div className="desc">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <button
            type="button"
            className={`btn-radio entrada ${
              tipo === "entrada" ? "selected" : ""
            }`}
            onClick={() => setTipo("entrada")}
          >
            ⬆ Entrada
          </button>
          <button
            type="button"
            className={`btn-radio saida ${tipo === "saida" ? "selected" : ""}`}
            onClick={() => setTipo("saida")}
          >
            ⬇ Saída
          </button>
          <select
            className={`categorias ${borderColor}`}
            onChange={selectColor}
          >
            <option value="Categorias">Categorias</option>
            <option value="Saude">Saude</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Material">Material</option>
          </select>
        </div>

        <button className="button-add" onClick={adicionarTransacao}>
          Adicionar
        </button>
      </div>

      <div className="historico">
        {Object.entries(transacoesAgrupadas).map(([data, lista]) => (
          <div key={data} className="grupo-data">
            <div className="card-data">
              <div className="topo-data">
                <span className="data-titulo">{data}</span>
              </div>

              {lista.map((t) => (
                <div key={t.id} className="transacao-item">
                  <div className="descricao">
                    <strong>{t.descricao}</strong>
                    <span className="tipo-transacao">{t.tipo}</span>
                  </div>

                  <div className="hora">às {t.hora}</div>

                  <div
                    className={`valor ${
                      t.tipo === "entrada" ? "positivo" : "negativo"
                    }`}
                  >
                    {t.tipo === "entrada" ? "+ " : "- "} R${" "}
                    {Number(t.valor).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removerTransacao(t.id)}
                    className="delete-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Principal;
