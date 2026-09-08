const palavras = [
    'porca', 'casas', 'morro', 'livro', 'verde', 'porto', 'festa', 'campo',
    'mundo', 'bravo', 'noite', 'chuva', 'vento', 'folha', 'grama', 'barco',
    'terra', 'flora', 'grupo', 'piano', 'radio', 'tigre', 'amigo', 'bolsa',
    'carro', 'danca', 'mesas', 'telas', 'rotas', 'jogos', 'luzes', 'prato'
];

const maxTentativas = 5;

let palavraSecreta = '';
let tamanho = 5;
let tentativaAtual = 0;
let jogoAtivo = true;

function escolherPalavra() {
    const indice = Math.floor(Math.random() * palavras.length);
    return palavras[indice];
}

function criarGrade() {
    $('#grade').empty();

    for (let i = 0; i < maxTentativas * tamanho; i++) {
        $('#grade').append('<div class="celula"></div>');
    }

    $('#grade').css('grid-template-columns', 'repeat(' + tamanho + ', 50px)');
    $('#chute').attr('maxlength', tamanho);
}

function avaliar(chute, secreta) {
    const cores = [];
    const usado = [];

    for (let i = 0; i < tamanho; i++) {
        usado[i] = false;
    }

    for (let i = 0; i < tamanho; i++) {
        if (chute[i] === secreta[i]) {
            cores[i] = 'verde';
            usado[i] = true;
        } else {
            cores[i] = '';
        }
    }

    for (let i = 0; i < tamanho; i++) {
        if (cores[i] === 'verde') {
            continue;
        }
        cores[i] = 'cinza';
        for (let j = 0; j < tamanho; j++) {
            if (!usado[j] && chute[i] === secreta[j]) {
                cores[i] = 'amarelo';
                usado[j] = true;
                break;
            }
        }
    }

    return cores;
}

function mostrarLinha(chute, cores) {
    const inicio = tentativaAtual * tamanho;

    for (let i = 0; i < tamanho; i++) {
        const celula = $('.celula').eq(inicio + i);
        celula.text(chute[i]);
        celula.addClass(cores[i]);
    }
}

function enviarChute() {
    if (!jogoAtivo) {
        return;
    }

    const chute = $('#chute').val().toLowerCase().trim();

    if (chute.length !== tamanho) {
        $('#status').text('Digite uma palavra com ' + tamanho + ' letras.');
        return;
    }

    const cores = avaliar(chute, palavraSecreta);
    mostrarLinha(chute, cores);
    $('#chute').val('');
    tentativaAtual++;

    if (chute === palavraSecreta) {
        jogoAtivo = false;
        $('#status').text('Parabéns! Você acertou a palavra: ' + palavraSecreta + '.');
        return;
    }

    if (tentativaAtual >= maxTentativas) {
        jogoAtivo = false;
        $('#status').text('Você perdeu. A palavra era: ' + palavraSecreta + '.');
        return;
    }

    $('#status').text('');
}

function reiniciarJogo() {
    palavraSecreta = escolherPalavra();
    tamanho = palavraSecreta.length;
    tentativaAtual = 0;
    jogoAtivo = true;
    criarGrade();
    $('#chute').val('');
    $('#status').text('Nova partida iniciada. Boa sorte!');
}

$('#enviar').click(enviarChute);
$('#reiniciar').click(reiniciarJogo);

$('#chute').keypress(function (evento) {
    if (evento.which === 13) {
        enviarChute();
    }
});

reiniciarJogo();
