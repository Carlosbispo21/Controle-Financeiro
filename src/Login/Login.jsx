import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/Principal");
    } catch (error) {
      console.error("erro ao fazer login", error);
    }
  };

  const registro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: nome,
      });
      navigate("/principal");
    } catch (error) {
      console.error("erro ao registrar", error);
    }
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/Principal");
    } catch (error) {
      console.error("Erro ao fazer login com Google", error);
    }
  };

  return (
    <div className="container-login">
      <div className="formulario">
        <h1>{isLogin ? "Bem vindo de volta!" : "Crie sua conta!"}</h1>
        <p>
          {isLogin
            ? "Por favor, insira seus dados abaixo"
            : "Preencha os campos abaixo para se registrar"}
        </p>

        {!isLogin && (
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              placeholder="Insira seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        )}

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          placeholder="Insira sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="Login" onClick={isLogin ? login : registro}>
          {isLogin ? "Login" : "Registrar"}
        </button>

        <div className="divisao">ou</div>

        <div className="btn-google">
          <button className="LoginGoogle" onClick={loginGoogle}>
            <FcGoogle size={20} />
            Google
          </button>
        </div>

        <div className="registrar">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Registre-se aqui" : "Faça login aqui"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
