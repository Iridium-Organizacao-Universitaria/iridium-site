import React from 'react';
import '../../App.css'; // Importa o estilo geral

const Home = () => {
    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/registro/Registro">Registro</a>
                    <p> | </p>
                    <a href="/login/Login">Login</a>
                    <p> | </p>
                    <a href="/qmsomos/QuemSomos">Quem somos</a>
                </nav>
            </header>

            <h2 className="title">Início</h2>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Home;