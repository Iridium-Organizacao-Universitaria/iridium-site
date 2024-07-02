import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import './atividade.css';
import { getToken } from '../App/useToken';

const Atividade = () => {
    const userToken = getToken();
    const location = useLocation();
    const { atividadeName: paramAtividadeName } = useParams(); // Renomeia para paramAtividadeName
    const [atividadeName, setAtividadeName] = useState(''); // Renomeia para atividadeName
    const navigate = useNavigate();
    const [DisciplinasAll, setDisciplinasAll] = useState([]);
    const initialAtividadeState = {
        name: '',
        descricao: '',
        tipo: '',
        prazo: '',
        concluido: '',
        disciplina: ''
    };

    const [atividadeState, setAtividadeState] = useState(initialAtividadeState);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (paramAtividadeName) {
            setAtividadeName(paramAtividadeName); // Define atividadeName com base nos parâmetros da URL
        }
    }, [paramAtividadeName]);

    useEffect(() => {
        if (location.state && location.state.atividade) {
            setAtividadeState(location.state.atividade);
        } else {
            fetchAtividade(atividadeName); // Passa atividadeName para buscar a atividade correta
            fetchAllDisciplinas().then(setDisciplinasAll);
        }

    }, [atividadeName]);

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    const sendGET = (url) => {
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao buscar atividade');
            })
            .catch(error => {
                console.error('Erro ao buscar atividade:', error);
                return null;
            });
    };

    function sendDELETE(url) {
        return fetch(url, {
            method: "DELETE"
        });
    }

    const sendPUT = (url, data) => {
        return fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

    function fetchAllDisciplinas() {
        return sendGET(`/disciplinas/${userToken}`);
    }

    const fetchAtividade = (atividadeName) => { // Recebe atividadeName como parâmetro
        while(atividadeName === undefined){

        }
        sendGET(`/atividades/byName/${atividadeName}/${userToken}`)
            .then(response => {
                if (response) {
                    setAtividadeState({
                        name: response.name,
                        descricao: response.descricao,
                        tipo: response.tipo,
                        prazo: response.prazo,
                        concluido: response.concluido,
                        disciplina: response.disciplina
                    });
                } else {
                    console.log('Atividade não encontrada');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar atividade:', error);
            });
    };

    function deleteAtividade(name) {
        deleteAtividadeWithName(name)
            .then(() => {
                // Redireciona para a página anterior após deletar a atividade
                navigate(`/atividades/Atividades/${userToken}`);
            })
            .catch(error => {
                console.error('Erro ao deletar atividade:', error);
            });
    }

    function deleteAtividadeWithName(name) {
        return sendDELETE(`/atividades/${name}/${userToken}`)
    }

    function switchAtividadePrazo(name, prazo) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/prazo/${name}/${userToken}`, {prazo: prazo})
                .then(() => {
                    fetchAtividade(name); // Atualiza a atividade específica
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar o prazo da atividade:', error);
                    reject(error);
                });
        });
    }

    function switchAtividadeTipo(name, tipo) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/tipo/${name}/${userToken}`, {tipo: tipo})
                .then(() => {
                    fetchAtividade(name); // Atualiza a atividade específica
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar o tipo da atividade:', error);
                    reject(error);
                });
        });
    }

    function switchAtividadeDisciplina(name, disciplina) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/disciplina/${name}/${userToken}`, {disciplina: disciplina})
                .then(() => {
                    fetchAtividade(name); // Atualiza a atividade específica
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar a disciplina da atividade:', error);
                    reject(error);
                });
        });
    }

    function switchAtividadeDescricao(name, descricao) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/descricao/${name}/${userToken}`, {descricao: descricao})
                .then(() => {
                    fetchAtividade(name); // Atualiza a atividade específica
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar a descrição da atividade:', error);
                    reject(error);
                });
        });
    }

    function switchAtividadeName(name, newName) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/name/${name}/${userToken}`, {newName: newName})
                .then(() => {
                    fetchAtividade(newName); // Atualiza a atividade com o novo nome
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar o nome da atividade:', error);
                    reject(error);
                });
        });
    }

    function switchAtividadeConcluido(name, concluido) {
        return new Promise((resolve, reject) => {
            sendPUT(`/atividades/concluido/${name}/${userToken}`, {concluido: concluido})
                .then(() => {
                    fetchAtividade(name); // Atualiza a atividade específica
                    resolve();
                })
                .catch(error => {
                    console.error('Erro ao alterar a conclusão da atividade:', error);
                    reject(error);
                });
        });
    }

    const handleEdit = () => {
        setEditing(true); // Ativa o modo de edição
    };

    const handleSave = async () => {
        try {
            // Primeiro, execute todas as operações de atualização
            await Promise.all([
                switchAtividadePrazo(atividadeName, atividadeState.prazo),
                switchAtividadeTipo(atividadeName, atividadeState.tipo),
                switchAtividadeDescricao(atividadeName, atividadeState.descricao),
                switchAtividadeDisciplina(atividadeName, atividadeState.disciplina),
                switchAtividadeConcluido(atividadeName, atividadeState.concluido)
            ]);

            // ta mudando o nome de forma correta mas faz aparecer uns erro no console.log
            // Depois de todas as atualizações, mude o nome da atividade
            await switchAtividadeName(atividadeName, atividadeState.name);

            setEditing(false); // Aqui, apenas desativa o modo de edição localmente
            fetchAtividade(atividadeState.name); // Atualiza a atividade com o novo nome

            return atividadeState.name; // Retorna o novo nome da atividade
        } catch (error) {
            console.error('Erro ao salvar atividade:', error);
            throw error; // Lança o erro novamente para quem chamou a função handleSave
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAtividadeState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelect = (value) => {
        setAtividadeState(prevState => ({
            ...prevState,
            concluido: value
        }));
    };

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href={`/disciplinas/Disciplinas/${userToken}`}>Disciplinas</a>
                    <p> | </p>
                    <a href={`/atividades/Atividades/${userToken}`}>Atividades</a>
                    <p> | </p>
                    <a href={`/perfil/Perfil/${userToken}`}>Perfil</a>
                </nav>
            </header>

            <div className="atividade-page">
                <div className="atividade-info">
                    {editing ? (
                        <>
                            <h2>Editar Atividade</h2>
                            <div className="info_box_atv_ind">
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="nome">Nome:</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="name"
                                        value={atividadeState.name}
                                        onChange={handleChange}
                                        autoFocus
                                    />
                                </div>
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="descricao">Descrição:</label>
                                    <input
                                        type="text"
                                        id="descricao"
                                        name="descricao"
                                        value={atividadeState.descricao}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="tipo">Tipo:</label>
                                    <select
                                        id="tipo"
                                        name="tipo"
                                        value={atividadeState.tipo}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione o tipo</option>
                                        <option value="Tarefa">Tarefa</option>
                                        <option value="Prova">Prova</option>
                                    </select>
                                </div>
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="disciplina">Disciplina:</label>
                                    <select
                                        id="disciplina"
                                        name="disciplina"
                                        value={atividadeState.disciplina}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione a disciplina</option>
                                        {DisciplinasAll.map((disciplina, index) => (
                                            <option key={index} value={disciplina.name}>{disciplina.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="data">Data:</label>
                                    <input
                                        type="date"
                                        id="data"
                                        name="prazo"
                                        value={atividadeState.prazo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="info-box-atv em_andamento_atv">
                                    <label>Atividade concluída:</label>
                                    <button
                                        className={`b_sim_atv ${atividadeState.concluido === true ? 'selected' : ''}`}
                                        onClick={() => handleSelect(true)}
                                        disabled={!editing}
                                    >
                                        Sim
                                    </button>
                                    <button
                                        className={`b_nao_atv ${atividadeState.concluido === false ? 'selected' : ''}`}
                                        onClick={() => handleSelect(false)}
                                        disabled={!editing}
                                    >
                                        Não
                                    </button>
                                </div>
                                <div className="botoes_atv_ind">
                                    <button
                                        className="b_save_atv_ind"
                                        onClick={async () => {
                                            const newName = await handleSave();
                                            setAtividadeName(newName);
                                        }}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2>{atividadeState.name}</h2>
                            <div className="info_box_atv_ind">
                                <div className="info_box_atv_ind_inner">
                                    <label htmlFor="descricao">Descrição:</label>
                                    <p><span id="descricao">{atividadeState.descricao}</span></p>
                                </div>
                                <div className="info_box_atv_ind_inner">
                                    <label htmlFor="tipo">Tipo:</label>
                                    <p><span id="tipo">{atividadeState.tipo}</span></p>
                                </div>
                                <div className="info_box_atv_ind_inner">
                                    <label htmlFor="disciplina">Disciplina:</label>
                                    <p><span id="disciplina">{atividadeState.disciplina}</span></p>
                                </div>
                                <div className="info_box_atv_ind_inner">
                                    <label htmlFor="data">Data:</label>
                                    <p><span id="data">{atividadeState.prazo}</span></p>
                                </div>
                                <div className="info-box-atv em_andamento_atv">
                                    <label>Atividade concluída:</label>
                                    <button
                                        className={`b_sim_atv ${atividadeState.concluido === true ? 'selected' : ''}`}
                                        disabled
                                    >
                                        Sim
                                    </button>
                                    <button
                                        className={`b_nao_atv ${atividadeState.concluido === false ? 'selected' : ''}`}
                                        disabled
                                    >
                                        Não
                                    </button>
                                </div>
                                <div className="botoes">
                                    <button className="b_edita_atv_ind" onClick={handleEdit}>Editar atividade</button>
                                    <button className="b_delete_atv_ind"
                                            onClick={() => deleteAtividade(atividadeState.name)}>Deletar atividade
                                    </button>

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Atividade;
