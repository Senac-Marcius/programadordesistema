import logo from './logo.svg';
import './App.css';

function App() { //aqui é java script

  function calculadora (a, b, op){
    if(op == '+'){
      return a + b
    } else if(op == '-'){
      return a - b;
    } else if (op == '*') {
      return a * b
    } else if (op == '/') {
      return a / b
    }
  }

  return ( /* aqui é html */
    <main className="App">
      { calculadora(5,  calculadora(8, 7, '*'), '+') }<br/>
      { calculadora(5, 5, '-') }<br/>
      { calculadora(5, 5, '*') }<br/>
      { calculadora(5, 5, '/') }<br/>
    </main>
  );
}

export default App;
