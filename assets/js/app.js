const textarea = document.querySelector("#textarea-nomes");
const times = document.querySelector("#input-times");  // qntd de times
const membrosPorEquipe = document.querySelector("#input-membros"); // nºde pessoass por time
const btn = document.querySelector(".btn-sorteio");
const resultado = document.querySelector("#time");
const warning = document.querySelector('#warning');
const validationWarning1 = document.querySelector('.validation-warning1');
const validationWarning2 = document.querySelector('.validation-warning2');

function criarEquipes() {
    const nomes = textarea.value.trim().split(/\s*(?:,|\n)\s*|\s+(?=\S{1,2}\b)/g);

    const numeroEquipes = parseInt(times.value);
    const numeroMembros = parseInt(membrosPorEquipe.value);
    const totalMembros = numeroEquipes * numeroMembros;
    const equipes = [];

    // Verifica se há nomes suficientes para preencher as equipes
    
    if(textarea.value == ""){
        textarea.style.borderColor = 'red';
        warning.innerHTML = '<p class="warning">Não há nomes suficientes para preencher todas as equipes.</p>';
    }else{
        textarea.style.borderColor = '';
        warning.innerHTML = '';
    }

    if (nomes.length % totalMembros === 1) {
        times.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Não há equipes suficientes para o número de participantes.</p>';
        return;
    }else{
        warning.innerHTML = '';
    }
    
    if(nomes.length < totalMembros){
        membrosPorEquipe.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Não há nomes suficientes para preencher todas as equipes.</p>';
        return;
    }else{
        warning.innerHTML = ''; 
    }
    if(times.value <= 1){
        times.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Número de equipes é no mínimo 2.</p>';
        return; 
    }else{
        times.style.borderColor = '';
    }
    if(membrosPorEquipe.value < 1){
        membrosPorEquipe.style.borderColor = 'red'; 
        membrosPorEquipe.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Número de participantes é no mínimo 1.</p>';
        return;
    }else{
        membrosPorEquipe.style.borderColor = '';
    }

    // Loop pelo número de equipes desejadas
    for (let i = 0; i < numeroEquipes; i++) {
        const equipe = [];

        // Loop pelo número de membros desejados em cada equipe
        for (let j = 0; j < numeroMembros; j++) {
            // Seleciona um nome aleatório da lista de nomes e adiciona à equipe
            const index = Math.floor(Math.random() * nomes.length);
            equipe.push(nomes[index]);

            // Remove o nome selecionado da lista de nomes para que não seja selecionado novamente
            nomes.splice(index, 1);
        }

        // Adiciona a equipe criada à matriz de equipes
        equipes.push(equipe);
    }

    // Cria a string com a lista de equipes e membros
    let resultadoHTML = "";
    for (let i = 0; i < numeroEquipes; i++) {
        resultadoHTML += `<p><strong>Time ${(i + 1)}:</strong><br> ${equipes[i].join("<br/>")}</p>`;
    }
    resultado.innerHTML = resultadoHTML;
    if(!resultado.classList.contains('time')){
        resultado.classList.toggle('time');
    }
    closedModal();
}
const modal = document.querySelector('.modal-container');
const form = document.querySelector('.form'); 
const btnClosed = document.querySelector('.btnOk');
btnClosed.addEventListener('click', closedModal);

function closedModal() {
    if(modal.style.display === 'none'){
        modal.style.display = 'block';
        form.style.display = 'none';
    }else{
        form.style.display = 'block';
        modal.style.display = 'none';
    }
}

btn.addEventListener('click', () => {
    
    criarEquipes();        
});


  