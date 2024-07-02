import React, { useState, useRef, useEffect } from 'react';
import '../../App.css'; // Importa o estilo geral
import './perfil.css'; // Importa os estilos específicos da página

const Perfil = () => {
    const [profileImage, setProfileImage] = useState('/imgs/default_profile_picture.jpeg'); // Estado inicial com a imagem padrão
    const [editing, setEditing] = useState(false); // Estado para controlar o modo de edição
    const [userInfo, setUserInfo] = useState({
        name: 'Nome do usuário',
        email: 'email@exemplo.com',
        password: 'senha123',
    });

    // Referência para o input do nome no perfil
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (editing) {
            // Foca no input do nome quando entrar no modo edição
            nameInputRef.current.focus();
        }
    }, [editing]);

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
                    <a href="/disciplinas/Disciplinas">Disciplinas</a>
                    <p> | </p>
                    <a href="/atividades/Atividades">Atividades</a>
                    <p> | </p>
                    <a href="/perfil/Perfil">Perfil</a>
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
                    <label htmlFor="name">Nome:</label>
                    <div className={`info_box ${editing ? 'edit-mode-perfil' : ''}`}>
                        {editing ? (
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                className="input-field"
                                ref={nameInputRef} // Referência para o input do nome no perfil
                                autoFocus // Foca no input automaticamente ao entrar no modo edição
                            />
                        ) : (
                            <p><span id="name">{userInfo.name}</span></p>
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
                    <label htmlFor="password">Senha:</label>
                    <div className={`info_box ${editing ? 'edit-mode-perfil' : ''}`}>
                        {editing ? (
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                className="input-field"
                            />
                        ) : (
                            <p><span id="password">{getMaskedPassword(userInfo.password)}</span></p>
                        )}
                    </div>
                </div>
                {/*<div className="botoe-perfil">*/}
                {/*    {editing ? (*/}
                {/*        <button className="b_save_perfil" onClick={handleSave}>Salvar alterações</button>*/}
                {/*    ) : (*/}
                {/*        <button className="b_editar_perfil" onClick={handleEdit}>Editar perfil</button>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Perfil;
