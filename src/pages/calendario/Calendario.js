import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './calendario.css'; // Importa os estilos específicos da página

const Calendario = () => {
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
                    <a href="/calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
                </nav>
            </header>

            <div className="calendario_tudo">

            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Calendario;
