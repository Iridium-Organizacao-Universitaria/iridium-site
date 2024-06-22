import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './disciplinas.css'; // Importa os estilos específicos da página

const Disciplinas = () => {

    const handleClick = (disciplina) => {
        console.log(`Você clicou na disciplina: ${disciplina}`);
        // Implemente aqui as ações desejadas ao clicar na disciplina
    };

    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/disciplinas">Disciplinas</a>
                    <p> | </p>
                    <a href="/atividades/Atividades">Atividades</a>
                    <p> | </p>
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
                </nav>
            </header>

            <h2 className="title">Disciplinas</h2>
            <div className="container_dis">
                <div className="criar_btn">
                    <button> Criar uma nova disciplina </button>
                </div>
                <div className="disc_atu">
                    <h3>Disciplinas em andamento</h3>
                    <div className="disciplinas_andamento">
                        {Array.from({ length: 40 }, (_, index) => (
                            <button
                                key={index}
                                className="botao_disciplina"
                                onClick={() => handleClick(`Disciplina ${index + 1}`)}
                            >
                                Disciplina {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="disc_ant">
                    <h3>Disciplinas de semestres anteriores</h3>
                    <div className="disciplinas_passadas"></div>
                    <div className="disciplinas_andamento">
                        {Array.from({ length: 40 }, (_, index) => (
                            <button
                                key={index}
                                className="botao_disciplina"
                                onClick={() => handleClick(`Disciplina ${index + 1}`)}
                            >
                                Disciplina {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Disciplinas;
