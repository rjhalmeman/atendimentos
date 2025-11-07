class Equipamentos { 
    constructor (patrimonio,descricao,dataDeAquisicao,localizacao,emManutencao, posicaoNaLista) {
    this.patrimonio = patrimonio;
    this.descricao = descricao;
    this.dataDeAquisicao = dataDeAquisicao;
    this.localizacao = localizacao;
    this.emManutencao = emManutencao;
    this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
    }