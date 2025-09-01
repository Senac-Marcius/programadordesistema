
import './Style.css';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Button from 'react-bootstrap/Button';
import { Input } from '../../Components/Input'

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

  async function delGame(batatinha){
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', batatinha)
  }
 
  return (
    <div className="screen">
      <form onSubmit={(e)=> e.preventDefault()}>
        <Input 
          label="Digite a url desse jogo"
          type="text" 
          placeholder='http://exemple.com' 
          onChange={setGame} 
          objeto={game}
          campo='url'
        />
        <Input 
          type="text" 
          placeholder='digite o nome do jogo' 
          onChange={setGame} 
          objeto={game}
          campo='name'
        />
        <Input 
          type="text" 
          placeholder='descrição do jogo' 
          onChange={setGame} 
          objeto={game}
          campo='description'
        />
        <Input 
          type="text" 
          placeholder='categoria do jogo' 
          onChange={setGame} 
          objeto={game}
          campo='categoria'
        />

        <Button  onClick={createGame}>Salvar</Button>
      </form>

      <Button  onClick={() => readGames("Arcade")}>Busca Arcades</Button >
      <Button  onClick={() => readGames("Mobile")}>Busca Mobiles</Button >
      <Button  onClick={() => readGames()}>Busca Todos</Button >

      <div className='row'>
      {games.map(
        g => (
          <div className='cardGame' key={g.id} >
            Nome: {g.name}<br/>
            <a url={g.url}></a>
            {/*<></>*/}
            <p>{g.description}</p>
            <Button variant="danger" onClick={() => delGame(g.id)}  >Excluir</Button>
            <Button variant="primary" onClick={() => nav( `/game/${g.id}`, {replace: true} )}>Ver</Button>
            <Button variant="warning" onClick={() => nav( `/game/edit/${g.id}`, {replace: true} )}>Editar</Button>
          </div>
        )
      )}
      </div>
     
    </div>
  );
}
