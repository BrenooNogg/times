const textarea = document.querySelector("#textarea-nomes");
const times = document.querySelector("#input-times");  // qntd de times
const membrosPorEquipe = document.querySelector("#input-membros"); // nºde pessoass por time
const btn = document.querySelector(".btn-sorteio");
const resultado = document.querySelector("#time");
const warning = document.querySelector('#warning');

function criarEquipes() {
    const nomes = textarea.value.trim().split(/\s*(?:,|\n)\s*|\s+(?=\S{1,2}\b)/g);

    const numeroEquipes = parseInt(times.value);
    const numeroMembros = parseInt(membrosPorEquipe.value);
    const totalMembros = numeroEquipes * numeroMembros;
    const equipes = [];
    if(textarea.value == ""){
        textarea.style.borderColor = 'red';
        warning.innerHTML = '<p class="warning">Campo vázio.</p>';
        textarea.focus();
        return; 
    }else{
        textarea.style.borderColor = '';
        warning.innerHTML = '';
    }

    // Verifica se há nomes suficientes para preencher as equipes
    if(times.value == ""){
        times.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Campo vazio!</p>';
        times.focus();
        return;
    }else if(times.value < 1){
        times.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Número de equipes é maior ou igual a 1!</p>';
        times.focus();
        return;        
    }else{
        times.style.borderColor = '';
        warning.innerHTML = '';
    }

    if(membrosPorEquipe.value == ""){
        membrosPorEquipe.style.borderColor = 'red';
        warning.innerHTML = '<p class="warning">Campo vazio!</p>';
        membrosPorEquipe.focus();
        return;
    }else if(membrosPorEquipe.value < 1){
        membrosPorEquipe.style.borderColor = 'red'; 
        warning.innerHTML = '<p class="warning">Número de participantes é maior ou igual a 1!</p>';
        membrosPorEquipe.focus();
        return; 
    }else{
        times.style.borderColor = '';
        warning.innerHTML = '';
    }

    if(nomes.length % totalMembros !== 0){
        textarea.style.borderColor = 'red';
        warning.innerHTML = '<p class="warning">Número de participantes não conrresponde ao número de equipes.</p>';
        textarea.focus();    
        return;
    }else{
        textarea.style.borderColor = '';
        warning.innerHTML = '';  
    }
    if(nomes.length !== totalMembros){
        warning.innerHTML = '<p class="warning">Número de participantes e equipes não conrrespondem ao total de membros inseridos.</p>';
        return;
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
        console.log(equipes);
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
        form.style.animation = 'modal .6s';
    }else{
        form.style.display = 'block';
        modal.style.display = 'none';
    }
}

btn.addEventListener('click',criarEquipes);