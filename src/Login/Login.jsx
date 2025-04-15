import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  return (
    <div className="container">
      <div className="formulario">
        <h1>Bem vindo de volta!</h1>
        <p>Por favor, insira seus dados abaixo</p>

        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" placeholder="Insira seu e-mail" />

        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" placeholder="Insira sua senha" />

        <button className="Login">Login</button>

        <div className="divisao">ou</div>

        <div className="btn-google">
          <button className="LoginGoogle">
            <FcGoogle size={20} />
            Google
          </button>
        </div>

        <div className="registrar">
          não tem uma conta? <a href="#">Registre aqui</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
