import React, {useEffect, useRef, useState} from 'react';
import '../../App.css'; // Importa o estilo geral
import './disciplina.css'; // Importa os estilos específicos da página

const Disciplina = () => {
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

    const [selected, setSelected] = useState('sim'); // Valor inicial como 'sim'
    const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
    const [disciplina, setDisciplina] = useState({
        nome: 'Nome da disciplina',
        sigla: 'Sigla',
        docente: 'Docente',
        apelido: 'Apelido',
        emAndamento: 'sim', // Exemplo de valor inicial
    });

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (editing) {
            // Foca no input do nome quando entrar no modo edição
            nameInputRef.current.focus();
        }
    }, [editing]);

    const handleSelect = (button) => {
        setSelected(button);
        setDisciplina((prevState) => ({
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
        setDisciplina(prevState => ({
            ...prevState,
            [name]: value,
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

            <div className="disciplina-page">
                <div className="disciplina-info">
                    {/*Modo edição das informações da disciplina*/}
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
                                        value={disciplina.nome}
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
                                        value={disciplina.sigla}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="docente">Docente:</label>
                                    <input
                                        type="text"
                                        id="docente"
                                        name="docente"
                                        value={disciplina.docente}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={`info_box_ind ${editing ? 'edit-mode-disc' : ''}`}>
                                    <label htmlFor="apelido">Apelido:</label>
                                    <input
                                        type="text"
                                        id="apelido"
                                        name="apelido"
                                        value={disciplina.apelido}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="em_andamento">
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
                            <h2>{disciplina.nome}</h2>
                            <div className="info-box">
                                <div className="info_box_ind">
                                    <label htmlFor="sigla">Sigla:</label>
                                    <p><span id="sigla">{disciplina.sigla}</span></p>
                                </div>
                                <div className="info_box_ind">
                                    <label htmlFor="docente">Docente:</label>
                                    <p><span id="docente">{disciplina.docente}</span></p>
                                </div>
                                <div className="info_box_ind">
                                    <label htmlFor="apelido">Apelido:</label>
                                    <p><span id="apelido">{disciplina.apelido}</span></p>
                                </div>
                                <div className="em_andamento">
                                    <label>Em andamento:</label>
                                    <div className="b_sim_nao">
                                        <button
                                            className={`b_sim ${disciplina.emAndamento === 'sim' ? 'selected' : ''}`}
                                            disabled
                                        >
                                            Sim
                                        </button>
                                        <button
                                            className={`b_nao ${disciplina.emAndamento === 'nao' ? 'selected' : ''}`}
                                            disabled
                                        >
                                            Não
                                        </button>
                                    </div>
                                </div>
                                <div className="botoes">
                                    <button className="b_edita-dis" onClick={handleEdit}>Editar disciplina</button>
                                    <button className="b_delete-dis">Deletar disciplina</button>
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
