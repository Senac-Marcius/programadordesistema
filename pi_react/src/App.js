import './App.css';
import User from './User'
import Auth from './Auth'
import Home from './Home'
import Game from './Game'
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} 
  from 'react-router-dom';

function PrivateSession(){
  const hasSession = !!localStorage.getItem('supaSession');
  return hasSession ? <Outlet /> : <Navigate to="/login" replace />
}

function App() {
  const hasSession = !!localStorage.getItem('supaSession');

  return (
    <Router>
      <main className="App">
        <nav>
          {hasSession ? (
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/users">Usuários</Link>
              <Link to="/game">Jogos</Link>
            </>
          ):(
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/login">Entrar</Link>
            </>
          )}
        </nav>

        <Routes>
          {/* Rotas Públicas */}
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Auth />} />
         

          <Route element={ <PrivateSession/> }>
            {/* Rotas Logado */}
            <Route path='/users' element={<User />} />
            <Route path='/game' element={<Game />} />   
            
          </Route>

          <Route path='/' element={<Navigate to='/home' replace/>} />
        </Routes>

      </main>
    </Router>
  );
}

export default App;