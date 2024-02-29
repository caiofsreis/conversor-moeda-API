//Função utilizada para consumir uma API Web 
function buscarTaxaDeCambio(moeda, callback) {
    fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`)
        .then(resposta => resposta.json())
        .then(requisicao => {
            //Retorna o valor da API de acordo com o dados que vem da lista de seleção
            var valorApi = requisicao[`${moeda.toUpperCase()}BRL`].ask;
            valorApi = parseFloat(valorApi);
            valorFloatApi = valorApi.toFixed(2);
            callback(valorApi);
        });
}

//Função que faz o câmbio das moedas baseado nos parâmetros recebidos
function converterMoeda(opcaoConversao, moedaEmReal) {
    var resultadoCot = document.getElementById("resultado");
    var cotacaoAtual = document.getElementById("cotacaoAtual");

    //Chamando a função da API e pasando os parâmetros para ela
    buscarTaxaDeCambio(opcaoConversao, function (valorApi) {

        //Covertendo o valor inserido usuário pelo valor desejado via API
        var valorEmMoeda = moedaEmReal / valorApi;
        valorEmMoeda = valorEmMoeda.toFixed(opcaoConversao === "BTC" ? 6 : 2);
        
        //Estrutura de decisão para escrever o texto de acordo com a moeda
        if (opcaoConversao == "USD"){
            resultadoCot.innerHTML = `<h1> O valor de R$ ${moedaEmReal} em ${opcaoConversao.charAt(0).toUpperCase() + opcaoConversao.slice(1)} é: <br> U$ ${valorEmMoeda} </h1>`;
            cotacaoAtual.innerHTML = `<p> A cotação atual do ${opcaoConversao} está em U$ ${valorFloatApi} </p>`;
        } else if (opcaoConversao == "EUR"){
            resultadoCot.innerHTML = `<h1> O valor de R$ ${moedaEmReal} em ${opcaoConversao.charAt(0).toUpperCase() + opcaoConversao.slice(1)} é: <br> € ${valorEmMoeda} </h1>`;
            cotacaoAtual.innerHTML = `<p> A cotação atual do ${opcaoConversao} está em € ${valorFloatApi} </p>`;
        } else if (opcaoConversao == "BTC") {
            resultadoCot.innerHTML = `<h1> O valor de R$ ${moedaEmReal} em ${opcaoConversao.charAt(0).toUpperCase() + opcaoConversao.slice(1)} é: <br> ₿ ${valorEmMoeda} </h1>`;
            cotacaoAtual.innerHTML = `<p> A cotação atual do ${opcaoConversao} está em ₿ ${valorFloatApi} </p>`;
        }
    });
}

//Função utilizada para pegar os dados do HTML inseridos peloc usuário
function enviarDados() {
    var opcaoConversao = document.getElementById("listaSelecao").value;
    var moedaEmReal = document.getElementById("escreverTexto").value;

    //Objeto que será selecionado pelo usuário e enviado como parametro para API converter.
    var moedas = {
        dol: "USD",
        euro: "EUR",
        bitcoin: "BTC"
    };

    //Seleciona a moeda escolhida para fazer a conversão
    if (moedas[opcaoConversao]) {
        converterMoeda(moedas[opcaoConversao], moedaEmReal);
    } else {
        alert("Moeda não suportada");
    }

    limparCampo();
}

//Função para limpar o campo de texto
function limparCampo() {
    document.getElementById("escreverTexto").value = "";
}