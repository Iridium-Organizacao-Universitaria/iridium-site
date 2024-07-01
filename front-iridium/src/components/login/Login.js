import React, { useState } from 'react';
import '../../App.css'; // Importa o estilo geral
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function sendGET(url) {
        return fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(response => response.ok ? response.json() : []);
    }

    function sendPOST(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            // Simula o redirecionamento após validação
            //window.location.href = "/perfil/Perfil";
        }
    };

    const validateForm = async () => {
        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return false;
        }

        try {
            // Primeiro fetch para verificar o e-mail e senha
            const response = await fetch(`/usuarios/email/${email}`);

            if (response.status === 200) {
                const senhaData = await response.json();
                const senha = senhaData.senha; // extrai a senha do objeto recebido

                if (senha !== undefined && senha !== password) {
                    alert('Senha incorreta!');
                    return -1;
                } else {
                    // Segundo fetch para obter o ID do usuário
                    const response2 = await fetch(`/usuarios/id?email=${email}`);

                    if (response2.status === 200) {
                        const idData = await response2.json();
                        const id = idData.id; // supondo que o ID seja retornado como id
                        console.log(id);
                        return id;
                    } else {
                        alert('Erro ao obter o ID do usuário.');
                        return -1;
                    }
                }
            } else if (response.status === 404) {
                alert('E-mail não cadastrado.');
                return -1;
            } else {
                alert('Erro ao verificar o e-mail.');
                return -1;
            }
        } catch (error) {
            console.error('Erro ao verificar o e-mail:', error);
            alert('Erro ao verificar o e-mail. Por favor, tente novamente.');
            return -1;
        }
    };





    return (
        <div className="h">
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
                </nav>
            </header>

            <div className="login_tudo">
                <h2 className="title_login">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Insira seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Insira sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <button type="submit"> Continue </button>
                    </div>
                    {/*<div className="google-login">*/}
                    {/*    <p>Ou continue com o Google:</p>*/}
                    {/*    <a href="#">*/}
                    {/*        <img src="https://logopng.com.br/logos/google-37.png" alt="logo da Google" />*/}
                    {/*        Entrar com Google*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </form>
            </div>

            <footer>
                <p>Iridium</p>
            </footer>
        </div>
    );
};

export default Login;
