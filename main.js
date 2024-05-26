const prompt = require('prompt-sync')();

const input = function (tipo, analise) {
    return function(msg) {
        while(true) {
            let resultado = tipo(prompt(msg));
            if (analise(resultado)) {
                return resultado;
            }
            console.log("\x1b[31mNão é uma entrada válida! Tente novamente.\x1b[0m");
        }
    }
}

const inputNumber = input(Number, (numero) => {return (numero === numero && numero >= 0);});

const tarefas = [];

function main() {

    const inputMenu = input(Number, (numero) => {return (Number.isInteger(numero) && numero >= 0 && numero <= tarefas.length);});

    while(true) {
        console.log("\n\x1b[34m[Menu de opções]\x1b[0m");
        let escolhido = inputMenu(`Selecione o programa que deseja executar digitando um número de 1 a ${tarefas.length}. Digite '0' para encerrar: `);
        if (escolhido === 0) {
            break;
        }
        console.log(`\n\x1b[90mEscolhido: ${escolhido}\x1b[0m`)
        escolhido --;
        console.log(`${tarefas[escolhido]['nome']}`)
        tarefas[escolhido]['programa']();
    }
}

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
            console.log("O carro está dentro do limite de velocidade de 80km/h.");
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

//4. Crie um programa que leia o tamanho de três segmentos de reta. Analise seus comprimentos e diga se é possível formar um triângulo com essas retas. Matematicamente, para três segmentos formarem um triângulo, o comprimento de cada lado deve ser menor que a soma dos outros dois.

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

//5. Crie um jogo de JoKenPo (Pedra-Papel-Tesoura).

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

//6. Crie um jogo onde o computador vai sortear um número entre 1 e 5. O jogador vai tentar descobrir qual foi o valor sorteado.

const t06 = {
    nome: "Adivinhe o número",
    programa: () => {
        const inputPalpite = input(Number, (numero) => {return Number.isInteger(numero) && numero >= 1 && numero <= 5});
        console.log("Tente adivinhar o número que o computador pensou.");
        let computador = Math.round(Math.random() * 4 + 1);
        let palpite;
        let tentativas = 0
        do {
            palpite = inputPalpite("Digite seu palpite entre 1 e 5: ");
            if (palpite > computador) {
                console.log("O número é menor")
            } else if (palpite < computador) {
                console.log("O número é maior")
            }
            tentativas ++;
        } while (palpite != computador)
        console.log(`\nO computador pensou no número ${computador} e você levou ${tentativas} tentativa(s) para acertar!`);
    }
}

tarefas.push(t06);

/*7. Uma empresa de aluguel de carros precisa cobrar pelos seus serviços. O aluguel de um carro popular custa R$ 90,00 por dia e um carro de luxo custa R$ 150,00. Além disso, o cliente paga por Km percorrido. Faça um programa que leia o tipo de carro alugado (popular ou luxo), quantos dias de aluguel e quantos Km foram percorridos. No final, mostre o preço a ser pago de acordo com os dados a seguir:
    Carros populares
        - Até 100 Km percorridos: R$ 0,20 por Km
        - Acima de 100 Km percorridos: R$ 0,10 por Km
    Carros de luxo
        - Até 200 Km percorridos: R$ 0,30 por Km
        - Acima de 200 Km percorridos: R$ 0,25 por Km

*/

const t07 = {
    nome: "Aluguel de carro",
    programa: () => {
        let tipo = ["popular", "luxo"];
        const inputTipo = input(Number, (numero) => {return Number.isInteger(numero) && numero >= 0 && numero <= 1});
        let carro = {};
        carro['tipo'] = tipo[inputTipo("[0] Popular, [1] Luxo: ")];
        carro['dias'] = inputNumber("Quantos dias de aluguel: ");
        carro['Km'] = inputNumber("Quantos Km foram percorridos: ");
        let valorDia, valorKm;
        if (carro['tipo'] === "popular") {
            valorDia = 90;
            valorKm = 0.20;
            if (carro['Km'] > 100) {
                valorKm = 10;
            }
        } else {
            valorDia = 150;
            valorKm = 0.30;
            if (carro['Km'] > 100) {
                valorKm = 0.25;
            }
        }
        let total = (carro['dias'] * valorDia) + (carro['Km'] * valorKm);
        console.log("\ncarro:", carro);
        console.log(`Total: R$ ${total.toFixed(2)}`);
    }
}

