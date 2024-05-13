document.addEventListener('DOMContentLoaded', function () {
    // Botão para criar nova disciplina
    const newDisciplineBtn = document.getElementById('new-discipline-btn');
    // Botão para mostrar disciplinas em andamento
    const ongoingDisciplinesBtn = document.getElementById('ongoing-disciplines-btn');
    // Botão para voltar da visualização de detalhes para a lista de disciplinas em andamento
    const backBtn = document.getElementById('back-btn');
    // Div que contém o formulário para criar nova disciplina
    const newDisciplineForm = document.getElementById('new-discipline-form');
    // Div que contém a lista de disciplinas em andamento
    const ongoingDisciplinesList = document.getElementById('ongoing-disciplines-list');
    // Div que contém os detalhes da disciplina selecionada
    const disciplineDetails = document.getElementById('discipline-details');

    // Evento de clique no botão para criar nova disciplina
    newDisciplineBtn.addEventListener('click', function () {
        // Exibe o formulário para criar nova disciplina
        newDisciplineForm.classList.remove('hidden');
        ongoingDisciplinesList.classList.add('hidden');
        disciplineDetails.classList.add('hidden');
    });

    // Evento de clique no botão para mostrar disciplinas em andamento
    ongoingDisciplinesBtn.addEventListener('click', function () {
        // Exibe a lista de disciplinas em andamento
        newDisciplineForm.classList.add('hidden');
        ongoingDisciplinesList.classList.remove('hidden');
        disciplineDetails.classList.add('hidden');
    });

    // Evento de clique no botão de voltar da visualização de detalhes
    backBtn.addEventListener('click', function () {
        // Volta para a lista de disciplinas em andamento
        newDisciplineForm.classList.add('hidden');
        ongoingDisciplinesList.classList.remove('hidden');
        disciplineDetails.classList.add('hidden');
    });
});
