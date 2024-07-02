import React, { useState, useRef, useEffect } from 'react';
import '../../App.css';
import './perfil.css';
import { getToken } from '../App/useToken';

const Perfil = () => {
    const userToken = getToken();
    const [profileImage, setProfileImage] = useState('/imgs/default_profile_picture.jpg'); // Estado inicial com a imagem padrão
    const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
    const [userInfo, setUserInfo] = useState({
        nome: '',
        email: '',
        senha: '',
    });

    // Referência para o input do nome no perfil
    const nameInputRef = useRef(null);

    useEffect(() => {
        sendGET(`/usuarios/token?token=${userToken.usuarioId}`).then(response => {
            console.log("aa", response);
            setUserInfo(response);
        });
    }, []);

    useEffect(() => {
        if (editing) {
            // Foca no input do nome quando entrar no modo edição
            nameInputRef.current.focus();
        }
    }, [editing]);

    function sendGET(url) {
        console.log(url);
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => response.ok ? response.json() : []);
    }

    // Função para lidar com a seleção de uma nova imagem de perfil
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        setProfileImage(imageUrl);
    };

    // Função para habilitar o modo de edição
    const handleEdit = () => {
        setEditing(true);
    };

    // Função para salvar as alterações editadas
    const handleSave = () => {
        // Aqui você pode implementar a lógica para salvar as alterações
        setEditing(false); // Desativa o modo de edição após salvar
    };

    // Função para lidar com a mudança nos campos editáveis
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para gerar string de asteriscos com o tamanho da senha
    const getMaskedPassword = (password) => '•'.repeat(password.length);

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3"/>
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href={`/disciplinas/Disciplinas`}>Disciplinas</a>
                    <p> | </p>
                    <a href={`/atividades/Atividades`}>Atividades</a>
                    <p> | </p>
                    <a href={`/perfil/Perfil`}>Perfil</a>
                </nav>
            </header>

            <div className="profile-container">
                <h2 id="title">Perfil</h2>
                <div className="profile-image">
                    <img src={profileImage} alt="Foto de Perfil" id="profile-image"/>
                    {editing && (
                        <>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Escolher arquivo
                            </label>
                            <input id="file-upload" type="file" onChange={handleImageChange} accept="image/*"/>
                        </>
                    )}
                </div>
                <div className="profile-info">
                    <label htmlFor="nome">Nome:</label>
                    <div className={`info_box ${editing ? 'edit-mode-perfil' : ''}`}>
                        {editing ? (
                            <input
                                type="text"
                                id="nome"
                                name="nome" // Corrigido para 'nome'
                                value={userInfo.nome} // Corrigido para 'userInfo.nome'
                                onChange={handleChange}
                                className="input-field"
                                ref={nameInputRef} // Referência para o input do nome no perfil
                                autoFocus // Foca no input automaticamente ao entrar no modo edição
                            />
                        ) : (
                            <p><span id="name">{userInfo.nome}</span></p>
                        )}
                    </div>
                    <label htmlFor="email">E-mail:</label>
                    <div className={`info_box ${editing ? 'edit-mode-perfil' : ''}`}>
                        {editing ? (
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                className="input-field"
                            />
                        ) : (
                            <p><span id="email">{userInfo.email}</span></p>
                        )}
                    </div>
                    <label htmlFor="senha">Senha:</label>
                    <div className={`info_box ${editing ? 'edit-mode-perfil' : ''}`}>
                        {editing ? (
                            <input
                                type="text"
                                id="senha"
                                name="senha"
                                value={userInfo.senha}
                                onChange={handleChange}
                                className="input-field"
                            />
                        ) : (
                            <p><span id="password">{userInfo.senha}</span></p>
                        )}
                    </div>
                </div>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Perfil;
