
import './Style.css';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

import { Input } from '../../Components/Input'
import { listGames } from '../../Components/Games'

const supabaseUrl = "https://clnjakvlqdtyfgcoapci.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsbmpha3ZscWR0eWZnY29hcGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTAzNzEsImV4cCI6MjA2OTkyNjM3MX0.7g7VvxI1DnM0kgvdcoYW2qc_8sdAdyyCfsQyXkebPeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Game() {
  const nav = useNavigate();

  const [game, setGame] = useState({
    url: "",
    name: "",
    categoria_id: '1',
    description: "",
    user_id: ""
  })

  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    readGames()
    readCategoria()
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

  async function readCategoria() {
    let { data: dataCategoria, error } = await supabase
        .from('categories')
        .select('*');

        setCategories(dataCategoria);
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
      <Form  func={createGame} title="Cadastro de Jogo">
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
        
        <select value={game.categoria_id} onChange={(e)=> setGame({
          ...game, categoria_id: e.target.value
        }) }>
          {categories.map(
            c => (
              <option value={c.id}> {c.name}</option>
            )
          )}
        </select>
      </Form>

      <Button  onClick={() => readGames("Arcade")}>Busca Arcades</Button >
      <Button  onClick={() => readGames("Mobile")}>Busca Mobiles</Button >
      <Button  onClick={() => readGames()}>Busca Todos</Button >

      <listGames 
         games={games}
         funcExcluir={() => delGame(g.id)}
         funcEdit={() => nav( `/game/edit/${g.id}`, {replace: true} )}
         funcVer={() => nav( `/game/${g.id}`, {replace: true} )}
      />
     
    </div>
  );
}
