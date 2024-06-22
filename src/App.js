import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Calendario from './pages/Calendario'; // Importa a página de Calendário
import Disciplinas from './pages/Disciplinas'; // Importa a página de Disciplinas
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/quemsomos" component={QuemSomos} />
                <Route path="/login" component={Login} />
                <Route path="/registro" component={Registro} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/calendario" component={Calendario} /> {/* Rota para o Calendário */}
                <Route path="/disciplinas" component={Disciplinas} /> {/* Rota para as Disciplinas */}
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