tarefas.push(t07); 

/*8. Um programa de vida saudável quer dar pontos por atividades físicas realizadas que podem ser trocados por dinheiro. Cada hora de atividade física no mês vale pontos. O sistema funciona assim:
- até 10 h de atividade no mês: ganha 2 pontos por hora
- de 10 h até 20 h de atividade no mês: ganha 5 pontos por hora
- acima de 20 h de atividade no mês: ganha 10 pontos por hora
- A cada ponto ganho, o cliente fatura R$ 0,05 (5 centavos)
Faça um programa que leia quantas horas de atividade uma pessoa teve por mês. Calcule e mostre quantos pontos ela teve e quanto dinheiro ela conseguiu ganhar.
*/

const t08 = {
    nome: "Vida saudável",
    programa: () => {
        let horasAtividade = inputNumber("Digite quantas horas de atividade física você fez no mês: ");
        let valorPontos;

        if (horasAtividade < 10) {
            valorPontos = 2;
        } else if (horasAtividade < 20) {
            valorPontos = 5;
        } else {
            valorPontos = 10;
        }

        let pontos = valorPontos * horasAtividade;
        let saldo = pontos * 0.05;

        console.log(`\nVocê conseguiu ${pontos} pontos e ganhou R$ ${saldo.toFixed(2)}.`);
    }
}

tarefas.push(t08);


//9. Desenvolva um aplicativo que leia o salário e o sexo de vários funcionários. No final, mostre o total de salário pago aos homens e o total pago às mulheres. O programa vai perguntar ao usuário se ele quer continuar ou não sempre que ler os dados de um funcionário.

function somaArray(array) {
    let total = 0;
    for (i of array) {
        total += i;
    }
    return total;
}


const inputEscolha = input((escolha) => { return escolha.trim().toLowerCase()}, (escolha) => { return ["sim", "não", "s", "n"].includes(escolha)});
const t09 = {
    nome: "Salário dos funcionários",
    programa: () => {
        const inputGenero = input((genero) => {return genero.trim().toLowerCase()}, (genero) => { return ["masculino", "feminino", "m", "f"].includes(genero)});
        let homens = [];
        let mulheres = [];
        let escolha = "sim";
        while (escolha === "sim" || escolha === "s") {
            console.log();
            let genero = inputGenero("Digite o sexo do funcionário [M] para masculino, [F] para feminino: ");
            let salario = inputNumber("Salário: ");

            if (genero === "m" || genero === "masculino") {
                homens.push(salario);
            } else if (genero === "f" || genero === "feminino") {
                mulheres.push(salario)
            }
            escolha = inputEscolha("Dejesa continuar [S] para sim, [N] para não: ");
        }
        console.log(`\nNa empresa trabalha ${homens.length} homens que juntos recebem ${somaArray(homens).toFixed(2)}`);
        console.log(`Na empresa trabalha ${mulheres.length} mulheres que juntas recebem ${somaArray(mulheres).toFixed(2)}`);
    }
}

tarefas.push(t09);

/*10. Crie um programa usando a estrutura “faça enquanto” que leia vários números. A cada laço, pergunte se o usuário quer continuar ou não. No final, mostre na tela: 
    a) O somatório entre todos os valores;
    b) Qual foi o menor valor digitado;
    c) A média entre todos os valores;
    d) Quantos valores são pares.
*/

function menorArray(array) {
    let menor = array[0];
    for (i of array) {
        if (i < menor) {
            menor = i;
        }
    }
    return menor;
}

function mediaArray(array) {
    return somaArray(array) / array.length;
}

function parArray(array) {
    let resultado = [];
    for (i of array) {
        if (i % 2 === 0) {
            resultado.push(i);
        }
    }
    return resultado;
}


const inputAllNumber = input(Number, (numero) => {return numero === numero});
const t10 = {
    nome: "Números",
    programa: () => {
        let escolha;
        let numeros = [];
        do {
            numeros.push(inputAllNumber("Digite um número: "));
            escolha = inputEscolha("Dejesa continuar [S] para sim, [N] para não: ");
            console.log();
        } while (escolha === "s" || escolha === "sim")
        console.log(`\nSoma dos números: \x1b[33m${somaArray(numeros)}\x1b[0m`);
        console.log(`Menor valor digitado: \x1b[33m${menorArray(numeros)}\x1b[0m`);
        console.log(`Média entre os valores: \x1b[33m${mediaArray(numeros).toFixed(2)}\x1b[0m`);
        console.log(`Número(s) par(es): ${parArray(numeros).length}`);
    }

}

