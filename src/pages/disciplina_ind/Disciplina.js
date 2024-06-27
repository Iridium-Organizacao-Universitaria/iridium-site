import React, { useState } from 'react';
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

    const [selected, setSelected] = useState(null);

    const handleSelect = (button) => {
        setSelected(button);
    };

    return (
        <div className="h" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
                    <h2>Nome da Disciplina</h2>
                    <div className="info-box">
                        <div className="info_box_ind">
                            <label htmlFor="sigla">Sigla:</label>
                            <p><span id="sigla">MAC0110</span></p>
                        </div>
                        <div className="info_box_ind">
                            <label htmlFor="docente">Docente:</label>
                            <p><span id="docente">meirelles</span></p>
                        </div>
                        <div className="info_box_ind">
                            <label htmlFor="apelido">Apelido:</label>
                            <p><span id="apelido">labmeirelles</span></p>
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
                        <button className="b_delete">Deletar disciplina</button>
                    </div>
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
