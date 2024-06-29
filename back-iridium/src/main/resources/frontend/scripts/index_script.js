function sendGET(url) {
    return fetch(
        url,
        {headers: {'Accept': 'application/json'}}
    ).then(response => {
        if (response.ok) {
            return response.json()
        }
        return [];
    });
}

function sendPOST(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

function sendDELETE(url) {
    return fetch(url, {
        method: "DELETE"
    });
}

function tr(children) {
    const node = document.createElement("tr");
    children.forEach(child => node.appendChild(child));
    return node;
}

function td(content) {
    const node = document.createElement("td");
    if (content instanceof Element) {
        node.appendChild(content)
    } else {
        node.appendChild(document.createTextNode(content));
    }
    return node;
}

/////////////// DISCIPLINAS

function displayAllDisciplinas() {
    clearDisciplinasTable();
    fetchAllDisciplinas().then(displayDisciplinas)
}

function displayDisciplina(name) {
    fetchDisciplinaWithName(name).then(t =>
        disciplinaDisplay().innerHTML
            = `Nome: ${t.name} Docente: ${t.docente} Sigla: ${t.sigla} Apelido: ${t.apelido} Em andamento: ${t.andamento}`
    )
}

function deleteDisciplina(name) {
    deleteDisciplinaWithName(name).then(() => {
        clearDisciplinaDisplay();
        displayAllDisciplinas();
    })
}

function deleteDisciplinaWithName(name) {
    return sendDELETE(`/disciplinas/${name}`)
}

function addNewDisciplina() {
    const disciplina = buildDisciplinaFromForm();
    sendPOST("/disciplinas", disciplina).then(displayAllDisciplinas);
}

function buildDisciplinaFromForm() {
    return {
        name: getDisciplinaFormValue("newDisciplinaName"),
        docente: getDisciplinaFormValue("newDisciplinaDocente"),
        sigla: getDisciplinaFormValue("newDisciplinaSigla"),
        apelido: getDisciplinaFormValue("newDisciplinaApelido"),
        andamento: true,
    }
}

function getDisciplinaFormValue(controlName) {
    return document.addDisciplinaForm[controlName].value;
}

function disciplinaDisplay() {
    return document.getElementById("currentDisciplinaDisplay");
}

function fetchDisciplinaWithName(name) {
    return sendGET(`/disciplinas/byName/${name}`);
}

function fetchAllDisciplinas() {
    return sendGET("/disciplinas")
}

function disciplinasTable() {
    return document.getElementById("disciplinasTableBody");
}

function clearDisciplinasTable() {
    disciplinasTable().innerHTML = "";
}

function clearDisciplinaDisplay() {
    disciplinaDisplay().innerText = "None";
}

function displayDisciplinas(disciplinas) {
    const disciplinasTableBody = disciplinasTable()
    disciplinas.forEach(disciplina => {
        const newRow = disciplinaRow(disciplina);
        disciplinasTableBody.appendChild(newRow);
    });
}

function disciplinaRow(disciplina) {
    return tr([
        td(disciplina.name),
        td(disciplina.andamento),
        td(viewLinkDisciplina(disciplina.name)),
        td(deleteLinkDisciplina(disciplina.name)),
    ]);
}

function viewLinkDisciplina(disciplinaName) {
    const node = document.createElement("a");
    node.setAttribute(
        "href", `javascript:displayDisciplina("${disciplinaName}")`
    )
    node.appendChild(document.createTextNode("view"));
    return node;
}

function deleteLinkDisciplina(disciplinaName) {
    const node = document.createElement("a");
    node.setAttribute(
        "href", `javascript:deleteDisciplina("${disciplinaName}")`
    )
    node.appendChild(document.createTextNode("delete"));
    return node;
}

function displayDisciplinasWithAndamento() {
    clearDisciplinasTable();
    const andamento = readDisciplinaAndamento();
    fetchDisciplinasWithAndamento(andamento).then(displayDisciplinas)
}

function readDisciplinaAndamento() {
    return document.andamentoForm.andamento.value
}

function fetchDisciplinasWithAndamento(andamento) {
    return sendGET(`/disciplinas/byAndamento/${andamento}`);
}

/////////////// ATIVIDADES

function displayAllAtividades() {
    clearAtividadesTable();
    fetchAllAtividades().then(displayAtividades)
}

function displayAtividadesWithTipo() {
    clearAtividadesTable();
    const tipo = readAtividadeTipo();
    fetchAtividadesWithTipo(tipo).then(displayAtividades)
}

function displayAtividadesWithConcluido() {
    clearAtividadesTable();
    const concluido = readAtividadeConcluido();
    fetchAtividadesWithConcluido(concluido).then(displayAtividades)
}

function displayAtividade(name) {
    fetchAtividadeWithName(name).then(t =>
        atividadeDisplay().innerHTML
            = `Nome: ${t.name} Descricao: ${t.descricao} Tipo: ${t.tipo} Concluido: ${t.concluido} Prazo: ${t.prazo} Matéria: ${t.disciplina}`
    )
}

function deleteAtividade(name) {
    deleteAtividadeWithName(name).then(() => {
        clearAtividadeDisplay();
        displayAllAtividades();
    })
}

function deleteAtividadeWithName(name) {
    return sendDELETE(`/atividades/${name}`)
}

function addNewAtividade() {
    const atividade = buildAtividadeFromForm();
    sendPOST("/atividades", atividade).then(displayAllAtividades);
}

function buildAtividadeFromForm() {
    return {
        name: getAtividadeFormValue("newAtividadeName"),
        descricao: getAtividadeFormValue("newAtividadeDescricao"),
        tipo: getAtividadeFormValue("newAtividadeTipo"),
        concluido: false,
        disciplina: getAtividadeFormValue("newAtividadeDisciplina"),
        prazo: getAtividadeFormValue("newAtividadePrazo")
    }
}

function getAtividadeFormValue(controlName) {
    return document.addAtividadeForm[controlName].value;
}

function atividadeDisplay() {
    return document.getElementById("currentAtividadeDisplay");
}

function readAtividadeTipo() {
    return document.tipoForm.tipo.value
}

function readAtividadeConcluido() {
    return document.concluidoForm.concluido.value
}

function readAtividadePrazo() {
    return document.prazoForm.prazo.value
}

function fetchAtividadesWithConcluido(concluido) {
    return sendGET(`/atividades/byConcluido/${concluido}`);
}

function fetchAtividadesWithTipo(tipo) {
    return sendGET(`/atividades/byTipo/${tipo}`);
}

function fetchAtividadeWithName(name) {
    return sendGET(`/atividades/byName/${name}`);
}

function fetchAllAtividades() {
    return sendGET("/atividades")
}

function atividadesTable() {
    return document.getElementById("atividadesTableBody");
}

function clearAtividadesTable() {
    atividadesTable().innerHTML = "";
}

function clearAtividadeDisplay() {
    atividadeDisplay().innerText = "None";
}

function displayAtividades(atividades) {
    const atividadesTableBody = atividadesTable()
    atividades.forEach(atividade => {
        const newRow = atividadeRow(atividade);
        atividadesTableBody.appendChild(newRow);
    });
}

function atividadeRow(atividade) {
    return tr([
        td(atividade.name),
        td(atividade.concluido),
        td(atividade.tipo),
        td(viewLinkAtividade(atividade.name)),
        td(deleteLinkAtividade(atividade.name)),
    ]);
}

function viewLinkAtividade(atividadeName) {
    const node = document.createElement("a");
    node.setAttribute(
        "href", `javascript:displayAtividade("${atividadeName}")`
    )
    node.appendChild(document.createTextNode("view"));
    return node;
}

function deleteLinkAtividade(atividadeName) {
    const node = document.createElement("a");
    node.setAttribute(
        "href", `javascript:deleteAtividade("${atividadeName}")`
    )
    node.appendChild(document.createTextNode("delete"));
    return node;
}

document.addEventListener("DOMContentLoaded", function() {
    const atividade = {
        prazo: '2023-12-31'  // Defina a data que deseja usar aqui
    };

    const newAtividadePrazo = document.getElementById("newAtividadePrazo");
    if (newAtividadePrazo) {
        newAtividadePrazo.value = atividade.prazo;
    }
});