import React, { useState } from 'react';
import '../../App.css'; // Importa o estilo geral
import './login.css'; // Importa os estilos específicos da página

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            // Simula o redirecionamento após validação
            window.location.href = "/perfil/Perfil";
        }
    };

    const validateForm = () => {
        if (email.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return false;
        } else {
            return true;
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
                    <p> | </p>
                    <a href="/qmsomos/QuemSomos">Quem somos</a>
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
