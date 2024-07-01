import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './registro.css'; // Importa os estilos específicos da página

const Registro = () => {
    const [novoUsuario, setNovoUsuario] = React.useState({
        id: null,
        nome: '',
        email: '',
        senha: ''
    });

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

    const redirectToProfile = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        // if (validateForm()) {
        //     // Simula o redirecionamento após validação
        //     //window.location.href = "/perfil/Perfil";
        // }
        validateForm()
    };

    const validateForm = async () => {
        if (novoUsuario.nome.trim() === '' || novoUsuario.senha.trim() === '' || novoUsuario.email.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return false;
        }

        try {
            console.log(novoUsuario);
            await sendPOST("/usuarios", {usuario: novoUsuario});
            setNovoUsuario({
                nome: '',
                email: '',
                senha: ''
            })

            return true;
        } catch (error) {
            console.error('Erro ao criar novo usuário:', error);
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoUsuario(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="h">
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
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

            <div className="registro_tudo">
                <div className="welcome">
                    <h1>Bem-vindo ao Iridium</h1>
                </div>
                <form className="registration-form" onSubmit={redirectToProfile}>
                    <div className="input-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="nome"
                            value={novoUsuario.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={novoUsuario.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="senha"
                            value={novoUsuario.senha}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <button type="submit">Continue</button>
                    </div>
                    {/*<div className="google-login">*/}
                    {/*    <p>Ou continue com o Google:</p>*/}
                    {/*    <a href="#">*/}
                    {/*        <img src="https://logopng.com.br/logos/google-37.png" alt="logo da Google" />*/}
                    {/*        Registrar com Google*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    <hr />
                    <div className="login-link">
                        <p>Já tem conta? Faça o login <a href="/login/Login">aqui</a>.</p>
                    </div>
                </form>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Registro;
