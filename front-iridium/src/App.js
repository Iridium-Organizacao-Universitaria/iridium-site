// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import QuemSomos from './components/qmsomos/QuemSomos';
import Login from './components/login/Login';
import Registro from './components/registro/Registro';
import Perfil from './components/perfil/Perfil';
import Calendario from "./components/calendario/Calendario";
import Disciplinas from "./components/disciplinas/Disciplinas";
import Atividades from "./components/atividades/Atividades";
import Disciplina from "./components/disciplina_ind/Disciplina";
import Atividade from "./components/atividade_ind/Atividade";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/atividade_ind/:atividadeName" element={<Atividade />} />
                    <Route path="/disciplina_ind/:disciplinaName" element={<Disciplina />} />
                    <Route path="/atividades/Atividades" element={<Atividades />} />
                    <Route path="/disciplinas/Disciplinas" element={<Disciplinas />} />
                    <Route path="/login/Login" element={<Login />} />
                    <Route path="/registro/Registro" element={<Registro />} />
                    <Route path="/perfil/Perfil" element={<Perfil />} />
                    <Route path="/" element={<QuemSomos />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
