import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './disciplina.css';
import { getToken } from '../App/useToken';

const Disciplina = () => {
    const userToken = getToken();
    const [tarefas, setTarefas] = useState([]);
    const [provas, setProvas] = useState([]);
    const location = useLocation();
    let { disciplinaName } = useParams();
    const navigate = useNavigate();
    const initialDisciplinaState = {
        name: 'Nome da disciplina',
        sigla: 'Sigla',
        docente: 'Docente',
        apelido: 'Apelido',
        andamento: null,
    };

    const [selected, setSelected] = useState();
    const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
    const [newAtv, setNewAtv] = useState(false);
    const [deleteAtv, setDeleteAtv] = useState(false);
    const [disciplinaState, setDisciplinaState] = useState(initialDisciplinaState);
    const nameInputRef = useRef(null);
    const [novaAtividade, setNovaAtividade] = useState({
        nome: '',
        descricao: '',
        tipo: '',
        prazo: '',
        disciplina: disciplinaName,
        concluido: false,
    });

    useEffect(() => {
        if (location.state && location.state.disciplina) {
            setDisciplinaState(location.state.disciplina);

        } else {
            disciplinaState.name = disciplinaName;
            fetchDisciplina(); // Buscar disciplina com base no nome da URL
        }

    }, [disciplinaName]);


    useEffect(() => {
        fetchAtividades(); // Carregar atividades ao montar o componente
        setNewAtv(false);
        setDeleteAtv(false);
    }, [newAtv, deleteAtv]);

    function fetchAtividadesWithTipo(tipo) {
        return sendGET(`/atividades/byTipo/${tipo}/token?token=${userToken.usuarioId}`);
    }

    const fetchAtividades = () => {
        const tipo_prova = 'Prova';
        const tipo_tarefa = 'Tarefa';

        fetchAtividadesWithTipo(tipo_prova)
            .then(response => {
                if (response) {
                    const filtrados = response.filter(
                        atividade => atividade.disciplina === disciplinaName
                    );
                    setProvas(filtrados);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar provas:', error);
            });

        fetchAtividadesWithTipo(tipo_tarefa)
            .then(response => {
                if (response) {
                    const filtrados = response.filter(
                        atividade => atividade.disciplina === disciplinaName
                    );
                    setTarefas(filtrados);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    };

    const sendPUT = (url, data) => {
        return fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    function sendDELETE(url) {
        return fetch(url, { method: 'DELETE' });
    }

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

    function switchAndamentoDisciplina(name, andamento) {
        sendPUT(`/disciplinas/andamento/${name}/token?token=${userToken.usuarioId}`, {andamento : andamento })
            .then(() => {
                fetchDisciplina();
            })
            .catch(error => {
                console.error('Erro ao alterar status da disciplina:', error);
            });
    }

    function switchDisciplinaSigla(name, sigla) {
        sendPUT(`/disciplinas/sigla/${name}/token?token=${userToken.usuarioId}`, {sigla : sigla})
            .then(() => {
                fetchDisciplina();
            })
            .catch(error => {
                console.error('Erro ao alterar a sigla da disciplina:', error);
            });
    }

    function switchDisciplinaDocente(name, docente) {
        sendPUT(`/disciplinas/docente/${name}/token?token=${userToken.usuarioId}`, { docente :docente })
            .then(() => {
                fetchDisciplina();
            })
            .catch(error => {
                console.error('Erro ao alterar o docente da disciplina:', error);
            });
    }

    function switchDisciplinaApelido(name, apelido) {
        sendPUT(`/disciplinas/apelido/${name}/token?token=${userToken.usuarioId}`, { apelido : apelido })
            .then(() => {
                fetchDisciplina();
            })
            .catch(error => {
                console.error('Erro ao alterar o apelido da disciplina:', error);
            });
    }

    const fetchDisciplina = () => {
        sendGET(`/disciplinas/byName/${disciplinaState.name}/token?token=${userToken.usuarioId}`)
            .then(response => {
                if (response) {
                    setDisciplinaState(prevState => ({
                        name: response.name,
                        sigla: response.sigla,
                        docente: response.docente,
                        apelido: response.apelido,
                        andamento: response.andamento,
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
        setDisciplinaState(prevState => ({
            ...prevState,
            andamento: button,
        }));
    };

    const handleEdit = () => {
        setEditing(true); // Ativa o modo de edição
    };

    const handleSave = () => {
        let disciplinaName = disciplinaState.name;

        switchAndamentoDisciplina(disciplinaState.name, disciplinaState.andamento);
        switchDisciplinaSigla(disciplinaState.name, disciplinaState.sigla);
        switchDisciplinaDocente(disciplinaState.name, disciplinaState.docente);
        switchDisciplinaApelido(disciplinaState.name, disciplinaState.apelido);

        fetchDisciplina();
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
        deleteDisciplina(disciplinaState.name)
            .then(() => {
                navigate(`/disciplinas/Disciplinas`);
            })
            .catch(error => {
                console.error('Erro ao deletar disciplina:', error);
            });
    };

    const deleteDisciplina = (name) => {
        return fetch(`/disciplinas/${name}/token?token=${userToken.usuarioId}`, {
            method: 'DELETE'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaAtividade(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAtividadeClick = (atividadeName) => {
        navigate(`/atividade_ind/${atividadeName}`, {
            state: { atividadeName }
        });
    };

    function deleteAtividade(name) {
        deleteAtividadeWithName(name)
            .then(() => {
                // Redireciona para a página anterior após deletar a atividade
                navigate(`/atividades/Atividades`);
                setDeleteAtv(true);
            })
            .catch(error => {
                console.error('Erro ao deletar atividade:', error);
            });
    }

    function deleteAtividadeWithName(name) {
        return sendDELETE(`/atividades/${name}/token?token=${userToken.usuarioId}`)
    }

    const handleCriarAtividade = async () => {
        // Validar se todos os campos estão preenchidos
        if (!novaAtividade.nome || !novaAtividade.descricao || !novaAtividade.tipo || !novaAtividade.data) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }

        // Preparar os dados da nova atividade com a data formatada
        const novaAtividadeParaEnviar = {
            name: novaAtividade.nome,
            descricao: novaAtividade.descricao,
            tipo: novaAtividade.tipo,
            concluido: false,
            prazo: novaAtividade.data,
            disciplina: disciplinaState.name,
            token: userToken.usuarioId,
        };

        // Enviar os dados da nova atividade para o backend
        try {
            await sendPOST(`/atividades/${userToken.usuarioId}`, novaAtividadeParaEnviar);
            // Limpar o estado da nova atividade após a criação bem-sucedida
            setNovaAtividade({
                name: '',
                descricao: '',
                tipo: '',
                prazo: '',
                concluido: '',
                disciplina: '',
            });

            setNewAtv(true);
            return true;
        } catch (error) {
            console.error('Erro ao criar nova atividade:', error);
            return false;
        }
    };

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

            <div className="disciplina-page">
                <div className="disciplina-info">
                    {/* Modo edição das informações da disciplina */}
                    {editing ? (
                        <>
                            <h2>Editar disciplina</h2>
                            <div className="info-box">
                            <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="nome">Nome:</label>
                                    <p><span id="nome">{disciplinaState.name}</span></p>
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
                                <div className="em_andamento_atv_disc">
                                    <label>Em andamento:</label>
                                    <button
                                        className={`b_sim ${selected === true ? 'selected' : ''}`}
                                        onClick={() => handleSelect(true)}
                                    >
                                        Sim
                                    </button>
                                    <button
                                        className={`b_nao ${selected === false ? 'selected' : ''}`}
                                        onClick={() => handleSelect(false)}
                                    >
                                        Não
                                    </button>
                                </div>
                                <div className="botoes_atv_ind">
                                    <button className="b_save_disc" onClick={handleSave}>Salvar alterações</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{disciplinaState.name}</h2>
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
                                <div className="em_andamento_atv_disc">
                                    <label>Em andamento:</label>
                                    <div className="b_sim_nao">
                                        <button
                                            className={`b_sim ${disciplinaState.andamento === true ? 'selected' : ''}`}
                                            disabled
                                        >
                                            Sim
                                        </button>
                                        <button
                                            className={`b_nao ${disciplinaState.andamento === false ? 'selected' : ''}`}
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
                        <h3>Tarefas ({tarefas.length})</h3>
                        <ul className="atividades-list">
                            {tarefas.map((tarefa, index) => (
                                <li key={index}>
                                    <div className="atividade_button">
                                        <div className="atividade_content">
                                            <div className="atividade_left"
                                                 onClick={() => handleAtividadeClick(tarefa.name)}>
                                                <img src="/imgs/pin.png" alt="pin"/>
                                                <span>{tarefa.name}</span>
                                            </div>
                                            <div className="atividade_right">
                                                <span
                                                    className="data-entrega">{new Date(tarefa.prazo).toLocaleDateString()}</span>
                                                <div>
                                                    <button className="lixo_bnt"
                                                            onClick={() => deleteAtividade(tarefa.name)}>
                                                        <FontAwesomeIcon className="lixo_icone" icon={faTrash}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="provas">
                        <h3>Provas ({provas.length})</h3>
                        <ul className="provas-list">
                        {provas.map((prova, index) => (
                                <li key={index}>
                                    <div className="atividade_button">
                                        <div className="atividade_content">
                                            <div className="atividade_left"
                                                 onClick={() => handleAtividadeClick(prova.name)}>
                                                <img src="/imgs/giz.png" alt="giz"/>
                                                <span> {prova.name}</span>
                                            </div>
                                            <div className="atividade_right">
                                                <span
                                                    className="data-entrega">{new Date(prova.prazo).toLocaleDateString()}</span>
                                                <div>
                                                    <button className="lixo_bnt"
                                                            onClick={() => deleteAtividade(atividade.name)}>
                                                        <FontAwesomeIcon className="lixo_icone" icon={faTrash}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                        ))}
                        </ul>
                    </div>
                    <Popup trigger=
                               {<button className="btn-nova-tarefa">Criar nova atividade</button>}
                           modal nested>
                        {
                            close => (
                                <div className="geral_criar_nova_atv">
                                <div className="criar_nova_atv_div">
                                        <div className="criar_nova_atv">
                                            <div className="criar_nova_atv_inner">
                                                <label htmlFor="novaAtividade_nome">Nome:</label>
                                                <input
                                                    type="text"
                                                    id="novaAtividade_nome"
                                                    name="nome"
                                                    value={novaAtividade.nome}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="criar_nova_atv_inner">
                                                <label htmlFor="novaAtividade_tipo">Tipo:</label>
                                                <select
                                                    id="novaAtividade_tipo"
                                                    name="tipo"
                                                    value={novaAtividade.tipo}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="">Selecione o tipo</option>
                                                    <option value="Tarefa">Tarefa</option>
                                                    <option value="Prova">Prova</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="criar_nova_atv">
                                            <div className="criar_nova_atv_inner">
                                                <label htmlFor="novaAtividade_descricao">Descrição:</label>
                                                <input
                                                    id="novaAtividade_descricao"
                                                    name="descricao"
                                                    value={novaAtividade.descricao}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="criar_nova_atv_inner">
                                                <label htmlFor="novaAtividade_data">Data:</label>
                                                <input
                                                    type="date"
                                                    id="novaAtividade_data"
                                                    name="data"
                                                    value={novaAtividade.data}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn-nova-tarefa_pop_up" onClick={async () => {
                                        const success = await handleCriarAtividade();
                                        if (success === true) {
                                            close();
                                        }
                                    }}>
                                        Criar
                                    </button>
                                </div>
                            )
                        }
                    </Popup>
                </div>
            </div>
        </div>
    );
}

export default Disciplina;