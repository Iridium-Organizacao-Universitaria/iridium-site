# Iridium - Projeto MAC0350

Desenvolvido como projeto da disciplina MAC0350 - Introdução a Desenvolvimento de Software no Instituto de Matemática e Estatística da Universidade de São Paulo.

## Conteúdo

<a name="tc"></a>
1. [Sobre](#sobre)
3. [Instalação](#instalação)
4. [Como usar](#como-usar)
5. [Tecnologias](#tecnologias)
6. [Licença](#licença)
7. [Autores](#autores)



<a name="sobre"></a>
## Sobre 

> Imagine um site que se torna o seu melhor aliado na jornada universitária. Apresentamos o nosso site de organização, cuidadosamente projetado para atender às necessidades específicas dos estudantes universitários. Aqui, você encontrará uma plataforma completa que não apenas ajuda a gerenciar suas datas de provas, projetos e atividades, mas também simplifica sua vida acadêmica de todas as formas possíveis.\
\
Com nossa interface intuitiva, você pode facilmente criar e visualizar suas tarefas, garantindo que nunca perca um prazo importante. Seja uma prova daquela matéria desafiadora ou a entrega de um projeto crucial, tudo estará organizado de forma clara e acessível.\
\
\
Portanto, se você deseja simplificar sua vida universitária, nosso aplicativo é a escolha certa. Experimente hoje mesmo e descubra como podemos tornar sua jornada acadêmica mais tranquila e produtiva.

<!---E quando se trata de acessibilidade, garantimos que você possa estar sempre conectado à sua vida acadêmica. Com sincronização em múltiplas plataformas, você pode acessar suas informações de qualquer dispositivo, a qualquer momento. Esteja você no campus, em casa ou em movimento, seu mundo acadêmico está sempre ao seu alcance.--->



<a name="instalação"></a>
## Instalação
É necessário instalar o Noje.js e PostgreSQL na máquina que irá rodar o projeto. A IDE recomendada e utilizada para desenvolver o projeto foi o IntelliJ IDEA. Ao abrir o repositório do projeto, haverá dois diretórios principais nomeados como back-iridium e front-iridium.
Será necessario ir nas configurações do gradle do projeto e indicar que o `build` e o `run` deverão rodar no diretório `${caminho_até_o_projeto}/back-iridium`, além disso, para rodar o React App é necessário estar no diretório front-iridium, que pode ser acessado pelo terminal da IDE.
Dessa forma, com essas configurações prontas, no terminal do front-iridium é preciso rodar o seguinte comando, que irá instalar as dependências do React App:

```
npm install
```
E é preciso dar `build` no Gradle para que ele instale as dependências do backend e compile os modelos criados.


<a name="como-usar"></a>
## Como usar
Para rodar o servido, é necesário rodar `run` no path definido anteriormente. Foi definido no projeto que o servidor rodaria no `http://localhost:8081`, isto pode ser alterado no arquivo `back-iridium/build/resources/main/application.yaml` que tem o seguinte formato:

```
ktor:
    application:
        modules:
            - com.iridium.ApplicationKt.module
    deployment:
        port: 8081

storages:
    #if you are using Postgres db
    - driverClassName: "org.postgresql.Driver"
      jdbcURL: "jdbc:postgresql://localhost:5432/db_name_here?user=db_username_here&password=db_password_here"

```

Para rodar o React App é preciso estar no diretório indicado anteriormente e utilizar o comando:

```
npm start
```

Caso a porta utilizada pelo servidor seja alterada no backend, também será necessário alterar a porta em que o React App realiza as requisições HTTP, isso pode ser alterado no arquivo `front-iridium/package.json` no campo proxy, quem tem o seguinte formato:

```
...
"proxy": "http://localhost:8081",
...
```



<!--- Completar aqui depois 
Imagens ebaa -->


<!--- Completar aqui depois 
Imagens ebaa -->



<a name="tecnologias"></a>
## Tecnologias 

As seguintes ferramentas foram utilizadas na construção do projeto:

[![React App](https://shields.io/badge/react-black?logo=react&style=for-the-badge)](https://pt-br.legacy.reactjs.org)
[![PostgreSQL](https://shields.io/badge/postgresql-black?logo=postgresql&style=for-the-badge)](https://www.postgresql.org)
[![IntelliJ IDEA](https://img.shields.io/badge/Intellij%20Idea-000?logo=intellij-idea&style=for-the-badge)](https://www.jetbrains.com/pt-br/idea/)
[![Ktor](https://shields.io/badge/ktor-black?logo=ktor&style=for-the-badge)](https://ktor.io)
[![Kotlin](https://shields.io/badge/kotlin-black?logo=kotlin&style=for-the-badge)](https://kotlinlang.org)
[![Nodejs](https://shields.io/badge/nodejs-black?logo=nodejs&style=for-the-badge)](https://nodejs.org/pt)


<a name="licença"></a>
## Licença
A licença utilizada no projeto é a GNU General Pubic License.\
\
[![LICENSE](https://img.shields.io/badge/License-GNU%20GPL-blue)](https://www.gnu.org/licenses/gpl-3.0.pt-br.html)



<a name="autores"></a>
## Autores
 * [Beatriz Viana Costa](https://img.shields.io/github/license/{username}/{repo-name}.svg)
 * [Maysa Cristina Claudino](https://github.com/maysaclaudino)
