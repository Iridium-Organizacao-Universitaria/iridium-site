import React from 'react';
import '../App.css'; // Importa o estilo geral
import './perfil.css'; // Importa os estilos específicos da página

const Perfil = () => {
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

            <div className="profile-container">
                <div className="profile-image">
                    <img src="" alt="Foto de Perfil" id="profile-image" />
                    <i className="fas fa-user-circle"></i> {/* Ícone de perfil padrão */}
                </div>
                <div className="profile-info">
                    <label htmlFor="name">Nome:</label>
                    <p><span id="name">Nome do Usuário</span></p>
                    <label htmlFor="email">E-mail:</label>
                    <p><span id="email">email@exemplo.com</span></p>
                    <label htmlFor="password">Senha:</label>
                    <p><span id="password">********</span></p>
                </div>
                <button className="edit-button">Editar perfil</button>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Perfil;
