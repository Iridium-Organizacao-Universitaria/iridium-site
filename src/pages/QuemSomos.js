import React from 'react';
import '../App.css'; // Importa o estilo geral
import './quemsomos.css'; // Importa os estilos específicos da página

const QuemSomos = () => {
    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/">início</a>
                    <p> | </p>
                    <a href="/registro">registro</a>
                </nav>
            </header>

            <h2 className="title">quem somos</h2>
            <div className="container">
                <div className="half left">
                    <p>
                        Este site foi desenvolvido como projeto da disciplina MAC0350 - Introdução a Desenvolvimento de Software- no Instituto de Matemática e Estatística da Universidade de São Paulo no primeiro semestre de 2024.
                        <br />O projeto utiliza a Licença Pública Geral GNU v3.0 (GPLv3) e foi desenvolvido por Beatriz Viana Costa e Maysa Cristina Claudina da Silva, ambas alunas em Bacharelado em Ciência da Computação.
                    </p>
                </div>
                <div className="half right">
                    <h2>Informações Adicionais</h2>
                    <p>Acesse a página do projeto Iridium - Organização Universitária, no Github, para mais informações.</p>
                    <div className="botoes">
                        <a href="https://github.com/Iridium-Organizacao-Universitaria" className="btn">Iridium</a>
                    </div>
                    <p>Acesse também as páginas pessoais das desenvolvedoras do projeto.</p>
                    <div className="botoes">
                        <a href="https://github.com/beavct" className="profile-btn">Beatriz</a>
                        <a href="https://github.com/maysaclaudino" className="profile-btn">Maysa</a>
                    </div>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default QuemSomos;
