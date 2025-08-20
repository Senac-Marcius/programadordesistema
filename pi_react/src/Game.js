import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Game() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', url: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function salvar() {
    setMsg('');
    setLoading(true);
    try {
      // pega o usuário logado para obter o user_id
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      const uid = userData?.user?.id;
      if (!uid) {
        setMsg('Sessão expirada. Faça login novamente.');
        nav('/login', { replace: true });
        return;
      }

      const payload = {
        name: form.name,
        url: form.url || null,
        description: form.description || null,
        user_id: uid, 
      };

      const { error } = await supabase.from('games').insert(payload);
      if (error) throw error;

      setMsg('Game criado!');
      setForm({ name: '', url: '', description: '' });
    } catch (err) {
      setMsg(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h1>Novo Game</h1>
      <form className="register" onSubmit={(e) => e.preventDefault()}>
        <label>
          Nome
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>

        <label>
          URL
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </label>

        <label>
          Descrição
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <button type="button" className="buttonSucess" onClick={salvar} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>

      {msg && (<div className='toast'>{msg}</div>)}  
    </div>
  );
}
