// src/components/criar_disciplina/CriarDisciplina.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
//import './criar_disciplina.css';

const CriarDisciplina = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sigla, setSigla] = useState('');
    const [docente, setDocente] = useState('');
    const [apelido, setApelido] = useState('');

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleSiglaChange = (e) => setSigla(e.target.value);
    const handleDocenteChange = (e) => setDocente(e.target.value);
    const handleApelidoChange = (e) => setApelido(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const novaDisciplina = { nome, sigla, docente, apelido };

        fetch('/disciplinas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaDisciplina)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao criar disciplina');
            })
            .then(data => {
                navigate(`/disciplina_ind/Disciplina`, { state: { disciplina: data, editing: true } });
            })
            .catch(error => console.error('Erro:', error));
    };

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

            <div className="criar_disciplina">
                <h2>Criar Nova Disciplina</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input type="text" value={nome} onChange={handleNomeChange} required />
                    </div>
                    <div>
                        <label>Sigla:</label>
                        <input type="text" value={sigla} onChange={handleSiglaChange} required />
                    </div>
                    <div>
                        <label>Docente:</label>
                        <input type="text" value={docente} onChange={handleDocenteChange} required />
                    </div>
                    <div>
                        <label>Apelido:</label>
                        <input type="text" value={apelido} onChange={handleApelidoChange} required />
                    </div>
                    <button type="submit">Criar Disciplina</button>
                </form>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default CriarDisciplina;