tarefas.push(t10);

//11. Desenvolva um programa que leia o primeiro termo e a razão de uma PA (Progressão Aritmética), mostrando na tela os 10 primeiros elementos da PA e a soma entre todos os valores da sequência.

const t11 = {
    nome: "Progressão Aritmética",
    programa: () => {
        let PA = [inputAllNumber("Digite o primeiro termo de uma PA: ")];
        let razao = inputAllNumber("Digite a razão: ");
        while (PA.length < 10) {
            PA.push(PA[PA.length -1] + razao);
        }
        console.log("\nSequência: ", ...PA);
        console.log(`Soma: \x1b[33m${somaArray(PA)}\x1b[0m`);
    }
}

tarefas.push(t11)

//12. Faça um programa que mostre os 10 primeiros elementos da Sequência de Fibonacci.

function fibonacci(n) {
    let fibonacci = [1, 1];
    while (fibonacci.length < n) {
        fibonacci.push(fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2]);
    }
    return fibonacci;
}

const t12 = {
    nome: "Fibonacci",
    programa: () => {
        console.log(...fibonacci(10));
    }
}

tarefas.push(t12);

//13. Crie um programa que preencha automaticamente (usando lógica, não apenas atribuindo diretamente) um vetor numérico com 15 posições com os primeiros elementos da sequência de Fibonacci.

const t13 = {
    nome: "Fibonacci [vetor]",
    programa: () => {
        console.log(fibonacci(15));
    }
}

tarefas.push(t13); 

//14. Faça um programa que leia 7 nomes de pessoas e guarde-os em um vetor. No final, mostre uma listagem com todos os nomes informados, na ordem inversa daquela em que eles foram informados.

function inverteArray(array) {
    let resultado = [];
    for (let i = array.length - 1; i >= 0; i--) {
        resultado.push(array[i]);
    }
    return resultado;
}

const inputNome = input((nome) => {return nome.trim()}, (nome) => {return (nome && !/\d/.test(nome))});

const t14 = {
    nome: "Inverte Array",
    programa: () => {
        let nomes = [];
        for (let i = 1; i <= 7; i++) {
            nomes.push(inputNome(`Insira o nome nº ${i}: `));
        }
        console.log("\nOs nomes informados na ordem inversa: \n")
        for (n of inverteArray(nomes)) {
            console.log(n);
        }
    }
}


tarefas.push(t14);


//15. Desenvolva um programa que leia 10 números inteiros e guarde-os em um vetor. No final, mostre quais são os números pares que foram digitados e em que posições eles estão armazenados.

const inputInteiro = input(Number, (numero) => {return Number.isInteger(numero)}); 

const t15 = { 
    nome: "Números pares em um Array",
    programa: () => {
        let numeros = [];
        for (let i = 1; i <= 10; i++) {
            numeros.push(inputInteiro(`Digite o ${i}º inteiro: `));
        }
        let pares = parArray(numeros);
        let pos = [];
        let i = 0;
        for (n of numeros) {
            if (pares.includes(n)) {
                pos.push(i);
            }
            i++;
        }
        console.log("\nNúmeros pares: ", ...pares);
        console.log("Posições:", ...pos);
    }
}

tarefas.push(t15);

//16. Crie uma lógica que preencha um vetor de 20 posições com números aleatórios (entre 0 e 99) gerados pelo computador. Logo em seguida, mostre os números gerados e depois coloque o vetor em ordem crescente, mostrando no final os valores ordenados.

const t16 = {
    nome: "Array de 0 a 99",
    programa: () => {
        let array = [];
        while (array.length < 20) {
            array.push(Math.round(Math.random() * 99))
        }
        console.log("Array:", ...array);
        array = array.sort((a,b) => a -b);
        console.log("Ordem crescente:", ...array);
    }
}

tarefas.push(t16);

//17. Crie um programa que leia o nome e a idade de 9 pessoas e guarde esses valores em dois vetores, em posições relacionadas. No final, mostre uma listagem contendo apenas os dados das pessoas menores de idade.

