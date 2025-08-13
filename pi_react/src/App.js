import logo from './logo.svg';
import './App.css';

function App() { //aqui é java script
  //quero uma variavel para o email
  let email = ""

  function mudaEmail(valor){
    email = valor
  }  

  //quero uma variavel para a senha
  let senha = ""

  function mudaSenha(valor){
    senha = valor
  }

  function enviar(){
    alert("Email:"+email+" senha: "+senha)
  }

  let isLogin = true;

  function mudaTela(){
    isLogin = !isLogin
  }

  return ( /* aqui é html */
    <main className="App">
      <button onClick={ () => mudaTela()}>
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o login")}
      </button>
      
      {!isLogin && (
      <form className="register">
        
      </form>
      )}

      {isLogin && (
      <form className="login">
        <label>
          Email: 
          <input 
            type="Email" 
            name="email" 
            placeholder="email@exemplo.com" 
            onChange={ (e) => mudaEmail(e.target.value) }
          /><br/>
        </label>
        <label>
          Senha: 
          <input 
            type="password" 
            name="Senha" 
            placeholder="coloque uma senha com 6 carcater"
            onChange={ (e) => mudaSenha(e.target.value) }
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

    </main>
  );
}

export default App;
