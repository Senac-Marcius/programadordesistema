import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Game() {
  const nav = useNavigate();

  const [game, setGame] = useState({
    url: "",
    name: "",
    description: "",
    user_id: ""
  })

  async function createGame(){
    const {data: dU, error: eU} = await supabase.auth.getUser();

    const uid = dU?.user?.id;

    if(!uid) nav("/login", {replace: true});

    const { data, error } = await supabase
      .from('games')
      .insert({...game, user_id: uid});
      //.select();
  }
 
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <input type="text" placeholder='http://exemple.com' onChange={(e) => setGame({...game, url: e.target.value})} />
        <input type="text" placeholder='digite o nome do jogo' onChange={(e) => setGame({...game, name: e.target.value})} />
        <input type="text" placeholder='descrição' onChange={(e) => setGame({...game, description: e.target.value})} />

        <button onClick={createGame}>Salvar</button>
      </form>
    </div>
  );
}
