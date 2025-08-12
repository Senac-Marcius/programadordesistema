import logo from './logo.svg';
import './App.css';

function App() { //aqui é java script

  let cesta = ['pão', 'suco', 'chocolate', 'torrone']

  let desenha = [];
  // declara o indice; compara se é pra continuar; incrementa o indice
  for(let i=0; i<3; i++){
    desenha.push(<p> { cesta[i]  } </p>)
  }

  return ( /* aqui é html */
    <main className="App">
      {
        desenha
      }
    </main>
  );
}

export default App;
