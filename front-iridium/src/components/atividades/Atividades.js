// Atividades.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './atividades.css';

const Atividades = () => {
    const [atividades, setAtividades] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroData, setFiltroData] = useState('Hoje');
    const [filtroConclusao, setFiltroConclusao] = useState('Todos');
    const [tipoMenuOpen, setTipoMenuOpen] = useState(false);
    const [dataMenuOpen, setDataMenuOpen] = useState(false);
    const [conclusaoMenuOpen, setConclusaoMenuOpen] = useState(false);
    const tipoMenuRef = useRef(null);
    const dataMenuRef = useRef(null);
    const conclusaoMenuRef = useRef(null);
    const [atividadesFiltradas, setAtividadesFiltradas] = useState([]);
    const navigate = useNavigate(); // Usando useNavigate para navegação programática
    const [novaAtividade, setNovaAtividade] = useState({
        nome: '',
        descricao: '',
        tipo: '',
        data: '',
    });

    const tipos = ['Todos', 'Provas', 'Tarefas'];
    const datas = ['Hoje', '1 semana', '1 mês', 'Todas'];
    const conclusoes = ['Todos', 'Concluídas', 'Não Concluídas'];

    useEffect(() => {
        fetchAllAtividades().then(setAtividades);
        // Adicionar event listener para fechar menus ao clicar fora
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const atividadesFiltradas = filterAtividades(atividades);
        setAtividadesFiltradas(atividadesFiltradas);
    }, [atividades, filtroTipo, filtroData, filtroConclusao]);

    const fetchAllAtividades = () => {
        return sendGET("/atividades");
    };

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

    const sendGET = (url) => {
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => response.ok ? response.json() : []);
    };

    const handleClickOutside = (event) => {
        if (tipoMenuRef.current && !tipoMenuRef.current.contains(event.target)) {
            setTipoMenuOpen(false);
        }
        if (dataMenuRef.current && !dataMenuRef.current.contains(event.target)) {
            setDataMenuOpen(false);
        }
        if (conclusaoMenuRef.current && !conclusaoMenuRef.current.contains(event.target)) {
            setConclusaoMenuOpen(false);
        }
    };

    const handleTipoChange = (tipo) => {
        setFiltroTipo(tipo);
        setTipoMenuOpen(false);
    };

    const handleDataChange = (data) => {
        setFiltroData(data);
        setDataMenuOpen(false);
    };

    const handleConclusaoChange = (conclusao) => {
        setFiltroConclusao(conclusao);
        setConclusaoMenuOpen(false);
    };

    const filterAtividades = (atividades) => {
        let filtroTipoCorrigido = filtroTipo;

        if (filtroTipo === 'Provas') {
            filtroTipoCorrigido = 'Prova';
        } else if (filtroTipo === 'Tarefas') {
            filtroTipoCorrigido = 'Tarefa';
        }

        return atividades.filter(atividade => {
            let filtroTipoPass = true;
            if (filtroTipoCorrigido !== 'Todos') {
                filtroTipoPass = atividade.tipo === filtroTipoCorrigido;
            }

            let filtroDataPass = true;
            if (filtroData === 'Hoje') {
                const hoje = new Date().toLocaleDateString();
                filtroDataPass = new Date(atividade.prazo).toLocaleDateString() === hoje;
            } else if (filtroData === '1 semana') {
                const umaSemana = new Date();
                umaSemana.setDate(umaSemana.getDate() + 7);
                filtroDataPass = new Date(atividade.prazo) <= umaSemana;
            } else if (filtroData === '1 mês') {
                const umMes = new Date();
                umMes.setMonth(umMes.getMonth() + 1);
                filtroDataPass = new Date(atividade.prazo) <= umMes;
            }

            let filtroConclusaoPass = true;
            if (filtroConclusao === 'Concluídas') {
                filtroConclusaoPass = atividade.concluido;
            } else if (filtroConclusao === 'Não Concluídas') {
                filtroConclusaoPass = !atividade.concluido;
            }

            return filtroTipoPass && filtroDataPass && filtroConclusaoPass;
        });
    };

    const handleAtividadeClick = (atividadeName) => {
        navigate(`/atividade_ind/${atividadeName}`, {
            state: { atividadeName }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovaAtividade(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCriarAtividade = () => {
        // Validar se todos os campos estão preenchidos
        if (!novaAtividade.nome || !novaAtividade.descricao || !novaAtividade.tipo || !novaAtividade.data) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Preparar os dados da nova atividade com a data formatada
        const novaAtividadeParaEnviar = {
            name: novaAtividade.nome,
            descricao: novaAtividade.descricao,
            tipo: novaAtividade.tipo,
            concluido: false,
            prazo: novaAtividade.data
        };

        // Enviar os dados da nova atividade para o backend
        sendPOST("/atividades", novaAtividadeParaEnviar)
            .then(() => {
                // Limpar o estado da nova atividade após a criação bem-sucedida
                setNovaAtividade({
                    nome: '',
                    descricao: '',
                    tipo: '',
                    data: '',
                });

                fetchAllAtividades().then(setAtividades)
            })
            .catch(error => {
                console.error('Erro ao criar nova atividade:', error);
            });
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
                    <a href="/atividades">Atividades</a>
                    <p> | </p>
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
                </nav>
            </header>

            <div className="atividades_tudo">
                <h2 className="title_atvs">Atividades</h2>
                <div className="nova_atv_2">
                    <div className="criar_nova_atv_inner2">
                        <label htmlFor="novaAtividade_nome">Nome:</label>
                        <input
                            type="text"
                            id="novaAtividade_nome"
                            name="nome"
                            value={novaAtividade.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="criar_nova_atv_inner2">
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
                    <div className="criar_nova_atv_inner2">
                        <label htmlFor="novaAtividade_descricao">Descrição:</label>
                        <input
                            id="novaAtividade_descricao"
                            name="descricao"
                            value={novaAtividade.descricao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="criar_nova_atv_inner2">
                        <label htmlFor="novaAtividade_data">Data:</label>
                        <input
                            type="date"
                            id="novaAtividade_data"
                            name="data"
                            value={novaAtividade.data}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="btn-nova-tarefa2" onClick={handleCriarAtividade}>Criar nova atividade</button>

                </div>
                <div className="topo_atvs">
                    <div className="contagem-itens">
                    {`Total de Atividades: ${atividadesFiltradas.length}`}
                    </div>
                    <div className="b_filtros_atvs">
                        <div className="dropdown" ref={tipoMenuRef}>
                            <button onClick={() => setTipoMenuOpen(!tipoMenuOpen)}>
                                {filtroTipo}
                            </button>
                            {tipoMenuOpen && (
                                <div className="dropdown-menu">
                                    {tipos.map((tipo) => (
                                        <div
                                            key={tipo}
                                            className="dropdown-item"
                                            onClick={() => handleTipoChange(tipo)}
                                        >
                                            {tipo}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="dropdown" ref={dataMenuRef}>
                            <button onClick={() => setDataMenuOpen(!dataMenuOpen)}>
                                {filtroData}
                            </button>
                            {dataMenuOpen && (
                                <div className="dropdown-menu">
                                    {datas.map((data) => (
                                        <div
                                            key={data}
                                            className="dropdown-item"
                                            onClick={() => handleDataChange(data)}
                                        >
                                            {data}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="dropdown" ref={conclusaoMenuRef}>
                            <button onClick={() => setConclusaoMenuOpen(!conclusaoMenuOpen)}>
                                {filtroConclusao}
                            </button>
                            {conclusaoMenuOpen && (
                                <div className="dropdown-menu">
                                    {conclusoes.map((conclusao) => (
                                        <div
                                            key={conclusao}
                                            className="dropdown-item"
                                            onClick={() => handleConclusaoChange(conclusao)}
                                        >
                                            {conclusao}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="atividades_lista_div">
                    <ul className="atividades_lista">
                        {atividadesFiltradas.map((atividade, index) => (
                            <li key={index} className="atividade_item">
                                <button className="atividade_button"
                                        onClick={() => handleAtividadeClick(atividade.name)}>
                                    <div className="atividade_content">
                                        <div className="atividade_left">
                                            <img src={atividade.tipo === 'Prova' ? '/imgs/giz.png' : '/imgs/pin.png'}
                                                 alt={atividade.tipo}/>
                                            <span>{atividade.name}</span>
                                        </div>
                                        <div className="atividade_right">
                                            <span className="data-entrega">{new Date(atividade.prazo).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Atividades;