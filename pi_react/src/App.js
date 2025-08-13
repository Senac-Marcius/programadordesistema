import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
//ele retorna pra gente um par variavel e função que quando alterado
// o dom atualiza a tela

function App() { //aqui é java script
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isLogin, setIsLogin] = useState(true);

  function enviar(){
    alert("Email:"+email+" senha: "+senha)
  }

  return ( /* aqui é html */
    <main className="App">
      {isLogin && (
      <form className="login">
        <label>
          Email: 
          <input 
            type="Email" 
            name="email" 
            placeholder="email@exemplo.com" 
            onChange={ (e) => setEmail(e.target.value) }
          /><br/>
        </label>
        <label>
          Senha: 
          <input 
            type="password" 
            name="Senha" 
            placeholder="coloque uma senha com 6 carcater"
            onChange={ (e) => setSenha(e.target.value) }
          /><br/>
        </label>
        <button 
          className="buttonSucess"
          onClick={() => enviar()}
        >
          Login
        </button>
      </form>
      )}
      {!isLogin && (
      <form className="register">
        
      </form>
      )}
      <button onClick={ () => setIsLogin(!isLogin)}>
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o login")}
      </button>
    </main>
  );
}

export default App;
