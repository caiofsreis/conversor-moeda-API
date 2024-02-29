function enviarDados(){

    var opcaoConversao = document.getElementById("listaSelecao").value
    console.log(opcaoConversao);

    var moedaEmReal = document.getElementById("escreverTexto").value

    var listaConversao = ["bitcoin", "dol", "euro"]

    if (opcaoConversao == "dol"){

        fetch("https://economia.awesomeapi.com.br/last/USD-BRL").then(resposta =>{
        return resposta.json()

        }).then(requisicao => {
        console.log(requisicao)

        var valorDolarApi = requisicao.USDBRL.ask
        console.log(valorDolarApi);

        var valorEmDolar = moedaEmReal / valorDolarApi;
        valorEmDolar = valorEmDolar.toFixed(2);

        var resultadoCot = document.getElementById("resultado")
        resultadoCot.innerHTML = `<h1> O valor de ${moedaEmReal} em dólar é: $ ${valorEmDolar} </h1>`

        });
    
    } else if (opcaoConversao == "euro") {

        fetch("https://economia.awesomeapi.com.br/last/EUR-BRL").then(resposta =>{
        return resposta.json()

        }).then(requisicao => {
        console.log(requisicao)

        var valorEuroApi = requisicao.EURBRL.ask
        console.log(valorEuroApi);

        var valorEmEuro = moedaEmReal / valorEuroApi;
        valorEmEuro = valorEmEuro.toFixed(2);

        var resultadoCot = document.getElementById("resultado")
        resultadoCot.innerHTML = `<h1> O valor de ${moedaEmReal} em Euro é: $ ${valorEmEuro} </h1>`

        });

    } else if (opcaoConversao == "bitcoin") {

        fetch("https://economia.awesomeapi.com.br/last/BTC-BRL").then(resposta =>{
        return resposta.json()

        }).then(requisicao => {
        console.log(requisicao)

        var valorBitcoinApi = requisicao.BTCBRL.ask
        console.log(valorBitcoinApi);

        var valorEmBitcoin = moedaEmReal / valorBitcoinApi;
        valorEmBitcoin = valorEmBitcoin.toFixed(6);

        var resultadoCot = document.getElementById("resultado")
        resultadoCot.innerHTML = `<h1> O valor de ${moedaEmReal} em Bitcoin é: $ ${valorEmBitcoin} </h1>`

        });

    } else {
        alert("Ocorreu um erro inesperado");;
    }  
    
    limparCampo();
}

function limparCampo(){
    var campo = document.getElementById("escreverTexto").value = "";
}