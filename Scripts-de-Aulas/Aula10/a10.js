'use strict';

function sum(a,b){
    return a+b;
}

//funcao anonima
const sumAnonima = function(a,b){
    return a+b;
}

//arrow function
const sumArrow = (a,b)=>{
    return a+b;
};

// arrow function reduzida
const sumAFReduzida = (a,b)=> a+b;

console.log(sum(2,3));
console.log(sumAnonima(2,3));
console.log(sumArrow(2,3));
console.log(sumAFReduzida(2,3));

//template literals

const name = 'André'
const surname = 'Gomes'
const text = 'Meu nome é ' + name + ' ' + surname;
const text2 = `Meu nome é  ${name} ${surname}`

console.log(text)
console.log(text2)

//default parameters
const sum5 = (a = 2,b = 3) => a+b;
console.log(sum5());
console.log(sum5(2));
