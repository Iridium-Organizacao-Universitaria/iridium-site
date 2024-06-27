import React from 'react';
import { useState } from 'react';
import '../../App.css'; // Importa o estilo geral
import './perfil.css'; // Importa os estilos específicos da página

const Perfil = () => {
    const [profileImage, setProfileImage] = useState('/imgs/default_profile_picture.jpeg'); // Estado inicial com a imagem padrão

    // Função para lidar com a seleção de uma nova imagem de perfil
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        setProfileImage(imageUrl);
    };

    return (
        <div>
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
                    <a href="/calendario/Calendario">Calendário</a>
                    <p> | </p>
                    <a href="/perfil">Perfil</a>
                </nav>
            </header>

            <div className="profile-container">
                <h2 id="title">Perfil</h2>
                <div className="profile-image">
                    <img src={profileImage} alt="Foto de Perfil" id="profile-image"/>
                    {/* <label htmlFor="file-upload" className="custom-file-upload">
                        Escolher arquivo
                    </label>
                    <input id="file-upload" type="file" onChange={handleImageChange} accept="image/*"/> */}
                </div>
                <div className="profile-info">
                    <label htmlFor="name">Nome:</label>
                    <div className="info_box">
                        <p><span id="name">Nome do Usuário</span></p>
                    </div>
                    <label htmlFor="email">E-mail:</label>
                    <div className="info_box">
                        <p><span id="email">email@exemplo.com</span></p>
                    </div>
                    <label htmlFor="password">Senha:</label>
                    <div className="info_box">
                        <p><span id="password">********</span></p>
                    </div>
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