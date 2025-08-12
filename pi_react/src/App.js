import logo from './logo.svg';
import './App.css';

function App() { //aqui é java script
  //Faça uma lista com todos os numeros até 10
  const numbers = [4,1,2,3,5,6,7,8,9,10];
  
  // mas exiba apenas o números impares
  let impars = [];

  for(let i=0; i< numbers.length; i++){
    if( numbers[i] % 2 != 0){ //if( numbers[i] % 2 == 1){
      impars.push(<p> { numbers[i] } </p>);
    }
  }

  return ( /* aqui é html */
    <main className="App">
      {impars}
    </main>
  );
}

export default App;
