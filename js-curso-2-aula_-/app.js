let numeroSorteado = [];
let numeroLimiteTentativas = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirNumeroNaTela (tag, texto){
    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirNumeroNaTela("h1", "Jogo do numero secreto");
    exibirNumeroNaTela("p", "Escolha um numero de 1 a 10:");
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto){
        exibirNumeroNaTela("h1", "Acertou");
        let palavraTentativa = tentativas > 1 ?  "Tentativas" : "Tentativa";
        let mensagemTentativas = "Voce descobriu o numero secreto em " + tentativas + " " +palavraTentativa;
        exibirNumeroNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled"); //desativar botão no html

    }else{
        tentativas++
        if(chute > numeroSecreto){
            exibirNumeroNaTela("p", "O numero secreto é menor que o chute");
        }else{
            exibirNumeroNaTela("p", "O numero secreto é maior que o chute");
        }
        limparCampo();
    }
    
}
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = " ";
}

function numeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimiteTentativas + 1);
    let quantidadeTentativas = numeroSorteado.length;

    if(quantidadeTentativas == numeroLimiteTentativas){
        numeroSorteado = [];
    }

    if(numeroSorteado.includes(numeroEscolhido)){ //para verificar se tem algo dentro da lista
        return numeroAleatorio();
    }else{
        numeroSorteado.push(numeroEscolhido);//para colocar algo dentro da lista
        console.log(numeroSorteado);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

