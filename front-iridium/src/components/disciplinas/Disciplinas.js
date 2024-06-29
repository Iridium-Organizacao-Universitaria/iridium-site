// src/components/disciplinas/Disciplinas.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './disciplinas.css';

const Disciplinas = () => {
    const navigate = useNavigate();
    const [disciplinas_em_andamento, setDisciplinas] = useState([]);
    const [disciplinaName, setDisciplinaName] = useState('');
    const [docente, setDocente] = useState('');
    const [sigla, setSigla] = useState('');
    const [apelido, setApelido] = useState('');

    useEffect(() => {
        displayAllDisciplinas();
    }, []);

    const handleClick = (disciplinaName) => {
        navigate(`/disciplina_ind/${disciplinaName}`, {
            state: { disciplinaName }
        });
    };

    const handleCreate = () => {
        if (!disciplinaName || !docente || !sigla || !apelido) {
            alert('Por favor, preencha todos os campos para criar a disciplina.');
            return;
        }

        //console.log("teste1 ", disciplinaName, docente, sigla, apelido);

        const newDisciplina = { name: disciplinaName, docente, sigla, apelido };
        sendPOST('/disciplinas', newDisciplina)
            .then(() => navigate(`/disciplina_ind/${disciplinaName}`, {
                state: { disciplinaName }
            }));
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
                        <div className="cria_dis_infos">
                            <label htmlFor="disciplinaName">Nome da Disciplina</label>
                            <input
                                id="disciplinaName"
                                value={disciplinaName}
                                onChange={(e) => setDisciplinaName(e.target.value)}
                            />
                        </div>
                        <div className="cria_dis_infos">
                            <label htmlFor="docente">Docente</label>
                            <input
                                id="docente"
                                value={docente}
                                onChange={(e) => setDocente(e.target.value)}
                            />
                        </div>
                        <div className="cria_dis_infos">
                            <label htmlFor="sigla">Sigla</label>
                            <input
                                id="sigla"
                                value={sigla}
                                onChange={(e) => setSigla(e.target.value)}
                            />
                        </div>
                        <div className="cria_dis_infos">
                            <label htmlFor="apelido">Apelido</label>
                            <input
                                id="apelido"
                                value={apelido}
                                onChange={(e) => setApelido(e.target.value)}
                            />
                        </div>
                        <button onClick={handleCreate}>Criar uma nova disciplina</button>
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
