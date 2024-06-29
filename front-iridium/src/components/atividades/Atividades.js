import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './atividades.css';

const Atividades = () => {
    const [atividades_teste, setAtividades] = useState([
        { nome: 'Atividade 1', dataEntrega: new Date('2024-06-22') },
        { nome: 'Atividade 2', dataEntrega: new Date('2024-06-25') },
        { nome: 'Atividade 3', dataEntrega: new Date('2024-06-22') },
        { nome: 'Atividade 4', dataEntrega: new Date('2024-06-25') },
        { nome: 'Atividade 5', dataEntrega: new Date('2024-06-22') },
        { nome: 'Atividade 6', dataEntrega: new Date('2024-06-25') },
        { nome: 'Prova 1', dataEntrega: new Date('2024-07-15') },
        { nome: 'Prova 2', dataEntrega: new Date('2024-08-17') },
        { nome: 'Prova 3', dataEntrega: new Date('2024-07-15') },
        { nome: 'Prova 4', dataEntrega: new Date('2024-08-17') },
        { nome: 'Prova 5', dataEntrega: new Date('2024-07-15') },
        { nome: 'Prova 6', dataEntrega: new Date('2024-08-17') },
        { nome: 'Prova 7', dataEntrega: new Date('2024-07-15') },
        { nome: 'Prova 8', dataEntrega: new Date('2024-08-17') },
        { nome: 'Prova 9', dataEntrega: new Date('2024-07-15') },
        { nome: 'Prova 10', dataEntrega: new Date('2024-08-17') },
    ]);

    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroData, setFiltroData] = useState('Hoje');
    const [tipoMenuOpen, setTipoMenuOpen] = useState(false);
    const [dataMenuOpen, setDataMenuOpen] = useState(false);
    const tipoMenuRef = useRef(null);
    const dataMenuRef = useRef(null);

    const tipos = ['Todos', 'Provas', 'Atividades'];
    const datas = ['Hoje', '1 semana', '1 mês', 'Todas'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tipoMenuRef.current && !tipoMenuRef.current.contains(event.target)) {
                setTipoMenuOpen(false);
            }
            if (dataMenuRef.current && !dataMenuRef.current.contains(event.target)) {
                setDataMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filtrarAtividades = () => {
        const hoje = new Date();
        let atividadesFiltradas = atividades_teste;

        if (filtroTipo !== 'Todos') {
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
                filtroTipo === 'Provas' ? atividade.nome.startsWith('Prova') : !atividade.nome.startsWith('Prova')
            );
        }

        if (filtroData === 'Hoje') {
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
                atividade.dataEntrega.toDateString() === hoje.toDateString()
            );
        } else if (filtroData === '1 semana') {
            const umaSemanaDepois = new Date(hoje);
            umaSemanaDepois.setDate(hoje.getDate() + 7);
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
                atividade.dataEntrega >= hoje && atividade.dataEntrega <= umaSemanaDepois
            );
        } else if (filtroData === '1 mês') {
            const umMesDepois = new Date(hoje);
            umMesDepois.setMonth(hoje.getMonth() + 1);
            atividadesFiltradas = atividadesFiltradas.filter(atividade =>
                atividade.dataEntrega >= hoje && atividade.dataEntrega <= umMesDepois
            );
        }

        // Se filtroData for 'Todas', retornar todas as atividades sem filtrar por data
        if (filtroData === 'Todas') {
            return atividadesFiltradas;
        }

        return atividadesFiltradas.sort((a, b) => a.dataEntrega - b.dataEntrega);
    };

    const atividadesFiltradas = filtrarAtividades();

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
                                            onClick={() => {
                                                setFiltroTipo(tipo);
                                                setTipoMenuOpen(false);
                                            }}
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
                                            onClick={() => {
                                                setFiltroData(data);
                                                setDataMenuOpen(false);
                                            }}
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
                        {atividadesFiltradas.map((atividade, index) => (
                            <li key={index} className="atividade_item">
                                <span><img src="/imgs/pin.png" alt="pin" /> {atividade.nome}</span>
                                <span className="data-entrega">{atividade.dataEntrega.toLocaleDateString()}</span>
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
