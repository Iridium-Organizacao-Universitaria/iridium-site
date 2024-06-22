import React from 'react';
import '../App.css'; // Importa o estilo geral
import './calendario.css'; // Importa os estilos específicos da página

const Calendario = () => {
    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/disciplinas">disciplinas</a>
                    <p> | </p>
                    <a href="/atividades">atividades</a>
                    <p> | </p>
                    <a href="/calendario">calendário</a>
                    <p> | </p>
                    <a href="/perfil">perfil</a>
                </nav>
            </header>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Calendario;
