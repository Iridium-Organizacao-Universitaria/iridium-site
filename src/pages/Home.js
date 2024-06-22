import React from 'react';
import '../App.css'; // Importa o estilo geral

const Home = () => {
    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/registro">registro</a>
                    <p> | </p>
                    <a href="/quemsomos">quem somos</a>
                </nav>
            </header>
            <p>oii</p>
        </div>
    );
};

export default Home;