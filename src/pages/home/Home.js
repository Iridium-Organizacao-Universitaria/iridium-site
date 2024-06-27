import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './home.css';

const Home = () => {
    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/">Início</a>
                    <p> | </p>
                    <a href="/login/Login">Login</a>
                    <p> | </p>
                    <a href="/registro/Registro">Registro</a>
                    <p> | </p>
                    <a href="/qmsomos/QuemSomos">Quem somos</a>
                </nav>
            </header>

            <div className="home_tudo">
                <h2 className="title_ini">Início</h2>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Home;