
import './Style.css';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Game() {
  const nav = useNavigate();
  const {id} = useParams();

  const [game, setGame] = useState({
    url: "",
    name: "",
    categoria: "",
    description: "",
    user_id: ""
  })

  useEffect(()=>{
    readGames()
  }, [])

  async function createGame(){
    const {data: dU, error: eU} = await supabase.auth.getUser();

    const uid = dU?.user?.id;

    if(!uid) nav("/login", {replace: true});

    const { data, error } = await supabase
      .from('games')
      .insert({...game, user_id: uid});
      //.select();
  }

  async function readGames() {    
    let { data: dataGames, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single();

      setGame(dataGames);
  }
 
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <input type="text" value={game.url} placeholder='http://exemple.com' onChange={(e) => setGame({...game, url: e.target.value})} />
        <input type="text" value={game.name} placeholder='digite o nome do jogo' onChange={(e) => setGame({...game, name: e.target.value})} />
        <input type="text" value={game.description} placeholder='descrição' onChange={(e) => setGame({...game, description: e.target.value})} />
        <input type="text" value={game.categoria} placeholder='categoria' onChange={(e) => setGame({...game, categoria: e.target.value})} />

        <button onClick={createGame}>Salvar</button>
      </form>

    
    </div>
  );
}
