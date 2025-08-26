
import './Style.css';
import { useState, useEffect} from 'react';
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
    categoria: "",
    description: "",
    user_id: ""
  })

  const [games, setGames] = useState([])

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

  async function readGames(filtro) {    
    if(filtro){
      let { data: dataGames, error } = await supabase
        .from('games')
        .select('*')
        .eq('categoria', filtro);

        setGames(dataGames);
    }else{
      let { data: dataGames, error } = await supabase
        .from('games')
        .select('*');
        
        setGames(dataGames);
    }
  }
 
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <input type="text" placeholder='http://exemple.com' onChange={(e) => setGame({...game, url: e.target.value})} />
        <input type="text" placeholder='digite o nome do jogo' onChange={(e) => setGame({...game, name: e.target.value})} />
        <input type="text" placeholder='descrição' onChange={(e) => setGame({...game, description: e.target.value})} />
        <input type="text" placeholder='categoria' onChange={(e) => setGame({...game, categoria: e.target.value})} />

        <button onClick={createGame}>Salvar</button>
      </form>

      <button onClick={() => readGames("Arcade")}>Busca Arcades</button>
      <button onClick={() => readGames("Mobile")}>Busca Mobiles</button>
      <button onClick={() => readGames()}>Busca Todos</button>

      <div className='row'>
      {games.map(
        g => (
          <div className='cardGame' key={g.id} onClick={() => nav( `/game/${g.id}`, {replace: true} )}>
            Nome: {g.name}<br/>
            <a url={g.url}></a>
            {/*<></>*/}
            <p>{g.description}</p>
          </div>
        )
      )}
      </div>
     
    </div>
  );
}
