let listaEquipamentos = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let equipamentos = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaEquipamentos.length; i++) {
        const equipamentos = listaEquipamentos[i];
        if (equipamentos.patrimonio == chave) {
            equipamentos.posicaoNaLista = i;
            return listaEquipamentos[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const patrimonio = document.getElementById("inputPatrimonio").value;
    if (isNaN(patrimonio) || !Number.isInteger(Number(patrimonio))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputPatrimonio").focus();
        return;
    } else if (patrimonio <= 0) {
        mostrarAviso("Precisa ser um número inteiro MAIOR que zero");
        document.getElementById("inputPatrimonio").focus();
        return;
    }

    if (patrimonio) { // se digitou um patrimonio
        equipamentos = procurePorChavePrimaria(patrimonio);
        if (equipamentos) { //achou na lista
            mostrarDadosequipamentos(equipamentos);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputPatrimonio").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputPatrimonio").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let patrimonio;
    if (equipamentos == null) {
        patrimonio = parseInt(document.getElementById("inputPatrimonio").value);
    } else {
        patrimonio = equipamentos.patrimonio;
    }

    const descricao = document.getElementById("inputdescricao").value;
    const dataDeAquisicao = document.getElementById("dataDeAquisicao").value;
    const localizacao = document.getElementById("inputlocalizacao").value;
    const emManutencao = parseInt(document.getElementById("emManutencao").value);


    if (patrimonio <= ) {
        mostrarAviso("Patrimonio precisa ter obrigatoriamente 6 digitos");
        document.getElementById("patrimonio").focus();
        return;
    }

    function formatarData(dataDeAquisicao) {
        // Exemplo de entrada: "2025-11-07"
        const partes = dataISO.split('-'); // divide em ["2025", "11", "07"]
        const ano = partes[0];
        const mes = partes[1];
        const dia = partes[2];

        return `${dia}/${mes}/${ano}`;
    }

    const campoData = document.getElementById('inputdataDeAquisicao');

    // Data atual no formato YYYY-MM-DD
    const hoje = new Date().toISOString().split('T')[0];
    campoData.addEventListener'change', function () {
    const dataEscolhida = campoData.value;

    if (dataEscolhida > hoje) {
        alert("A data não pode ser posterior à data atual!");
        campoData.value = ""; // limpa o campo
    } else {

        alert("Data escolhida " + formatarData(campoData.value) + " Data válida!");
    }



    let manutencao = document.getElementById("inputmanutencao").checked;
    let manutencaoTraduzido = manutencao ? "Sim" : "Não";// para armazenar na lista como "Sim" ou "Não"
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (patrimonio && descricao && dataDeAquisicao && localizacao && emManutencao ) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                equipamentos = new equipamentos(patrimonio, descricao, dataDeAquisicao, localizacao, emManutencao, manutencaoTraduzido, dataConclusao);
                listaEquipamentos.push(equipamentos);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                equipamentosAlterado = new equipamentos(patrimonio, descricao, dataDeAquisicao, localizacao, emManutencao, manutencaoTraduzido, dataConclusao);
                listaEquipamentos[equipamentos.posicaoNaLista] = equipamentosAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaEquipamentos.length; i++) {
                    if (equipamentos.posicaoNaLista != i) {
                        novaLista.push(listaEquipamentos[i]);
                    }
                }
                listaEquipamentos = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputPatrimonio").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.patrimonio + " - " +
            linha.descricao + " - " +
            linha.dataDeAquisicao + " - " +
            linha.localizacao + " - " +
            linha.emManutencao + " - " +
            linha.manutencao + " - " +
            linha.dataConclusao + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaEquipamentos);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do equipamentos nos campos
function mostrarDadosequipamentos(equipamentos) {
    document.getElementById("inputPatrimonio").value = equipamentos.patrimonio;
    document.getElementById("inputdescricao").value = equipamentos.descricao;

    //dataDeAquisicao como select, então atribui o valor diretamente
    document.getElementById("dataDeAquisicao").value = equipamentos.dataDeAquisicao;
    document.getElementById("inputlocalizacao").value = equipamentos.localizacao;
    document.getElementById("emManutencao").value = equipamentos.emManutencao;
    document.getElementById("inputmanutencao").checked = equipamentos.manutencao == "Sim" ? true : false;
    document.getElementById("inputDataConclusao").value = equipamentos.dataConclusao;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputPatrimonio").value = "";
    document.getElementById("inputdescricao").value = "";
    document.getElementById("dataDeAquisicao").value = "";
    document.getElementById("inputlocalizacao").value = "";
    document.getElementById("inputemManutencao").checked = false;
    

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputPatrimonio").readOnly = !soLeitura;
    document.getElementById("inputdescricao").readOnly = soLeitura;
    document.getElementById("dataDeAquisicao").readOnly = soLeitura;
    document.getElementById("inputlocalizacao").readOnly = soLeitura;
    document.getElementById("emManutencao").readOnly = soLeitura;
    document.getElementById("inputmanutencao").readOnly = soLeitura;
    document.getElementById("inputDataConclusao").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputPatrimonio").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function abrirArquivoSalvoEmLocalPermanente() {

    const input = document.createElement('input');
    //cria o elemento input do localizacao file (serve para abrir o seletor de arquivos)
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
    input.onchange = function (event) {
        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
        O evento change é disparado quando um arquivo é selecionado*/
        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./equipamentos.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaEquipamentos.length; i++) {
        const linha = listaEquipamentos[i]; //variavel linha contem as informações de cada equipamentos
        textoCSV += linha.patrimonio + ";" +
            linha.descricao + ";" +
            linha.dataDeAquisicao + ";" +
            linha.localizacao + ";" +
            linha.emManutencao + ";" +
            linha.manutencao + ";" +
            linha.dataConclusao + ";"
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}


// Função para processar o arquivo CSV e transferir os dados para a listaEquipamentos
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaEquipamentos = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 8) { //verifica os seis campos
                    // Adiciona os dados à listaEquipamentos como um objeto
                    listaEquipamentos.push({
                        patrimonio: dados[0],
                        descricao: dados[1],
                        dataDeAquisicao: dados[2],
                        localizacao: dados[3],
                        emManutencao: dados[4],
                        manutencao: dados[6],
                        dataConclusao: dados[7]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}