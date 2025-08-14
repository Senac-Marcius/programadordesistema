// src/App.js
import './App.css';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// === CHAVES DO SUPABASE (provisório) ===
const SUPABASE_URL = "https://clnjakvlqdtyfgcoapci.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [user, setUser] = useState({ name: "", phone: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(null);

  function preventFormSubmit(e) { e.preventDefault(); }

  useEffect(() => {
    const raw = localStorage.getItem("supabaseSession");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setLoggedIn(true);
        setSessionInfo(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  async function handleLoginClick() {
    setMsg("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw error;

      localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      setSessionInfo(data.session);
      setLoggedIn(true);
      setMsg("Login realizado com sucesso!");
    } catch (err) {
      setMsg(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegisterClick() {
    setMsg("");
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: { name: user.name, phone: user.phone },
        },
      });
      if (error) throw error;

      setMsg("Cadastro realizado! Verifique seu e-mail para confirmar a conta.");
      setUser({ name: "", phone: "", email: "", password: "" });
      setIsLogin(true);
      console.log("signup:", data);
    } catch (err) {
      setMsg(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogoutClick() {
    setMsg("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      localStorage.removeItem("supabaseSession");
      setSessionInfo(null);
      setLoggedIn(false);
      setMsg("Você saiu da sessão.");
    } catch (err) {
      setMsg(`Erro ao sair: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (loggedIn) {
    const email =
      sessionInfo?.user?.email ||
      sessionInfo?.user?.identities?.[0]?.identity_data?.email ||
      "usuário";
    return (
      <main className="App">
        <h1>✅ Você está logado!</h1>
        <p>{email && `Sessão: ${email}`}</p>
        <button
          type="button"
          onClick={handleLogoutClick}
          disabled={loading}
          className="buttonSucess"
        >
          {loading ? "Saindo..." : "Sair"}
        </button>
        {msg && <p>{msg}</p>}
      </main>
    );
  }

  return (
    <main className="App">
      <h1>{isLogin ? "Entrar" : "Cadastrar"}</h1>

      {isLogin ? (
        <form className="login" onSubmit={preventFormSubmit}>
          <label>
            Email:
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            /><br />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="mín. 6 caracteres"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              minLength={6}
              required
            /><br />
          </label>

          <button
            type="button"
            className="buttonSucess"
            onClick={handleLoginClick}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Login"}
          </button>
        </form>
      ) : (
        <form className="register" onSubmit={preventFormSubmit}>
          <label>
            Nome:
            <input
              type="text"
              placeholder="Seu nome"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            /><br />
          </label>

          <label>
            Telefone:
            <input
              type="tel"
              placeholder="(xx) xxxxx-xxxx"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            /><br />
          </label>

          <label>
            Email:
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            /><br />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="mín. 6 caracteres"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              minLength={6}
              required
            /><br />
          </label>

          <button
            type="button"
            className="buttonSucess"
            onClick={handleRegisterClick}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Cadastrar-se" : "Voltar para o login"}
      </button>

      {msg && <p>{msg}</p>}
    </main>
  );
}