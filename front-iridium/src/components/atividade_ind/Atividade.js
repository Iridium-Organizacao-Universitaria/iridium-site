import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import '../../App.css';
import './atividade.css';

const Atividade = () => {
    const location = useLocation();
    const { atividadeName } = useParams();
    const navigate = useNavigate();

    const initialAtividadeState = {
        name: '',
        descricao: '',
        tipo: '',
        prazo: '',
        concluido: ''
    };

    const [atividadeState, setAtividadeState] = useState(initialAtividadeState);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (location.state && location.state.atividade) {
            setAtividadeState(location.state.atividade);
        } else {
            fetchAtividade(); // Buscar atividade com base no nome da URL
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

    const fetchAtividade = () => {
        sendGET(`/atividades/byName/${atividadeName}`)
            .then(response => {
                if (response) {
                    setAtividadeState({
                        name: response.name,
                        descricao: response.descricao,
                        tipo: response.tipo,
                        prazo: response.prazo,
                        concluido: response.concluido
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
                navigate('/atividades/Atividades');
            })
            .catch(error => {
                console.error('Erro ao deletar atividade:', error);
            });
    }

    function deleteAtividadeWithName(name) {
        return sendDELETE(`/atividades/${name}`)
    }

    const handleEdit = () => {
        setEditing(true); // Ativa o modo de edição
    };

    const handleSave = () => {
        // Aqui você poderia implementar a lógica para salvar as alterações no backend
        // Exemplo:
        // sendPOST(`/atividades/${atividadeState.nome}`, atividadeState)
        //     .then(() => {
        //         setEditing(false); // Desativa o modo de edição após salvar
        //     })
        //     .catch(error => {
        //         console.error('Erro ao salvar atividade:', error);
        //     });
        setEditing(false); // Aqui, apenas desativa o modo de edição localmente
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
                    <a href="/disciplinas/Disciplinas">Disciplinas</a>
                    <p> | </p>
                    <a href="/atividades/Atividades">Atividades</a>
                    <p> | </p>
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
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
                                        name="nome"
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
                                    <input
                                        type="text"
                                        id="tipo"
                                        name="tipo"
                                        value={atividadeState.tipo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="info_box_atv_ind_inner edit-mode">
                                    <label htmlFor="data">Data:</label>
                                    <input
                                        type="date"
                                        id="data"
                                        name="data"
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
                                    <button className="b_save_atv_ind" onClick={handleSave}>Salvar</button>
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
                                    <label htmlFor="data">Data:</label>
                                    <p><span id="data">{atividadeState.prazo}</span></p>
                                </div>
                                <div className="info_box_atv_inner em_andamento_atv">
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
