let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let lateral = document.querySelector('.d1-right');
let descricao = document.querySelector('.d-1-4');
let numeros = document.querySelector('.d-1-3');
let aviso = document.querySelector('.d2');


let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa(){ 
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    for(let i=0;i<etapa.numeros;i++){
        if(i==0){
            numeroHtml += '<div class="numb flash"></div>';
        }
        else{
            numeroHtml += '<div class="numb"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((cand)=>{
        if(cand.numero===numero){
            return true;
        }
        else{
            return false;
        }
    });
    if(candidato.length>0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let x = 0; x < candidato.fotos.length; x++) {
            if(candidato.fotos[x].small){
                fotosHtml+= `<div class="d-1-image smallOne"><img src="images/${candidato.fotos[x].url}" alt="">${candidato.fotos[x].legenda}</div>`;
            }else{
                fotosHtml+= `<div class="d-1-image"><img src="images/${candidato.fotos[x].url}" alt="">${candidato.fotos[x].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    }
    else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande flash">VOTO NULO</div>';
    }
}


let botoes = document.querySelectorAll('.tl-numbers .tecladoBotao');
botoes.forEach(botao=>{
    botao.addEventListener('click',function clicou(e){
        let elNumero = document.querySelector('.numb.flash');
        if(elNumero !== null){
            elNumero.innerHTML = e.target.innerHTML;
            numero = `${numero}${e.target.innerHTML}`;
            elNumero.classList.remove('flash');

            if(elNumero.nextElementSibling!==null){
                elNumero.nextElementSibling.classList.add('flash');
            }
            else{
                atualizaInterface();
            }
        }
    });
});

function branco(){
    if(numero==''){
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande flash">VOTO EM BRANCO</div>';
    }
}

function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(votoBranco===true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }
    else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }
        else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante">FIM</div>';
            const audio = new Audio('urnaSom.mp3');
            audio.play();
            console.log(votos);
        }
    }
}

comecarEtapa();