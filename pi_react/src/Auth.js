import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';

const supabaseUrl="https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";

const supabase = createClient(supabaseUrl, supabaseKey);

function Auth() {
  const nav = useNavigate();
  const [user, setUser] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    password: "" 
  });
  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");

  async function logar() {
    setMsg('');
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });
      if (error) throw error;

      localStorage.setItem('supabaseSession', JSON.stringify(data.session));
      setMsg('Login realizado com sucesso!');
      setTimeout(() => nav('/game', { replace: true }), 500);
    } catch (err) {
      setMsg(`Erro ${err.status || ''}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function register(){
    setLoading(true);

    try{
      let { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password
      })

      if(error) throw error

      if(data.status == 400) throw data.message	

      setMsg("Cadastro realizado!");
    }catch(e){
      setMsg(`Error: ${e.message}`);
    }

    setLoading(false);

    setTimeout(() => setMsg(""), 5000);
  }

  return (
    <main className="App">
      <div className="card">
        <h1>{isLogin ? "Entrar" : "Cadastrar"}</h1>

        {isLogin && (
          <form className="login">
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
              onClick={logar} disabled={loading}
            >
              {loading ? "Entrando..." : "Login"}
            </button>
          </form>
        ) }
        
        {!isLogin && (
          <form className="register">
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
              onClick={register}
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
      </div>

      {msg && (<div className='toast'>{msg}</div>)}  
    </main>
  );
}

export default Auth;