import React from 'react';
import '../App.css'; // Importa o estilo geral
import './disciplinas.css'; // Importa os estilos específicos da página

const Disciplinas = () => {
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

            <h2 className="title">disciplinas</h2>
            <div className="container">
                <div className="criar_btn">
                    <button> Criar uma nova disciplina </button>
                </div>
                <div className="disc_atu">
                    <h2>disciplinas em andamento</h2>
                    <div className="disciplinas_andamento">
                        {Array.from({ length: 40 }, (_, index) => (
                            <p key={index}>AAA</p>
                        ))}
                    </div>
                </div>
                <div className="disc_ant">
                    <h2>disciplinas de semestres anteriores</h2>
                    <div className="disciplinas_passadas"></div>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Disciplinas;
