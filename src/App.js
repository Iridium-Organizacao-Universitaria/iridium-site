import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import QuemSomos from './pages/qmsomos/QuemSomos';
import Login from './pages/login/Login';
import Registro from './pages/registro/Registro';
import Perfil from './pages/perfil/Perfil';
import Calendario from "./pages/calendario/Calendario";
import Disciplinas from "./pages/disciplinas/Disciplinas";
import Atividades from "./pages/atividades/Atividades";
import Disciplina from "./pages/disciplina_ind/Disciplina";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/disciplina_ind/Disciplina" element={<Disciplina />} />
                    <Route path="/atividades/Atividades" element={<Atividades />} />
                    <Route path="/calendario/Calendario" element={<Calendario />} />
                    <Route path="/disciplinas/Disciplinas" element={<Disciplinas />} />
                    <Route path="/qmsomos/QuemSomos" element={<QuemSomos />} />
                    <Route path="/login/Login" element={<Login />} />
                    <Route path="/registro/Registro" element={<Registro />} />
                    <Route path="/perfil/Perfil" element={<Perfil />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
