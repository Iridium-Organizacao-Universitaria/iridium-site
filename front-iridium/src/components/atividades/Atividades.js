import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './atividades.css'; // Importa os estilos específicos da página

const Atividades = () => {
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
                    <a href="/atividades">Atividades</a>
                    <p> | </p>
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
                </nav>
            </header>

            <div className="atividades_tudo">

            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Atividades;