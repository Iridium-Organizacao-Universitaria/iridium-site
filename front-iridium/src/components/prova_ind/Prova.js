import React, { useState } from 'react';
import '../../App.css'; // Importa o estilo geral
import './prova.css';

const Prova = () => {


    return(
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

            <div className="prova_tudo">


            </div>
        </div>



    );
};

export default Prova;