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
    console.log("\n\x1b[31mPrograma finalizado!\x1b[0m");
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

function somarArray(array) {
    let total = 0;
    for (let i of array) {
        total += i;
    }
    return total;
}


const inputEscolha = input((escolha) => { return escolha.trim().toLowerCase()}, (escolha) => { return ["sim", "não", "s", "n"].includes(escolha)});
const inputGenero = input((genero) => {return genero.trim().toLowerCase()}, (genero) => { return ["masculino", "feminino", "m", "f", "homem", "mulher"].includes(genero)});
const t09 = {
    nome: "Salário dos funcionários",
    programa: () => {
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
        console.log(`\nNa empresa trabalha ${homens.length} homens que juntos recebem ${somarArray(homens).toFixed(2)}`);
        console.log(`Na empresa trabalha ${mulheres.length} mulheres que juntas recebem ${somarArray(mulheres).toFixed(2)}`);
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
    for (let i of array) {
        if (i < menor) {
            menor = i;
        }
    }
    return menor;
}

function mediaArray(array) {
    return somarArray(array) / array.length;
}

function parArray(array) {
    let resultado = [];
    for (let i of array) {
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
        console.log(`\nSoma dos números: \x1b[33m${somarArray(numeros)}\x1b[0m`);
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
        console.log(`Soma: \x1b[33m${somarArray(PA)}\x1b[0m`);
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
        for (let n of inverteArray(nomes)) {
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
        for (let n of numeros) {
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
        for(let i in idades) {
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
        for (let f of funcionarios) {
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


//21. Faça uma função que recebe, por parâmetro, a altura (alt) e o sexo de uma pessoa e retorna o seu peso ideal. Para homens, calcular o peso ideal usando a fórmula: peso ideal = 72.7 x alt - 58 e, para mulheres, peso ideal = 62.1 x alt - 44.7.

function pesoIdeal(altura, sexo) {
    if (sexo === 'homem') {
        return 72.7 * altura - 58;
    } else {
        return 62.1 * altura - 44.7;
    }
}

const t21 = {
    nome: 'Peso ideal',
    programa: () => {
        let altura = inputNumber("Digite a altura (ex: 1.82): ");
        let sexo = inputGenero("Digite o sexo (ex: masculino, feminino): ");
        sexo = ["masculino", "homem"].includes(sexo)?"homem":"mulher";
        console.log(`\nO peso ideal é \x1b[33m${pesoIdeal(altura, sexo).toFixed(2)}\x1b[0m`);
    }
}
tarefas.push(t21);

//22. A prefeitura de uma cidade fez uma pesquisa entre os seus habitantes, coletando dados sobre o salário e número de filhos. Faça uma função que leia esses dados para um número não determinado de pessoas e retorne a média de salário da população, a média do número de filhos, o maior salário e o percentual de pessoas com salário até R$ 350,00.

function maiorDoArray(array) {
    let maior = array[0];
    for (let i of array) {
        if (i > maior) {
            maior = i;
        }
    }
    return maior;
}

const t22 = {
    nome: "Pesquisa da prefeitura",
    programa: () => {
        let pessoas = [];
        let escolha = "sim";
        while (escolha === "sim" || escolha == "s") {
            pessoas.push({'salário': inputNumber(`Informe o salário da ${pessoas.length + 1}º Pessoa: `), "filhos":inputInteiro("Quantos filhos ela tem: ")});
            console.log()
            escolha = inputEscolha("Dejesa continuar [S] para sim, [N] para não: ");
            console.log()
        }
        let salarios = pessoas.map((pessoa) => pessoa['salário']);
        let mediaSalarios = somarArray(salarios) / pessoas.length;
        let mediaFilhos = somarArray(pessoas.map((pessoa) => pessoa['filhos'])) / pessoas.length;
        let maiorSalario = maiorDoArray(salarios);
        let percentualAte350 = pessoas.filter((pessoa) => pessoa['salário'] <= 350).length * 100 / pessoas.length;

        console.log("\x1b[32mResultado da pesquisa\x1b[0m");
        console.log("--------------------------------------------------");
        console.log(`\x1b[33mA média salarial da população:\x1b[0m R$ ${mediaSalarios.toFixed(2)}`);
        console.log(`\x1b[33mA média de filhos:\x1b[0m ${mediaFilhos.toFixed(2)}`);
        console.log(`\x1b[33mO maior salário:\x1b[0m R$ ${maiorSalario.toFixed(2)}`);
        console.log(`\x1b[33mo percentual de pessoas com salário até R$ 350,00:\x1b[0m ${percentualAte350.toFixed(2)} %`);
    }
}

tarefas.push(t22);

//23. Criar e imprimir a matriz identidade MI[1..7,1..7] em que todos os elementos da diagonal principal são iguais a 1 e os demais são nulos.

const t23 = {
    nome: "Matriz identidade MI[1..7,1..7]",
    programa: () => {
        let matriz = [];
        for (let i = 1; i <= 7; i++) {
            let linha = [];
            for (let j = 1; j <= 7; j++) {
                let elemento = null
                if (i === j) {
                    elemento = 1;
                }
                linha.push(elemento);
            }
            matriz.push(linha);
        }
        console.log();
        matriz.forEach((linha) => console.log(...linha));
    }
}

tarefas.push(t23);

//24. Dada uma matriz M[1..6,1..8], criar um vetor C que contenha, em cada posição, a quantidade de elementos negativos da linha correspondente de M.

function criarMatriz(linhas, colunas, elemento) {
    let matriz = [];
    for (let l = 0; l < linhas; l++) {
        let linha = [];
        for (let c = 0; c < colunas; c++) {
            let numero = elemento(l, c);
            linha.push(numero)
        }
        matriz.push(linha);
    }
    return matriz;
}

function mostrarMatriz(matriz) {
    let pad = 0
    matriz.forEach((linha) => linha.forEach((elemento) => {
        if (String(elemento).length > pad) {
            pad = String(elemento).length
        }
    }))
    matriz.forEach((linha) => {
        let msg = ""
        linha.forEach((elemento) => {
            msg += "[\x1b[33m" + `${elemento}`.padStart(pad, " ") + "\x1b[0m]";
        });
        console.log(msg);
    })
}

const t24 = {
    nome: "matriz M[1..6,1..8] e vetor C",
    programa: () => {
        console.log("\n\x1b[32mMatriz M:\x1b[0m");
        let matriz = criarMatriz(6, 8, () => Math.floor(Math.random() * (1000 + 1000) + 1) -1000);
        mostrarMatriz(matriz);
        let vetor = []
        matriz.forEach((linha) => {
            let negativos = 0;
            linha.forEach((elemento) => {
                if(elemento < 0) {
                    negativos++;
                }
                })
            vetor.push(negativos);
        })
        console.log("\n\x1b[32mVetor C com a quantidade de elementos negativos da linha correspondente da matriz M:\x1b[0m");
        console.log(vetor);
    }
}

tarefas.push(t24);

function SomarColunas(matriz) {
    let resultado = []
    for(let i = 0; i < matriz[0].length; i++) {
        let soma = 0;
        for(let j = 0; j < matriz.length; j++) {
            soma += matriz[j][i];
        }
        resultado.push(soma);
    }
    return resultado;
}

//25. Faça um algoritmo que leia uma matriz de 15 X 20 de números reais e mostre a soma de cada coluna separadamente.

const t25 = {
    nome: "Soma de cada coluna",
    programa: () => {
        let matriz = criarMatriz(15, 20, () => Math.floor(Math.random() * 100));
        console.log("\n\x1b[32mMatriz 15 X 20:\x1b[0m");
        mostrarMatriz(matriz);
        let somaColunas = SomarColunas(matriz);
        let contador = 0;
        console.log("\n\x1b[32mA soma de cada coluna:\x1b[0m ")
        somaColunas.forEach((elemento) => {
            contador++;
            console.log(`${contador}º Coluna:`.padStart(11, " "), elemento);
        })
    }
}

tarefas.push(t25);

//26. Dadas duas matrizes numéricas A[1..3,1..5] e B[1..3,1..5], calcular a matriz produto P[1..3,1..5].

const t26 = {
    nome: "Matriz produto de duas matrizes",
    programa: () => {
        let matrizA = criarMatriz(3, 5,() => Math.floor(Math.random() * 100));
        let matrizB = criarMatriz(3, 5,() => Math.floor(Math.random() * 100));
        console.log("\n\x1b[32mMatriz A:\x1b[0m")
        mostrarMatriz(matrizA);
        console.log("\n\x1b[32mMatriz B:\x1b[0m")
        mostrarMatriz(matrizB);
        let matrizP = [];
        for (let i = 0; i < matrizA.length; i++) {
            let linha = [];
            for (let j = 0; j < matrizA[0].length; j++){
                linha.push(matrizA[i][j] * matrizB[i][j]);
            }
            matrizP.push(linha);
        }
        console.log("\n\x1b[32mMatriz Produto:\x1b[0m")
        mostrarMatriz(matrizP)
    }
}

tarefas.push(t26)

//27. Elaborar um algoritmo que leia uma matriz M(6,6) e um valor A. Após a leitura, multiplicar a matriz M pelo valor A e colocar os valores da matriz multiplicados por A em um vetor V(36). Escrever o vetor V no final.

const t27 = {
    nome: "Matriz M(6,6) * valor A",
    programa: () => {
        console.log("\n\x1b[32mDigite as posições da Matriz M(6,6)\x1b[0m");
        let matriz = criarMatriz(6, 6, (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `));
        console.log();
        let valor = inputAllNumber("Digite o valor de A:");
        let vetor = [];
        matriz.forEach((linha) => linha.forEach((elemento) => vetor.push(elemento * valor)));
        console.log("\n\x1b[32mVetor V(36)\x1b[0m\n", vetor);
    }
}

tarefas.push(t27);

/*
28. Fazer um algoritmo para receber uma matriz 10 x 10 e devolver o resultado pedido no item:
a) a soma dos elementos acima da diagonal principal;
b) a soma dos elementos abaixo da diagonal principal;
*/

const t28 = {
    nome: "Matriz 10 x 10",
    programa: () => {
        let matriz = criarMatriz(10, 10, () => Math.floor(Math.random() * 100));
        somaAcima = 0;
        somaAbaixo = 0;

        console.log("\n\x1b[32mMatriz 10 x 10\x1b[0m");
        mostrarMatriz(matriz);

        for(let i = 0; i < matriz.length; i++) {
            for(let j = 0; j < matriz[0].length; j++){
                if (j > i) {
                    somaAcima += matriz[j][i];
                } else if (j < i) {
                    somaAbaixo += matriz[j][i] ;
                }
            }
        }
        console.log("\n\x1b[32mSoma dos elementos\x1b[0m")
        console.log("Acima da diagonal principal:", somaAcima);
        console.log("Abaixo da diagonal principal:", somaAbaixo);
    }
}

tarefas.push(t28);



/*29. Escreva um algoritmo que leia uma matriz M(5,5) e calcule as somas:
a) dalinha 4 de M;
b) dacoluna 2 deM;
c) dadiagonal principal;
d) todos os elementos da matriz M.
Escrever essas somas e a matriz.
*/

const t29 = {
    nome: "Somas da matriz M(5,5)",
    programa: () => {
        let matriz = criarMatriz(5, 5, (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `));
        let somaLinha4 = 0;
        let somaColuna2 = 0;
        let somaDiagonalPrincipal = 0;
        let somaTotal = 0;
        for (let i in matriz) {
            for(let j in matriz[i]) {
                if (i == 3) {
                    somaLinha4 += matriz[i][j];
                }
                if (j == 1) {
                    somaColuna2 = matriz[i][j];
                }
                if (i == j) {
                    somaDiagonalPrincipal += matriz[i][j];
                }
                somaTotal += matriz[i][j];
            }
        }
        console.log();
        mostrarMatriz(matriz);
        console.log("\n\x1b[32m[Resultados]\x1b[0m");
        console.log("Soma da linha 4:", somaLinha4);
        console.log("Soma da coluna 2:", somaColuna2)
        console.log("Soma da diagonal principal:", somaDiagonalPrincipal)
        console.log("Soma de todos elementos:", somaTotal)
    }
}

tarefas.push(t29);

// 30. Escrever um algoritmo que lê uma matriz M(5,5) e cria 2 vetores SL(5) e SC(5) que contenham, respectivamente, as somas das linhas e das colunas de M. Escrever a matriz e os vetores criados.

const t30 = {
    nome: "Soma das linhas e colunas da Matriz(5,5)",
    programa: () => {
        console.log("\n\x1b[32mDigite as posições da Matriz(5,5)\x1b[0m");
        let matriz = criarMatriz(5, 5, (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `));
        let vetorSL = [];
        matriz.forEach((linha) => vetorSL.push(somarArray(linha)));
        let vetorSC = SomarColunas(matriz);
        console.log("\n\x1b[32mMatriz(5,5)\x1b[0m");
        mostrarMatriz(matriz);
        console.log("\nVetor SL:", vetorSL);
        console.log("Vetor SC:", vetorSC);
    } 
}

tarefas.push(t30);

//31. Escreva um algoritmo que leia um número inteiro A e uma matriz V 30 x 30 de inteiros.Conte quantos valores iguais a A estão na matriz. Crie, a seguir, uma matriz X contendo todos os elementos de V diferentes de A. Mostre os resultados.

const t31 = {
    nome: "Matriz V 30 x 30",
    programa: () => {
        let valorA = inputInteiro("Digite o valor de A: ");
        let escolha = inputEscolha("Gerar valores para matriz (S)im ou (N)ão: ");
        let elemento = (linha, coluna) => inputInteiro(`Posição [${linha}][${coluna}]: `)
        if (["sim", "s"].includes(escolha)) {
            elemento = () => Math.floor(Math.random() * 100);
        }
        let matriz = criarMatriz(30, 30, elemento);
        console.log("\n\x1b[32mMatriz V 30 x 30\x1b[0m");
        mostrarMatriz(matriz);
        let valoresIguaisA = 0;
        matriz.forEach((linha) => linha.forEach((elemento) => {if (elemento === valorA) valoresIguaisA ++}));
        console.log("Quantidade de valor igual a A:", valoresIguaisA);
        let matrizSemA = [];
        matriz.forEach((linha) => {matrizSemA.push(linha.filter((elemento) => elemento != valorA))});
        console.log("\n\x1b[32mMatriz V sem elemento A\x1b[0m");
        mostrarMatriz(matrizSemA);
    }
}

tarefas.push(t31);

//32. Escrever um algoritmo que lê uma matriz M(12,13) e divida todos os 13 elementos de cada uma das 12 linhas de M pelo maior elemento em módulo daquela linha. Escrever a matriz lida e a modificada.

function maiorDoArrayModulo(array) {
    let maior = array[0];
    for (let i of array) {
        if (i * i > maior * maior) {
            maior = i;
        }
    }
    return maior;
}

const t32 = {
    nome: "Matriz M(12, 13) cada linha dividida pelo maior elemento em módulo daquela linha",
    programa: () => {
        let escolha = inputEscolha("Gerar valores para matriz (S)im ou (N)ão: ");
        let elemento = (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `)
        if (["sim", "s"].includes(escolha)) {
            elemento = () => Math.floor(Math.random() * (100 + 100) + 1) -100;
        }
        let matriz = criarMatriz(12, 13, elemento);
        console.log("\n\x1b[32mMatriz M(12,13)\x1b[0m");
        mostrarMatriz(matriz);
        let matrizDividida = [];
        for (let i = 0; i < matriz.length; i++) {
            let maior = maiorDoArrayModulo(matriz[i]);
            let linha = []
            for (let j = 0; j < matriz[i].length; j++) {
                linha.push((matriz[i][j] / maior).toFixed(2));
            }
            matrizDividida.push(linha);
        }
        console.log("\n\x1b[32mMatriz M(12,13) dividida\x1b[0m");
        mostrarMatriz(matrizDividida);
    } 
}

tarefas.push(t32);


// 33. Faça um algoritmo que leia uma matriz 3 x 3 e após a leitura, multiplique os elementos da diagonal principal com a média dos elementos da diagonal secundária.

const t33 = {
    nome: "Diagonal principal * média da diagonal secundária",
    programa: () => {
        console.log("\n\x1b[32mDigite as posições da Matriz(3,3)\x1b[0m");
        let matriz = criarMatriz(3, 3, (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `));
        console.log();
        mostrarMatriz(matriz, 3);
        let diagonalPrincipal = [];
        let diagonalSecundaria = [];
        for (let i = 0; i < matriz.length; i++){
            for (let j = 0; j < matriz[i].length; j++) {
                if (i === j) {
                    diagonalPrincipal.push(matriz[i][j]);
                    diagonalSecundaria.push(matriz[i][matriz[i].length - 1 - j]);
                }
            }
        }
        let mediaSecundaria = Number((somarArray(diagonalSecundaria) / diagonalSecundaria.length).toFixed(2));
        let multiploPrincipal = diagonalPrincipal.map((elemento) => Number((elemento*mediaSecundaria).toFixed(2)));

        console.log("\nA diagonal secundária é formada por:", diagonalSecundaria);
        console.log("A média é:", mediaSecundaria);
        console.log("\nA diagonal principal é formada por:", diagonalPrincipal);
        console.log("\nA diagonal principal multiplicada pela média da secundária é:", multiploPrincipal);
    }
}

tarefas.push(t33)

//34. Faça umalgoritmo que leia uma matriz 50 x 50 de números reais. A seguir, multiplique cada linha pelo elemento da diagonal principal daquela linha. Mostre a matriz após as multiplicações.

const t34 = {
    nome: "Matriz 50x50",
    programa: () => {
        let escolha = inputEscolha("Gerar valores para matriz (S)im ou (N)ão: ");
        let elemento = (linha, coluna) => inputAllNumber(`Posição [${linha}][${coluna}]: `)
        if (["sim", "s"].includes(escolha)) {
            elemento = () => Math.floor(Math.random() * (10 + 10) + 1) -10;
        }
        let matriz = criarMatriz(50, 50, elemento);
        console.log("\n\x1b[32mMatriz 50 x 50\x1b[0m");
        mostrarMatriz(matriz);
        let matrizMultiplciada = [];
        for (let i = 0; i < matriz.length; i++) {
            let linha = [];
            for (let j = 0; j < matriz[i].length; j++) {
                linha.push(matriz[i][j] * matriz[i][i]);
            }
            console.log(matriz[i][i]);
            matrizMultiplciada.push(linha);
        }
        console.log("\n\x1b[32mMatriz 50 x 50 multiplicada pela diagonal principal\x1b[0m");
        mostrarMatriz(matrizMultiplciada);
    }
}
tarefas.push(t34);

// 35. Elaborar um algoritmo que leia um conjunto de 30 valores e os coloca em 2 vetores conforme forem pares ou ímpares. O tamanho do vetor é de 5 posições. Se algum vetor estiver cheio, escrevê-lo. Terminada a leitura, escrever o conteúdo dos dois vetores. Cada vetor pode ser preenchido quantas vezes forem necessárias

const t35 = {
    nome: "Vetores de pares e ímpares",
    programa: () => {
        let pares = [];
        let impares = [];

        for(let i = 1; i <= 30; i++) {
            let numero = inputNumber(`Digite o ${i}º número: `);
            if (numero % 2 === 0) {
                pares.push(numero);
                if (pares.length >= 5) {
                    console.log("\nVetor de pares cheio:", pares, "\n");
                    pares = [];
                }
            }else {
                impares.push(numero);
                if (impares.length >= 5) {
                    console.log("\nVetor de impares cheio:", impares, "\n");
                    impares = [];
                }
            }
    
           
        }
        console.log("\nVetor de pares:", pares,"\nVetor de impares:", impares);

    }
}

tarefas.push(t35)

// 36. Escreva um algoritmo que leia um vetor de 13 elementos inteiros, que é o Gabarito de um teste da loteria esportiva. Leia, a seguir, para cada um dos 100 apostadores, o número do seu cartão e um vetor de Respostas de 13 posições. Verifique para cada apostador o número de acertos, comparando o vetor de Gabarito com o vetor de Respostas. Escreva o número do apostador e o númerode acertos.Se o apostador tiver 13 acertos, mostrar a mensagem "Parabéns, tu foi o GANHADOR"


const t36 = {
    nome: "Teste loteria",
    programa: () => {
        const inputLoteria  = (array) => {
            return input(Number, (numero) => Number.isInteger(numero) && numero > 0 && numero <= 99 && !array.includes(numero));
        }
        let apostar = () => {
            let aposta = [];
            for (let i = 1; i <= 13; i++) {
                let numero = inputLoteria(aposta)(`Digite o ${i}º número (1 a 99): `);
                aposta.push(numero);
            }
            return aposta;
        }

        let gerarAposta = () => {
            let aposta = [];
            while (aposta.length < 13) {
                let numero = Math.floor(Math.random() * 99) + 1;
                if (!aposta.includes(numero)) {
                    aposta.push(numero);
                }
            }
            return aposta;
        }
        console.log("\n\x1b[32mDigite o gabarito 13 números \x1b[0m");
        let gabarito = apostar();
        let apostadores = [];
        let aposta = apostar;
        for (let i = 1; i <= 100; i++){
            if (aposta != gerarAposta) {
                let escolha = inputEscolha(`Gerar automaticamente ${101 -i} apostadores, (S)im ou (N)ão:`);
                if (escolha === "sim" || escolha === "s") {
                    aposta = gerarAposta;
                }else {
                    console.log(`\n\x1b[32mDigite o palpite do apostador nº${i}: \x1b[0m`);
                }
            }
            apostadores.push({
                'número do cartão': i,
                acertos: 0,
                aposta: aposta(),
            });
        }

        console.log("\n\x1b[32mApostadores\x1b[0m");
        for (let apostador of apostadores) {
            for (let numero of apostador.aposta) {
                if (gabarito.includes(numero)){
                    apostador.acertos++;
                }
            }
            console.log()
            console.log("Número do cartão:", apostador['número do cartão']);
                console.log("Aposta: ", ...apostador['aposta']);
                console.log("Acertos:", apostador['acertos']);
                if (apostador['acertos'] === 13) {
                    console.log("\x1b[32mParabéns, tu foi o GANHADOR\x1b[0m");
                }
            }
    }


}

tarefas.push(t36);

// 37. Escreva um algoritmo que leia um vetor G de 20 elementos caractere que representa o gabarito de uma prova. A seguir, para cada um dos 50 alunos da turma, leia o vetor de respostas (R) do aluno e conte o número de acertos. Mostre o número de acertos do aluno e uma mensagem “APROVADO” se a quantidade de acertos for maior ou iguala 12; e mostre uma mensagem de “REPROVADO”,caso contrário.

const t37 = {
    nome: "Notas dos alunos",
    programa: () => {
        const inputGabarito = input((resposta) => resposta.toUpperCase().trim(), (resposta) => ["A","B","C","D"].includes(resposta));
        let vetorG = [];
        console.log("\n\x1b[32mDigite o gabarito da prova\x1b[0m");
        for(let i = 1; i <= 20; i++){
            vetorG.push(inputGabarito(`A resposta correta da ${i}º pergunta (A, B, C, D): `));
        }
        let gerarResposta = () => {
            let respostas = ["A","B","C","D"];
            let resultado = [];
            while(resultado.length < 20) {
                let escolha = Math.floor(Math.random() * 4);
                resultado.push(respostas[escolha]);
            }
            return resultado;
        }
        console.log("\n\x1b[32mGabarito:\x1b[0m", ...vetorG);
        console.log();
        escolha = inputEscolha("Gerar respostas dos alunos automaticamente: (S)im ou (N)ão: ");
        for(let i = 1; i <= 50; i++) {
            let respostas = [];
            if (escolha === "sim" || escolha === "s"){
                respostas = gerarResposta();
            } else {
                console.log(`\n\x1b[32mDigite o cartão resposta do aluno nº ${i}\x1b[0m`);
                for(let i = 1; i <= 20; i++){
                    vetorG.push(inputGabarito(`A resposta da ${i}º pergunta (A, B, C, D, E): `));
                }
            }
            let acertos = 0;
            for (let a = 0; a < 20; a++){
                if (vetorG[a] === respostas[a]) {
                    acertos++;
                }
            }
            console.log(`\nO ${i}º aluno acertou ${acertos} perguntas.`)
            console.log("Respostas: ",...respostas)
            if(acertos >= 12) {
                console.log("\x1b[32mAPROVADO\x1b[0m");
            }else {
                console.log("\x1b[31mREPROVADO\x1b[0m");
            }
        } 
    } 
}

tarefas.push(t37);


// 38. Elabore um algoritmo que leia um vetor de 6 posições e após sua leitura leia outra variável identificadora que calcule a operação conforme a informação contida nesta variável:
// 1- soma dos elementos;
// 2- produto dos elementos;
// 3- média do selementos;
// 4- ordene os elementos em ordem crescente;
// 5- mostre o vetor.

const t38 = {
    nome: "Escolha a operação para o Vetor (6)",
    programa: () => {
        let vetor6 = [];
        console.log("\n\x1b[32mDigite o valor das posições do vetor 6:\x1b[0m");
        while (vetor6.length < 6) {
            vetor6.push(inputAllNumber(`Digite o valor da posição nº${vetor6.length + 1}: `))
        }

        function somarElementos(array) {
            let soma = 0
            for (elemento of array) {
                soma += elemento
            }
            return soma;
        }

        function produtoElementos(array) {
            let produto = 1; 
            for (elemento of array) {
                produto *= elemento
            }
            return produto;
        }

        function mediaElementos(array) {
            return somarElementos(array) / array.length;
        }

        function ordenarElementos(array) {
            return array.sort((a, b) => a - b);
        }

        let opcoes = {
            'Soma dos elementos': somarElementos,
            'Produto dos elementos': produtoElementos,
            'Média do selementos': mediaElementos,
            'Ordene os elementos em ordem crescente': ordenarElementos
        };

        console.log();
        let menu = ['Soma dos elementos', 'Produto dos elementos', 'Média do selementos', 'Ordene os elementos em ordem crescente'];

        for (let i = 0; i < menu.length; i++) {
            console.log(`${i + 1} - ${menu[i]}`)
        }
        console.log();
        const inputMenu = input(Number, (numero) => Number.isInteger(numero) && numero >= 0 && numero <= menu.length);
        let identificador = inputMenu("Escolha a operação: ");
        identificador = opcoes[menu[identificador - 1]];
        console.log(identificador(vetor6));



    }
}

tarefas.push(t38)

//39. Faça um algoritmo que leia um vetor (A) de 100 posições. Em seguida, compacte o vetor, retirando os valores nulos e negativos. Coloque o resultado no vetor B.

const inputVetor = input((numero) => {if (numero === "" || Number(numero) === NaN) {return null;} else { return Number(numero);}}, () => true);
const t39 ={
    nome: "Vetor (A) de 100 posições",
    programa: () => {
        let vetorA = [];
        console.log("\n\x1b[32mPreencha o vetor (A) de 100 posições\x1b[0m");
        while(vetorA.length < 100) {
            vetorA.push(inputVetor(`Digite a posição nº ${vetorA.length + 1}: `));
        }
        console.log("\n\x1b[32mVetor (A) de 100 posições\x1b[0m");
        console.log(vetorA);

        let vetorB = vetorA.filter((numero) => numero >= 0 && numero != null);
        console.log("\n\x1b[32mVetor (B)\x1b[0m");
        console.log(vetorB);

    }
}

tarefas.push(t39)


//40. Faça um algoritmo que leia um vetor de 5 elementos inteiros, correspondentes ao resultado oficial da Loto. A seguir, leia 50 conjuntos de vetores (com 5 elementos inteiros cada), representando as apostas feitas. Compare os números das apostas com o resultado oficial e mostre uma mensagem ("Ganhador") se todos os números corresponderem ao resultado oficial. (Observação: não é necessário procurar por ternos e quadras, apenas por quinas.)

const t40 ={
    nome: "Loteria",
    programa: () => {
        let resultado = [];
        const inputLoteria = (array) => { return input(Number, (numero) => Number.isInteger(numero) && numero > 0 && numero <= 50 && !array.includes(numero))};
        console.log(`\n\x1b[32mNúmeros sorteados(1 a 50)\x1b[0m`);
        while (resultado.length < 5) {
            resultado.push(inputLoteria(resultado)(`Digite o ${resultado.length + 1}º número sorteado: `));
        }
        let apostas = [];
        let vencedores = [];
        for (let i = 1; i <= 50; i++) {
            console.log(`\n\x1b[32mApostador nº${i}\x1b[0m`);
            let aposta = [];
            let acertos = 0;
            while (aposta.length < 5) {
                aposta.push(inputLoteria(aposta)(`Digite o ${aposta.length + 1}º número sorteado(1 a 50): `));
            }
            apostas.push(aposta);
            for (let numero of aposta) {
                if (resultado.includes(numero)) {
                    acertos++
                }
            }
            if (acertos === 5) {
                vencedores.push(i);
            }
        }

        console.log();
        for (let i of vencedores) {
            console.log(`Jogador nº \x1b[32m${i}\x1b[0m foi o vencedor\x1b[0m`);
        }
    }
}

tarefas.push(t40)

//41. Dado o objeto pessoa com propriedades nome e idade, acesse e imprima o valor de idade. Adicione uma nova propriedade chamada email ao objeto pessoa que já possui nome e idade.

const t41 ={
    nome: "Objeto pessoa",
    programa: () => {
        let pessoa = {
            nome: "Mark Zuckerberg",
            idade: 40
        }

        console.log(`\n${pessoa.nome} tem ${pessoa.idade} anos.`)
        pessoa.email = "zuck@fb.com"
        console.log("\n\x1b[32mObjeto pessoa:\x1b[0m",pessoa);
    }
}

tarefas.push(t41)

//42. Crie um objeto chamado dados que contém várias propriedades, incluindo números, strings e arrays. Escreva uma função que retorne um novo objeto apenas com as propriedades que são arrays.

const t42 ={
    nome: "Retornando arrays de um objetos",
    programa: () => {
        let mercado = {
            nome: "Super Mercado",
            numero: 1358,
            listaDeFrutas: ["Manga", "Maçã", "Melão", "Melancia", "Morango"],
            listaDeBebidas: ["Coca-cola", "Pepsi"]
        }

        console.log("\n\x1b[32mObjeto\x1b[0m");
        console.log(mercado);

        function apenasArrays(objeto) {
            let novoObjeto = {};
            for(let key in objeto) {
                if(typeof(objeto[key]) === "object") {
                    novoObjeto[key] = objeto[key];
                }
            }
            return novoObjeto;
        }

        console.log("\n\x1b[32mNovo objeto com apenas os arrays\x1b[0m");
        console.log(apenasArrays(mercado));
    }
}

tarefas.push(t42)

//43. Dado dois objetos, obj1 e obj2, escreva uma função que crie um novo objeto combinando as propriedades de ambos, onde as propriedades de obj2 têm precedência sobre as do obj1 em caso de conflitos.

const t43 ={
    nome: "Combinando dois objetos",
    programa: () => {
        let obj1 = {
            nome: "Jim Parsons",
            profissao: "Ator",
            sexo: "Masculino",
            idade: 51
        }

        let obj2 = {
            nome: "Sheldon Cooper",
            profissao: "Físico teórico",
            origem: "Galveston, Texas",
        }
        
        function combinarObjetos(objeto1, objeto2) {
            let objetoCombinado = {}
            for (let propriedade in objeto1) {
                objetoCombinado[propriedade] = objeto1[propriedade];
            }
            for (let propriedade in objeto2) {
                objetoCombinado[propriedade] = objeto2[propriedade];
            }
            return objetoCombinado;
        }

        console.log(combinarObjetos(obj1, obj2));
    }
}

tarefas.push(t43)

//44. Escreva uma função que conte quantas propriedades do tipo string existem em um objeto e retorne esse número.

const t44 ={
    nome: "Quantidades de propriedades do tipo em um objeto",
    programa: () => {
        let filme = {
            nome: "Tropas Estelares",
            diretor: "Paul Verhoeven",
            genero: "Ação/Ficção científica",
            ano: 1997,
            imdb: 7.3,
            sinopse: "Em um futuro distante, a Terra está em guerra contra uma raça de insetos gigantes alienígenas."
        }

        console.log("\n\x1b[32mObjeto filme\x1b[0m");
        console.log(filme);

        console.log(`\n\x1b[32mPossui \x1b[33m${contarPropriedade(filme, "string")}\x1b[32m propriedades do tipo string.\x1b[0m`);

        function contarPropriedade(objeto, tipo) {
            let contador = 0
            for (let key in objeto) {
                if (typeof(objeto[key]) === tipo){
                    contador++
                }
            }
            return contador;
        }
    }
}

tarefas.push(t44)

// 45. Dado um array de strings, crie um objeto onde cada string é uma chave, e seu valor é o número de vezes que a string aparece no array.

const t45 ={
    nome: "Criando objeto com o número de vezes que a string aparece no array",
    programa: () => {
        let array = ["Brasil", "Brasil", "Brasil", "Brasil", "Brasil", "Alemanha", "Alemanha", "Alemanha", "Alemanha", "Itália", "Itália","Itália", "Itália", "Argentina", "Argentina", "Argentina"];
        let objeto = {};
        for (let nome of array) {
            if (objeto[nome]) {
                objeto[nome] ++
            } else {
                objeto[nome] = 1;
            }
        }
        console.log("\n\x1b[32mArray:\x1b[0m", array);
        console.log("\n\x1b[32mObjeto criado: \x1b[0m", objeto);
    }
}

tarefas.push(t45)

// 46. Suponha que você tem um array de objetos onde cada objeto representa uma venda com vendedor e valor. Escreva uma função que retorne um objeto que sumarize o total de vendas por vendedor.

const t46 ={
    nome: "Vendas",
    programa: ()=> {
        let vendas = [
            {vendedor: "Fred Weasley", valor: 300}, {vendedor: "Jorge Weasley", valor: 900}, {vendedor: "Draco Malfoy", valor: 1200}, {vendedor: "Harry Potter", valor: 1700},
            {vendedor: "Harry Potter", valor: 700}, {vendedor: "Harry Potter", valor: 800}, {vendedor: "Jorge Weasley", valor: 800}, {vendedor: "Fred Weasley", valor: 1900},
            {vendedor: "Percy Weasley", valor: 3500}, {vendedor: "Percy Weasley", valor: 500}, {vendedor: "Fred Weasley", valor: 1500}, {vendedor: "Fred Weasley", valor: 300},
        ]

        console.log("\n\x1b[32mArray com as vendas:\x1b[0m", vendas);
        function sumarizarVendas(array) {
            let sumario = {}
            for (let venda of array) {
                if(sumario[venda.vendedor]) {
                    sumario[venda.vendedor] += venda.valor;
                }else {
                    sumario[venda.vendedor] = venda.valor;
                }
            }
            return sumario;
        }
        console.log("\n\x1b[32mTotal de vendas por vendedor\x1b[0m");
        console.log(sumarizarVendas(vendas));
    }
}

tarefas.push(t46)

// 47. Crie uma função que transforme um objeto de entrada aplicando uma função fornecida a cada uma das propriedades do objeto, retornando um novo objeto com os resultados.

const t47 ={
    nome: "Objeto transformado",
    programa: () => {
        let livro  = {
            nome: "O caminho dos reis",
            autor: "Brandon Sanderson",
            ano: "2010"
        }

        function transformarObjeto(objeto, funcao) {
            let novoObjeto = {};
            for (let key in objeto) {
                novoObjeto[key] = funcao(objeto[key]);
            }
            return novoObjeto;
        }

        let livroModificado = transformarObjeto(livro, (propriedade) => propriedade.toUpperCase());

        console.log("\n\x1b[32mObjeto de entrada\x1b[0m");
        console.log(livro);
        console.log("\n\x1b[32mObjeto de saída\x1b[0m");
        console.log(livroModificado);
    }
}

tarefas.push(t47)

// 48. Você recebe dois objetos que representam o inventário de duas lojas diferentes: inventarioLojaA e inventarioLojaB. Cada chave é um item, e o valor é a quantidade desse item em estoque. Escreva uma função que combine os inventários em um único objeto. Se um item aparecer em ambas aslojas, some as quantidades.

const t48 ={
    nome: "Combinação do inventário de duas lojas",
    programa: () => {
        let inventarioLojaA = {
            "Computador": 10,
            "Celular": 15,
            "Notebook": 20,
            "PlayStation": 12,
        }

        let inventarioLojaB = {
            "Tv": 15,
            "Celular": 9,
            "PlayStation": 1,
            "Switch": 12,
        }

        function somaInventarios (a, b) {
            let soma = {};
            for (let item in a) {
                soma[item] = a[item];
            }
            for (let item in b) {
                if (soma[item]) {
                    soma[item] += b[item];
                } else {
                    soma[item] = b[item];
                }
            }
            return soma;
        }

        console.log("\n\x1b[32mInventario loja A\x1b[0m");
        console.log(inventarioLojaA);
        console.log("\n\x1b[32mInventario loja B\x1b[0m");
        console.log(inventarioLojaB);
        console.log("\n\x1b[32mInventario combinado\x1b[0m");
        console.log(somaInventarios(inventarioLojaA, inventarioLojaB));
    }
    
}

tarefas.push(t48)

//49. Você recebe um array de objetos representando transações financeiras. Cada transação possui id, valor, data, e categoria. Escreva uma função que retorne um objeto onde as chaves são as categorias, e os valores são arrays de transações pertencentes a essa categoria. Adicionalmente, inclua um subtotal de valores por categoria.

const t49 ={
    nome: "Transações financeiras",
    programa: () => {
        let transacoesFinanceiras = [
            { id: 1, valor: 100, data: "13-06-2024", categoria: "Transferências" },
            { id: 2, valor: 1000, data: "13-06-2024", categoria: "Impostos" },
            { id: 3, valor: 50, data: "13-06-2024", categoria: "Gastos Médicos" },
            { id: 4, valor: 50, data: "13-06-2024", categoria: "Doações" },
            { id: 5, valor: 100, data: "13-06-2024", categoria: "Seguro" },
            { id: 6, valor: 500, data: "13-06-2024", categoria: "Doações" },
            { id: 7, valor: 400, data: "13-06-2024", categoria: "Impostos" },
            { id: 8, valor: 300, data: "13-06-2024", categoria: "Transferências" },
            { id: 9, valor: 100, data: "13-06-2024", categoria: "Gastos Médicos" },
            { id: 10, valor: 700, data: "13-06-2024", categoria: "Gastos Médicos" },
            { id: 11, valor: 500, data: "13-06-2024", categoria: "Transporte" },
            { id: 12, valor: 1500, data: "13-06-2024", categoria: "Educação" },
        ];

        function criarObjetoTransacoes(transacoes) {
            let objeto = {};
            for (let transacao of transacoes) {
                if (!(objeto[transacao.categoria])) {
                    objeto[transacao.categoria] = transacoes.filter((elemento) => elemento.categoria === transacao.categoria);
                    let subtotal = `[Subtotal] ${transacao.categoria}`;
                    objeto[subtotal] = objeto[transacao.categoria].reduce((accumulator, transacao) => accumulator + transacao.valor, 0);
                }
            }
            return objeto;
        }

        console.log(criarObjetoTransacoes(transacoesFinanceiras));

    }
    
}

tarefas.push(t49)

 
/*50. Desenvolva um pequeno sistema de reserva de hotéis usando JavaScript. O sistema deverá ser capaz de interagir com o usuário através do console do navegador e manter um registro das reservas e hotéis disponíveis. Utilize objetos e arrays para gerenciar as informações. Não é necessário interface gráfica, apenas funcionalidade lógica.
1. Estrutura de Dados:
Hotel: Cada hotel deve ser um objeto com propriedades para id, nome, cidade, quartos totais e quartos disponiveis.
Reservas: Cada reserva deve ser um objeto contendo idReserva, idHotel, e nomeCliente.

2. Funcionalidades:
Adicionar hotéis: Permitir que o usuário adicione novos hotéis ao sistema.
Buscar hotéis por cidade: Permitir que o usuário liste todos os hotéis disponíveis em uma cidade específica.
Fazer reserva: Permitir que um usuário faça uma reserva em um hotel. Isso deve diminuir o número de quartos disponiveis do hotel.
Cancelar reserva: Permitir que um usuário cancele uma reserva. Isso deve aumentar o número de quartos disponiveis no hotel correspondente.
Listar reservas: Mostrar todas as reservas, incluindo detalhes do hotel e do cliente.

3. Regras de Negócio:
Um hotel só pode aceitar reservas se houver quartos disponíveis.
As reservas devem ser identificadas por um ID único e associadas a um único hotel.

4. Desafios Adicionais (Opcionais):
Implementar uma função de check-in e check-out que atualize a disponibilidade de quartos.
Gerar relatórios de ocupação para um hotel.
Permitir que o usuário avalie o hotel após a estadia, e armazenar essas avaliações dentro do objeto do hotel.
*/

const t50 = {
    nome: "Hotéis MaisPraTi",
    programa: () => {
        let hoteis = [];
        let reservas = [];
        class Hotel {
            constructor(nome, cidade, quartos) {
                this.id = String(crypto.randomUUID());
                this.nome = nome;
                this.cidade = cidade;
                this.quartos = quartos;
                this.reservas = 0;
            }
            get quartosDisponiveis() {
                return this.quartos - this.reservas;
            }
        }
        class Reserva {
            constructor(idHotel, nomeCliente) {
                this.idReserva = String(crypto.randomUUID());
                this.idHotel = idHotel;
                this.nomeCliente = nomeCliente;
            }
        }

        function adicionarHotel() {
            console.clear();
            console.log("\x1b[32m[Cadastrar Hotel]\x1b[0m\n");
            hoteis.push(new Hotel(inputNome("Nome: "), inputNome("Cidade: "), inputInteiro("Quartos: ")));
        }

        function buscarHotelPorCidade() {
            console.clear();
            let cidades = [];
            if (hoteis.length != 0) {
                console.log("\x1b[32m[Buscar hotel por cidade]\x1b[0m\n");
                hoteis.forEach((hotel) => {if (!cidades.includes(hotel.cidade.toLowerCase())) cidades.push(hotel.cidade.toLowerCase())});
                console.log("\n[Cidades cadastradas]")
            for (let i = 0; i < cidades.length; i++) {
                console.log(`${Number(i) + 1} - ${cidades[i][0].toUpperCase() + cidades[i].slice(1)}`);
            }
            console.log();
            const inputCidade = input(Number, (numero) => (Number.isInteger(numero) && numero > 0 && numero <= cidades.length));
            let cidade = inputCidade("Sua escolha: ");
            cidade = cidades[cidade - 1];
            hoteis.forEach((hotel) =>  {
                if(hotel.cidade.toLowerCase() === cidade.toLowerCase()) 
                    console.log(`\nNome: ${hotel.nome}\nCidade: ${hotel.cidade}\nQuatos totais: ${hotel.quartos}\nQuartos disponiveis: ${hotel.quartosDisponiveis}`)})
                } else {
                console.log(`\n\x1b[31mNão existem hotéis cadastrados\x1b[31m`)
            }

            prompt()
        }
        const inputHotel = input(Number, (numero) => (Number.isInteger(numero) && numero > 0 && numero <= hoteis.length));
        function fazerReserva() {
            console.clear();
            if (hoteis.length != 0) {
                console.log("\x1b[32m[Reservar um quarto]\x1b[0m\n");
                console.log("Escolha um hotel ")
                for (let i in hoteis) {
                    console.log(`${Number(i) + 1} - ${hoteis[i].nome}`);
                }
                console.log();
                let hotel = hoteis[inputHotel(`Sua escolha: `) - 1];
                console.log();
                if (hotel.quartosDisponiveis > 0) {
                    reservas.push(new Reserva(hotel.id, inputNome("Nome do cliente: ")));
                    hotel["reservas"]++;
                    console.log(`Você fez uma reserva no ${hotel.nome}`);
                } else {
                    console.log(`O ${hotel.nome} não possui quartos disponíveis`);
                }
            } else {
                console.log(`\n\x1b[31mNão existem hotéis cadastrados\x1b[31m`)
            }
            prompt();
        }

        function buscarHotelPorId(id) {
            let resultado = null;
            hoteis.forEach((hotel) => {if (hotel.id === id) {resultado = hotel;}});
            return resultado;
        }

        function buscarReservaPorId(id) {
            let resultado = null;
            reservas.forEach((reserva) => {if (reserva.idReserva === id) {resultado = reserva;}});
            return resultado;
        }

        function cancelarReserva() {
            console.clear();
            console.log("\x1b[32m[Cancelar Reserva]\x1b[0m\n");
            let idReserva = prompt("Digite o id da reserva que você dejesa cancelar: ");
            let reserva = buscarReservaPorId(idReserva);
            if (reserva != null) {
                let hotel = buscarHotelPorId(reserva.idHotel);
                hotel["reservas"]--;
                reservas = reservas.filter((reserva) => reserva.idReserva !== idReserva);
                console.log(`\nVocê cancelou a reserva de ${reserva.nomeCliente} do ${hotel.nome}`);
            } else {
                console.log(`\nReserva não encontrada`);
            }
            prompt();
        }

        function listarReservas() {
            console.clear();
            console.log("\x1b[32m[Lista de reservas]\x1b[0m\n");
            if (reservas.length > 0) {
                reservas.forEach((reserva) => console.log(reserva));
            } else {
                console.log("\nNão esxitem reservas");
            }
            prompt();
        }

        function menu() {
            console.clear();
            console.log("\x1b[32m[Hoteis MaisPraTi]\x1b[0m\n");

            const inputMenu = input(Number, (numero) => Number.isInteger(numero) && numero >= 0 && numero <= options.length)
            let options = [
                {nome: "Adicionar hotel", 'função': adicionarHotel},
                {nome: "Buscar hotel por cidade", 'função': buscarHotelPorCidade},
                {nome: "Fazer reserva", 'função': fazerReserva},
                {nome: "Cancelar reserva", 'função': cancelarReserva},
                {nome: "Listar reservas", 'função': listarReservas}
            ];
            while(true) {
                console.clear();
                console.log("\x1b[32m[Hotéis MaisPraTi]\x1b[0m\n");
                for (let i in options) {
                    console.log(`${Number(i) + 1} - ${options[i].nome}`)
                }
                console.log("0 - Sair\n");
                let escolha = inputMenu("Sua escolha: ");
                if (escolha === 0) {
                    break;
                }
                escolha--;
                options[escolha]['função']();
            }
        }
        menu();
    }
}

tarefas.push(t50); 
main();