import React from "react";

const Principal = () => {
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
          <input type="text" placeholder="Descrição" />
          <input type="text" inputMode="numeric" placeholder="Valor" />
        </div>

        <div className="ent-sai">
          <label>
            <input type="radio" value="entrada" />
            Entrada
          </label>
          <label>
            <input type="radio" value="saida" />
            Saída
          </label>
        </div>
        <button>Adicionar</button>

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
