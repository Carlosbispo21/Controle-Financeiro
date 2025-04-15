import "./Login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="container">
      <h1>Bem vindo de volta!</h1>
      <p className="subtitulo">Por favor, insira seus dados abaixo</p>
      <div className="formulario">
        <p>E-mail</p>
        <input className="email" type="email" placeholder="Insira seu e-mail" />

        <p>Senha</p>
        <input
          className="senha"
          type="password"
          placeholder="Insira sua senha"
        />

        <div className="btn">
          <button className="Login">Login</button>
        </div>

        <div className="divisao">
          <hr /> <span>ou</span> <hr />
        </div>

        <div className="btn-google">
          <button className="LoginGoogle">
            {" "}
            <FcGoogle size={20} />
            Google
          </button>
        </div>

        <div className="registrar">
          <p>
            não tem uma conta? <a href="#">Registre aqui</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