const t17 = {
    nome: "Menores de idade",
    programa: () => {
        let nomes = [];
        let idades = [];
        for (let i = 1; i <= 9; i++) {
            nomes.push(inputNome(`Insira o ${i}º nome: `));
            idades.push(inputNumber(`Insira a ${i}º idade: `));
            console.log();
        }
        console.log("Os menores de idades são: ");
        for(i in idades) {
            if(idades[i] < 18) {
                console.log(`${nomes[i]} : ${idades[i]} anos`);
            }
        }
    }
}

tarefas.push(t17);

//18. Crie um registro com o nome do funcionário, cargo e salário. Leia este registro para um funcionário e ao final escreva o conteúdo do registro.

const t18 = {
    nome: "Registro de funcionário",
    programa: () => {
        let registro = {
            nome: null, cargo: null, salario: null
        }
        registro['nome'] = inputNome("Digite o nome do funcionário: ");
        registro['cargo'] = inputNome("Digite o cargo do funcionário: ");
        registro['salario'] = inputNumber("Digite o salário do funcionário: ");

        console.log(registro);
    }
}

tarefas.push(t18);

//19. Escrever um programa para ler 5 horários. Validar cada horário fornecendo através de repetição. Escrever cada um deles no formato HH.MM.SS.


const t19 = {
    nome: "Horários",
    programa: () => {
        const inputHora = input(Number, (horas) => {return Number.isInteger(horas) && horas >= 0 && horas <= 23});
        const inputMinuto = input(Number, (minutos) => {return Number.isInteger(minutos) && minutos >= 0 && minutos <= 59});
        const inputSegundo = input(Number, (segundos) => {return Number.isInteger(segundos) && segundos >= 0 && segundos <= 59});

        for (let i = 1; i <= 5; i++) {
            console.log(`\n\x1b[32m${i}º horário\x1b[0m`)
            let horas = String(inputHora("Horas: "));
            let minutos = String(inputMinuto("Minutos: "));
            let segundos = String(inputSegundo("Segundos: "));
            console.log(`\n\x1b[33m${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}:${segundos.padStart(2, '0')}\x1b[0m`);
        }
    }
}

tarefas.push(t19);

/*20. Uma indústria faz a folha mensal de pagamentos de seus 80 empregados baseada no seguinte: existe uma tabela com os dados de cada funcionalidade: matrícula, nome e salário bruto. Escreva um programa que leia e processe a tabela e emita (escreva na tela), cada funcionário, seu contracheque, cujo formato é dado a seguir:
Matrícula:
Nome:
Salário bruto:
Dedução INSS:
Salário líquido:
(Dicas: desconto de 12%, salário líquido é a diferença entre salário bruto e a redução do INSS).
*/


const t20 = {
    nome: "Funcionários",
    programa: () => {
        let funcionarios = [];
        let escolha = "sim";
        while (escolha === "sim" || escolha === "s") {
            let funcionario = {};
            funcionario['Matrícula'] = funcionarios.length + 1;
            console.log(`\n\x1b[32mCadastro de funcionário nº ${funcionario['Matrícula']}\x1b[0m`)
            funcionario['Nome'] = inputNome("Digite o nome: ");
            funcionario['Salário bruto'] = inputNumber("Digite o salário bruto: ");
            funcionario['Dedução INSS'] = 12/100 * funcionario['Salário bruto'];
            funcionario['Salário líquido'] = funcionario['Salário bruto'] - funcionario['Dedução INSS'];
            funcionarios.push(funcionario);
            console.log();
            escolha = inputEscolha("Dejesa cadastrar mais um funcionário [S] para sim, [N] para não: ");
            console.log();
        }
        console.log(`\n\x1b[32mContracheques dos funcionários\x1b[0m`)
        for (f of funcionarios) {
            console.log("--------------------------------------------------");
            console.log(`\x1b[33mMatrícula:\x1b[0m ${f['Matrícula']}`);
            console.log(`\x1b[33mNome:\x1b[0m ${f['Nome']}`);
            console.log(`\x1b[33mSalário bruto:\x1b[0m ${f['Salário bruto'].toFixed(2)}`);
            console.log(`\x1b[33mDedução INSS:\x1b[0m ${f['Dedução INSS'].toFixed(2)}`);
            console.log(`\x1b[33mSalário líquido:\x1b[0m ${f['Salário líquido'].toFixed(2)}`);
        }
    }
}

tarefas.push(t20);

main();