import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import './disciplina.css';

const Disciplina = () => {
    // dados de exemplo só para testar o front
    const [atividades, setAtividades] = useState([
        { nome: 'Atividade 1', dataEntrega: '22/06/2024' },
        { nome: 'Atividade 2', dataEntrega: '25/06/2024' },
        { nome: 'Atividade 3', dataEntrega: '22/06/2024' },
        { nome: 'Atividade 4', dataEntrega: '25/06/2024' },
        { nome: 'Atividade 5', dataEntrega: '22/06/2024' },
        { nome: 'Atividade 6', dataEntrega: '25/06/2024' },
    ]);

    const [provas, setProvas] = useState([
        { nome: 'Prova 1', dataEntrega: '15/07/2024' },
        { nome: 'Prova 2', dataEntrega: '17/08/2024' },
        { nome: 'Prova 3', dataEntrega: '15/07/2024' },
        { nome: 'Prova 4', dataEntrega: '17/08/2024' },
        { nome: 'Prova 5', dataEntrega: '15/07/2024' },
        { nome: 'Prova 6', dataEntrega: '17/08/2024' },
        { nome: 'Prova 7', dataEntrega: '15/07/2024' },
        { nome: 'Prova 8', dataEntrega: '17/08/2024' },
        { nome: 'Prova 9', dataEntrega: '15/07/2024' },
        { nome: 'Prova 10', dataEntrega: '17/08/2024' },
    ]);

    const location = useLocation();
    const { disciplinaName } = useParams();
    const navigate = useNavigate();
    const initialDisciplinaState = {
        nome: 'Nome da disciplina',
        sigla: 'Sigla',
        docente: 'Docente',
        apelido: 'Apelido',
        emAndamento: 'sim', // Exemplo de valor inicial
    };

    const [selected, setSelected] = useState('sim'); // Valor inicial como 'sim'
    const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
    const [disciplinaState, setDisciplinaState] = useState(initialDisciplinaState);
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.disciplina) {
            setDisciplinaState(location.state.disciplina);

        } else {
            fetchDisciplina(); // Buscar disciplina com base no nome da URL
        }

    }, [disciplinaName]);

    const sendGET = (url) => {
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao buscar disciplina');
            })
            .catch(error => {
                console.error('Erro ao buscar disciplina:', error);
                return null;
            });
    };

    const fetchDisciplina = () => {
        sendGET(`/disciplinas/byName/${disciplinaName}`)
            .then(response => {
                if (response) {
                    setDisciplinaState(prevState => ({
                        ...prevState,
                        nome: response.name,
                        sigla: response.sigla,
                        docente: response.docente,
                        apelido: response.apelido,
                        // quando isto estiver implementado, arrumar
                        //emAndamento: response.emAndamento,
                    }));
                } else {
                    console.log('Disciplina não encontrada');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar disciplina:', error);
            });
    };

    const handleSelect = (button) => {
        setSelected(button);
        setDisciplinaState((prevState) => ({
            ...prevState,
            emAndamento: button,
        }));
    };

    const handleEdit = () => {
        setEditing(true); // Ativa o modo de edição
    };

    const handleSave = () => {
        // Aqui você pode implementar a lógica para salvar as alterações
        setEditing(false); // Desativa o modo de edição
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDisciplinaState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        deleteDisciplina(disciplinaState.nome)
            .then(() => {
                navigate(`/disciplinas/Disciplinas`);
            })
            .catch(error => {
                console.error('Erro ao deletar disciplina:', error);
            });
    };

    const deleteDisciplina = (name) => {
        return fetch(`/disciplinas/${name}`, {
            method: 'DELETE'
        });
    };

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
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

            <div className="disciplina-page">
                <div className="disciplina-info">
                    {/* Modo edição das informações da disciplina */}
                    {editing ? (
                        <>
                            <h2>Editar disciplina</h2>
                            <div className="info-box">
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="nome">Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={disciplinaState.nome}
                                        onChange={handleChange}
                                        ref={nameInputRef}
                                        autoFocus
                                    />
                                </div>
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="sigla">Sigla:</label>
                                    <input
                                        type="text"
                                        id="sigla"
                                        name="sigla"
                                        value={disciplinaState.sigla}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="docente">Docente:</label>
                                    <input
                                        type="text"
                                        id="docente"
                                        name="docente"
                                        value={disciplinaState.docente}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="apelido">Apelido:</label>
                                    <input
                                        type="text"
                                        id="apelido"
                                        name="apelido"
                                        value={disciplinaState.apelido}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="em_andamento_atv">
                                    <label>Em andamento:</label>
                                    <button
                                        className={`b_sim ${selected === 'sim' ? 'selected' : ''}`}
                                        onClick={() => handleSelect('sim')}
                                    >
                                        Sim
                                    </button>
                                    <button
                                        className={`b_nao ${selected === 'nao' ? 'selected' : ''}`}
                                        onClick={() => handleSelect('nao')}
                                    >
                                        Não
                                    </button>
                                </div>
                                <div className="botoes">
                                    <button className="b_save_disc" onClick={handleSave}>Salvar alterações</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{disciplinaState.nome}</h2>
                            <div className="info-box">
                                <div className="info_box_ind">
                                    <label htmlFor="sigla">Sigla:</label>
                                    <p><span id="sigla">{disciplinaState.sigla}</span></p>
                                </div>
                                <div className="info_box_ind">
                                    <label htmlFor="docente">Docente:</label>
                                    <p><span id="docente">{disciplinaState.docente}</span></p>
                                </div>
                                <div className="info_box_ind">
                                    <label htmlFor="apelido">Apelido:</label>
                                    <p><span id="apelido">{disciplinaState.apelido}</span></p>
                                </div>
                                <div className="em_andamento_atv">
                                    <label>Em andamento:</label>
                                    <div className="b_sim_nao">
                                        <button
                                            className={`b_sim ${disciplinaState.emAndamento === 'sim' ? 'selected' : ''}`}
                                            disabled
                                        >
                                            Sim
                                        </button>
                                        <button
                                            className={`b_nao ${disciplinaState.emAndamento === 'nao' ? 'selected' : ''}`}
                                            disabled
                                        >
                                            Não
                                        </button>
                                    </div>
                                </div>
                                <div className="botoes">
                                    <button className="b_edita-dis" onClick={handleEdit}>Editar disciplina</button>
                                    <button className="b_delete-dis" onClick={handleDelete}>Deletar disciplina</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="atv_pro">
                    <div className="atividades">
                        <h3>Atividades</h3>
                        <ul className="atividades-list">
                            {atividades.map((atividade, index) => (
                                <li key={index}>
                                    <span><img src="/imgs/pin.png" alt="pin"/> {atividade.nome}</span>
                                    <span className="data-entrega">{atividade.dataEntrega}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn-nova-atividade">Criar nova atividade</button>
                    </div>
                    <div className="provas">
                        <h3>Provas</h3>
                        <ul className="provas-list">
                            {provas.map((prova, index) => (
                                <li key={index}>
                                    <span><img src="/imgs/giz.png" alt="giz"/> {prova.nome}</span>
                                    <span className="data-entrega">{prova.dataEntrega}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn-nova-prova">Criar nova prova</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Disciplina;
