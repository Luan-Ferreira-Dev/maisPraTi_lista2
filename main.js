const prompt = require('prompt-sync')();

const input = function (tipo, analise) {
    return function(msg) {
        while(true) {
            let resultado = tipo(prompt(msg));
            if (analise(resultado)) {
                return resultado;
            }
            console.log("Não é uma entrada válida! Tente novamente.");
        }
    }
}

const inputNumber = input(Number, (numero) => {return (numero === numero && numero >= 0);});

const tarefas = [];

//1. Escreva um programa para calcular a redução do tempo de vida de um fumante. Pergunte a quantidade de cigarros fumados por dias e quantos anos ele já fumou. Considere que um fumante perde 10 min de vida a cada cigarro. Calcule quantos dias de vida um fumante perderá e exiba o total em dias.

const t01 = {
    nome: "Tempo de vida de um fumante",
    programa: () => {
        let cigarros = inputNumber("Digite a quantidade de cigarros fumados por dia: ");
        let anos = inputNumber("Digite a quantidade de anos: ");
        let minutosPerdidos = ((anos * 365) * cigarros) * 10;
        let diasPerdidos = Math.floor(minutosPerdidos / 1440);
        console.log(`O fumante perdeu ${diasPerdidos} dias de vida.`);
    }
};

tarefas.push(t01);

//2. Escreva um programa que pergunte a velocidade de um carro. Caso ultrapasse 80 Km/h, exiba uma mensagem dizendo que o usuário foi multado. Nesse caso, exiba o valor da multa, cobrando R$ 5,00 por cada Km acima da velocidade permitida.

const t02 = {
    nome: "Multa de velocidade",
    programa: () => {
        let velocidade = inputNumber("Velocidade do carro: ");
        if (velocidade > 80) {
            let valorDaMulta = (velocidade - 80) * 5;
            console.log(`Ultrapassou ${velocidade - 80} Km/h do limite de velocidade de 80 Km/h. O valor da multa é R$ ${valorDaMulta.toFixed(2)}.`);
        } else {
            console.log("O carro está dentro do limite de velocidade.");
        }
    }
};

tarefas.push(t02);

//3. Faça um algoritmo que pergunte a distância que um passageiro deseja percorrer em Km. Calcule o preço da passagem, cobrando R$ 0.50 por Km para viagens até 200 Km e R$ 0.45 para viagens mais longas.

const t03 = {
    nome: "Preço da passagem",
    programa: () => {
        let km = inputNumber("Digite a distância que o passageiro deseja percorrer (Km): ");
        let valor = 0.5;
        if (km > 200) {
            valor = 0.45;
        }
        console.log(`Total: R$ ${(km * valor).toFixed(2)}`);
    }
}

tarefas.push(t03);

//Crie um programa que leia o tamanho de três segmentos de reta. Analise seus comprimentos e diga se é possível formar um triângulo com essas retas. Matematicamente, para três segmentos formarem um triângulo, o comprimento de cada lado deve ser menor que a soma dos outros dois.

const t04 = {
    nome: "Triângulo",
    programa: () => {
        let r1 = inputNumber("Digite o tamanho do primeiro segmento de reta: ");
        let r2 = inputNumber("Digite o tamanho do segundo segmento de reta: ");
        let r3 = inputNumber("Digite o tamanho do terceiro segmento de reta: ");
        
        if(r1 + r2 > r3 && r1 + r3 > r2 && r2 + r3 > r1) {
            console.log("Formam um triângulo");
        } else {
            console.log("Não formam um triângulo");
        }
    }
}

tarefas.push(t04);

// Crie um jogo de JoKenPo (Pedra-Papel-Tesoura).

const t05 = {
    nome: "JoKenPo",
    programa: () => {
        const inputJoKenPo = input(Number, (numero) => {return (Number.isInteger(numero) && numero >= 0 && numero <= 2);});
        let usuario = inputJoKenPo("[0] Pedra, [1] Papel, [2] Tesoura: ");
        let computador = Math.round(Math.random() * 2);
        let resultado = "Empate!";
        if (usuario > computador && (usuario - computador) ** 2 === 1 || usuario < computador && (usuario - computador) ** 2 === 4) {
            resultado = "Parabéns você venceu!";
        } else if (usuario != computador) {
            resultado = "Você perdeu!";
        }
        let nomes = ["Pedra", "Papel", "Tesoura"];
        console.log(`Você escolheu ${nomes[usuario]} e o computador escolheu ${nomes[computador]}. \n${resultado}`);
    }
}

tarefas.push(t05);

function main() {

    let inputMenu = input(Number, (it) => {return (Number.isInteger(it) && it >= 0 && it <= tarefas.length);});

    while(true) {
        console.log("\n[Menu de opções]");
        let escolhido = inputMenu(`Selecione o programa que deseja executar digitando um número de 1 a ${tarefas.length}. Digite '0' para encerrar: `);
        if (escolhido === 0) {
            break;
        }
        console.log(`\nEscolhido: ${escolhido}`)
        escolhido --;
        console.log(`${tarefas[escolhido]['nome']}`)
        tarefas[escolhido]['programa']();
    }
}

main();