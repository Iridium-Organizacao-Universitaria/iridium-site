import React, { useState, useRef, useEffect } from 'react';
import '../../App.css'; // Importa o estilo geral
import './atividade.css';

const Atividade = () => {
    const [atividade, setAtividade] = useState({
        nome: 'Nome da Atividade',
        dataEntrega: '2024-06-26',
        disciplina: 'Nome da Disciplina',
        encerrada: 'não',
        comentarios: 'Nenhum comentário.',
    });
    const [editMode, setEditMode] = useState(false);

    // Referência para o input do nome da atividade
    const nomeInputRef = useRef(null);

    useEffect(() => {
        if (editMode) {
            // Foca no input do nome da atividade quando entrar no modo edição
            nomeInputRef.current.focus();
        }
    }, [editMode]);

    const handleSelect = (option) => {
        if (editMode) {
            setAtividade((prevState) => ({
                ...prevState,
                encerrada: option,
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAtividade((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
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

            <div className="atividade_tudo">
                <div className="info-atv">
                    <div className="info-box-atv">
                        <label>Data de Entrega:</label>
                        {editMode ? (
                            <input
                                type="date"
                                name="dataEntrega"
                                value={atividade.dataEntrega}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{atividade.dataEntrega}</p>
                        )}
                    </div>
                    <div className="info-box-atv">
                        <label>Nome da Atividade:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="nome"
                                value={atividade.nome}
                                onChange={handleChange}
                                ref={nomeInputRef} // Referência para o input do nome da atividade
                                autoFocus // Foca no input automaticamente ao entrar no modo edição
                            />
                        ) : (
                            <p>{atividade.nome}</p>
                        )}
                    </div>
                    <div className="info-box-atv">
                        <label>Nome da Disciplina:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="disciplina"
                                value={atividade.disciplina}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{atividade.disciplina}</p>
                        )}
                    </div>
                    <div className="info-box-atv em_andamento_atv">
                        <label>Atividade Encerrada:</label>
                        <button
                            className={`b_sim_atv ${atividade.encerrada === 'sim' ? 'selected' : ''}`}
                            onClick={() => handleSelect('sim')}
                            disabled={!editMode}
                        >
                            Sim
                        </button>
                        <button
                            className={`b_nao_atv ${atividade.encerrada === 'não' ? 'selected' : ''}`}
                            onClick={() => handleSelect('não')}
                            disabled={!editMode}
                        >
                            Não
                        </button>
                    </div>
                    <div className="info-box-atv">
                        <label>Comentários:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="comentarios"
                                value={atividade.comentarios}
                                onChange={handleChange}
                            />
                        ) : (
                            <p>{atividade.comentarios}</p>
                        )}
                    </div>
                    <button className="b_editar_atv" onClick={toggleEditMode}>
                        {editMode ? 'Salvar' : 'Editar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Atividade;
