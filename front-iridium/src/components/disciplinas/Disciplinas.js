// src/components/disciplinas/Disciplinas.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './disciplinas.css';

const Disciplinas = () => {
    const navigate = useNavigate();
    const [disciplinas_em_andamento, setDisciplinas] = useState([]);

    // Toda fez que a página e carregada, isto é renderizado antes de completar o carregamento
    useEffect(() => {
        displayAllDisciplinas();
    });

    const handleClick = (disciplinaName) => {
        navigate(`/disciplina_ind/${disciplinaName}`, {
            state: { disciplinaName }
        });
    };

    function sendGET(url) {
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => response.ok ? response.json() : []);
    }

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    function sendDELETE(url) {
        return fetch(url, { method: 'DELETE' });
    }

    function displayAllDisciplinas() {
        fetchAllDisciplinas().then(setDisciplinas);
    }

    function deleteDisciplina(name) {
        deleteDisciplinaWithName(name).then(displayAllDisciplinas);
    }

    function deleteDisciplinaWithName(name) {
        return sendDELETE(`/disciplinas/${name}`);
    }

    function fetchAllDisciplinas() {
        return sendGET("/disciplinas");
    }

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/disciplinas/Disciplinas">Disciplinas</a>
                    <p> | </p>
                    <a href="/atividades/Atividades">Atividades</a>
                    <p> | </p>
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
                </nav>
            </header>

            <div className="disciplinas_tudo">
                <h2 className="title_dis">Disciplinas</h2>
                <div className="container_dis">
                    <div className="criar_btn">
                        <a href="/atividade_ind/Atividade">oie</a>
                        <button onClick={() => navigate('/criar_disciplina')}>Criar uma nova disciplina</button>
                    </div>
                    <div className="disc_atu">
                        <h3>Disciplinas em andamento ({disciplinas_em_andamento.length})</h3>
                        <div className="disciplinas_andamento">
                            {disciplinas_em_andamento.map((disciplina, index) => (
                                <button
                                    key={index}
                                    className="botao_disciplina"
                                    onClick={() => handleClick(disciplina.name)}
                                >
                                    {disciplina.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="disc_ant">
                        <h3>Disciplinas de semestres anteriores</h3>
                        <div className="disciplinas_passadas">
                            {Array.from({ length: 30 }, (_, index) => (
                                <button
                                    key={index}
                                    className="botao_disciplina"
                                    onClick={() => handleClick(`Disciplina ${index + 16}`)}
                                >
                                    Disciplina {index + 16}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Disciplinas;
