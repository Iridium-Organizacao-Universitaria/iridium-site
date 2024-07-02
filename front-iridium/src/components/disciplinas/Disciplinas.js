import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './disciplinas.css';
import { getToken } from '../App/useToken';

const Disciplinas = () => {
    const userToken = getToken();
    const navigate = useNavigate();
    const [disciplinas_all, setDisciplinasAll] = useState([]);
    const [disciplinas_em_andamento, setDisciplinasAndamento] = useState([]);
    const [disciplinas_passadas, setDisciplinasPassadas] = useState([]);
    const [disciplinaName, setDisciplinaName] = useState('');
    const [docente, setDocente] = useState('');
    const [sigla, setSigla] = useState('');
    const [apelido, setApelido] = useState('');

    useEffect(() => {
        displayAllDisciplinas();
        displayDisciplinasWithAndamento();
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

        const newDisciplina = {
            name: disciplinaName,
            docente: docente,
            sigla: sigla,
            apelido: apelido,
            andamento: true,
            token: userToken.usuarioId,
        };
        sendPOST(`/disciplinas`, newDisciplina)
            .then(() => navigate(`/disciplina_ind/${disciplinaName}`, {
                state: {disciplinaName}
            }));
    };

    function sendGET(url) {
        console.log(url)
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

    function displayDisciplinasWithAndamento() {
        //const andamento = readDisciplinaAndamento();
        const andamento_true = 'true';
        const andamento_false = 'false';
        fetchDisciplinasWithAndamento(andamento_true).then(setDisciplinasAndamento)
        fetchDisciplinasWithAndamento(andamento_false).then(setDisciplinasPassadas)
    }

    function readDisciplinaAndamento() {
        return document.andamentoForm.andamento.value
    }

    function fetchDisciplinasWithAndamento(andamento) {
        return sendGET(`/disciplinas/byAndamento/${andamento}/token?token=${userToken.usuarioId}`);
    }

    function displayAllDisciplinas() {
        fetchAllDisciplinas().then(setDisciplinasAll);
    }

    function deleteDisciplina(name) {
        deleteDisciplinaWithName(name).then(displayAllDisciplinas);
    }

    function deleteDisciplinaWithName(name) {
        return sendDELETE(`/disciplinas/${name}/${userToken.usuarioId}`);
    }

    function fetchAllDisciplinas() {
        return sendGET(`/disciplinas/token?token=${userToken.usuarioId}`);
    }

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href={`/disciplinas/Disciplinas`}>Disciplinas</a>
                    <p> | </p>
                    <a href={`/atividades/Atividades`}>Atividades</a>
                    <p> | </p>
                    <a href={`/perfil/Perfil`}>Perfil</a>
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
                        <h3>Disciplinas de semestres anteriores ({disciplinas_passadas.length})</h3>
                        <div className="disciplinas_passadas">
                            {disciplinas_passadas.map((disciplina, index) => (
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
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Disciplinas;
