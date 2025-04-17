import "./App.css";
import Login from "./Login/Login.jsx";
import { AuthProvider } from "./Autenticacao/UserAuth.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Principal from "./Principal/Principal.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/principal" element={<Principal />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
