import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './atividades.css';

const Atividades = () => {
    const [atividades, setAtividades] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroData, setFiltroData] = useState('Hoje');
    const [tipoMenuOpen, setTipoMenuOpen] = useState(false);
    const [dataMenuOpen, setDataMenuOpen] = useState(false);
    const tipoMenuRef = useRef(null);
    const dataMenuRef = useRef(null);

    const tipos = ['Todos', 'Provas', 'Atividades'];
    const datas = ['Hoje', '1 semana', '1 mês', 'Todas'];

    useEffect(() => {
        fetchAllAtividades().then(atividadesFromAPI => {
            setAtividades(atividadesFromAPI);
        });
    }, []);

    const fetchAllAtividades = () => {
        return sendGET('/atividades').then(response => response.json());
    };

    const sendGET = (url) => {
        return fetch(url, {
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return [];
        });
    };

    const displayAtividades = (atividades) => {
        return atividades.filter(atividade => {
            if (filtroTipo === 'Todos') {
                return true;
            } else {
                return atividade.tipo === filtroTipo;
            }
        }).map((atividade, index) => (
            <li key={index} className="atividade_item">
                <span>
                    <img src={atividade.tipo === 'Prova' ? '/imgs/giz.png' : '/imgs/pin.png'} alt={atividade.tipo} />
                    {atividade.name}
                </span>
                <span className="data-entrega">{new Date(atividade.prazo).toLocaleDateString()}</span>
            </li>
        ));
    };

    const handleTipoChange = (tipo) => {
        setFiltroTipo(tipo);
        setTipoMenuOpen(false);
    };

    const handleDataChange = (data) => {
        setFiltroData(data);
        setDataMenuOpen(false);
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
                <div className="topo_atvs">
                    <div className="contagem-itens">
                        {`Total de Atividades: ${atividades.length}`}
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
                    </div>
                </div>
                <div className="atividades_lista_div">
                    <ul className="atividades_lista">
                        {displayAtividades(atividades)}
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
