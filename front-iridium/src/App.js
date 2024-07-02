// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import QuemSomos from './components/qmsomos/QuemSomos';
import Login from './components/login/Login';
import Registro from './components/registro/Registro';
import Perfil from './components/perfil/Perfil';
import Disciplinas from "./components/disciplinas/Disciplinas";
import Atividades from "./components/atividades/Atividades";
import Disciplina from "./components/disciplina_ind/Disciplina";
import Atividade from "./components/atividade_ind/Atividade";
import useToken from './components/App/useToken';

const AuthChecker = () => {
    const { token, setToken } = useToken();
    const location = useLocation();

    if((!token) && location.pathname !== '/registro/Registro' && location.pathname !== '/') {
        return <Login setToken={setToken} />;
    }

    return (
        <Routes>
            <Route path="/atividade_ind/:atividadeName" element={<Atividade token={token}/>} />
            <Route path="/disciplina_ind/:disciplinaName" element={<Disciplina token={token}/>} />
            <Route path="/atividades/Atividades" element={<Atividades token={token}/>} />
            <Route path="/disciplinas/Disciplinas" element={<Disciplinas token={token}/>} />
            <Route path="/login/Login" element={<Login setToken={setToken}/>} />
            <Route path="/registro/Registro" element={<Registro />} />
            <Route path="/perfil/Perfil" element={<Perfil token={token}/>} />
            <Route path="/" element={<QuemSomos />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <AuthChecker />
            </div>
        </Router>
    );
}

// function App() {
//     const { token, setToken } = useToken();
//     const location = useLocation();
//
//     // console.log("Token = ", token);
//     if (!token && location.pathname !== '/registro/Registro') {
//         return <Login setToken={setToken} />;
//     }
//
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route path="/atividade_ind/:atividadeName" element={<Atividade />} />
//                     <Route path="/disciplina_ind/:disciplinaName" element={<Disciplina />} />
//                     <Route path="/atividades/Atividades" element={<Atividades />} />
//                     <Route path="/disciplinas/Disciplinas" element={<Disciplinas />} />
//                     <Route path="/login/Login" element={<Login />} />
//                     <Route path="/registro/Registro" element={<Registro />} />
//                     <Route path="/perfil/Perfil" element={<Perfil />} />
//                     <Route path="/" element={<QuemSomos />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

export default App;
