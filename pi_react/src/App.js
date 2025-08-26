import './App.css';
import User from './Views/User/Index';
import Auth from './Views/User/Auth';
import Home from './Views/Home';
import Game from './Views/Game/Index';
import GameShow from './Views/Game/Show';
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
            <Route path='/game/:id' element={<GameShow />} />   
            
          </Route>

          <Route path='/' element={<Navigate to='/home' replace/>} />
        </Routes>

      </main>
    </Router>
  );
}

export default App;