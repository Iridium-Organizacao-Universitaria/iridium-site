import React from 'react';
import '../../App.css'; // Importa o estilo geral
import './registro.css'; // Importa os estilos específicos da página

const Registro = () => {
    const redirectToProfile = (event) => {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        if (validateForm()) {
            // Simula o redirecionamento após validação
            window.location.href = "/perfil/Perfil";
        }
    };

    const validateForm = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return false;
        } else {
            return true;
        }
    };

    return (
        <div>
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

            <div class="registro_tudo">
                <div class="welcome">
                    <h1>Bem-vindo ao Iridium</h1>
                </div>
                <form class="registration-form" onSubmit={redirectToProfile}>
                    <div class="input-group">
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" placeholder="Insira seu nome" />
                    </div>
                    <div class="input-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" placeholder="Insira seu e-mail" />
                    </div>
                    <div class="input-group">
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" placeholder="Insira sua senha" />
                    </div>
                    <div class="input-group">
                        <button type="submit">Continue</button>
                    </div>
                    <div class="google-login">
                        <p>Ou continue com o Google:</p>
                        <a href="#">
                            <img src="https://logopng.com.br/logos/google-37.png" alt="logo da Google" />
                            Registrar com Google
                        </a>
                    </div>
                    <hr />
                    <div class="login-link">
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
