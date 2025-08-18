import './App.css';
import User from './User'
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
              <Link to="/games">Jogos</Link>
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
          <Route path='/login' element={<User />} />

          <Route element={ <PrivateSession/> }>

            {/* Rotas Logado */}
            <Route path='/games' element={<Games />} />
            
          </Route>
        </Routes>

      </main>
    </Router>
  );
}

export default App;