import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Importa o estilo geral

const Header = () => {
    return (
        <header>
            <div id="marca">
                <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                <p>Iridium</p>
            </div>
            <nav>
                <Link to="/registro">registro</Link>
                <p> | </p>
                <Link to="/quemsomos">quem somos</Link>
            </nav>
        </header>
    );
};

const Header2 = () => {
    return (
        <header>
            <div id="marca">
                <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                <p>Iridium</p>
            </div>
            <nav>
                <Link to="/login">registro</Link>
                <p> | </p>
                <Link to="/quemsomos">quem somos</Link>
            </nav>
        </header>
    );
};

export default Header;
