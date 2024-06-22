import React from 'react';
import '../App.css'; // Importa o estilo geral
import './registro.css'; // Importa os estilos específicos da página

const Registro = () => {
    const redirectToProfile = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        if (validateForm()) {
            // Simula o redirecionamento após validação
            window.location.href = "/perfil";
        }
    };

    const validateForm = () => {
        // Implemente sua lógica de validação aqui
        return true; // Retorna true para simular validação verdadeira
    };

    return (
        <div>
            <header>
                <div id="marca">
                    <img src="/imgs/Starfruit.png" id="logo" alt="starfruit :3" />
                    <p>Iridium</p>
                </div>
                <nav>
                    <a href="/">início</a>
                    <p> | </p>
                    <a href="/quemsomos">quem somos</a>
                </nav>
            </header>

            <div className="container">
                <div className="welcome">
                    <h1>Bem-vindo ao Iridium</h1>
                </div>
                <form className="registration-form" onSubmit={redirectToProfile}>
                    <div className="input-group">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" placeholder="Insira seu nome" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" placeholder="Insira seu e-mail" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" placeholder="Insira sua senha" />
                    </div>
                    <div className="input-group">
                        <button type="submit"> Continue </button>
                    </div>
                    <div className="google-login">
                        <p>Ou continue com o Google:</p>
                        <a href="#">
                            <img src="https://logopng.com.br/logos/google-37.png" alt="logo da Google" />
                            Registrar com Google
                        </a>
                    </div>
                    <hr />
                    <div className="login-link">
                        <p>Já tem conta? Faça o login <a href="/login">aqui</a>.</p>
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
