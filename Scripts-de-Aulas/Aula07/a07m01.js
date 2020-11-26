//Aula 07
var title = document.querySelector('h1')
title.textContent = "Teste Query Selector"
var city = document.querySelector('#city')
city.textContent = "Inserindo um texto"
//Aula 08
var text = document.querySelector("#input-text");
text.value = "Insira seu nome";

window.addEventListener('load',start);

function start(){
    console.log("Carregamento da Página");
    var inputname = document.querySelector('#input-name');
    inputname.addEventListener('keyup',countName);

    var formDocument = document.querySelector("form");
    formDocument.addEventListener('submit',preventSubmit);
}

function countName (event){
    var count = event.target.value;
    var span = document.querySelector('#name-length');
    span.textContent = count.length;
}

function preventSubmit(event){
    event.preventDefault();
    alert(' Cadastrado com sucesso!');
}