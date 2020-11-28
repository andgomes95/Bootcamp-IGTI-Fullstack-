var unity = {
    0: "Zero",
    1: "Um",
    2: "Dois",
    3: "Três",
    4: "Quatro",
    5: "Cinco",
    6: "Seis",
    7: "Sete",
    8: "Oito",
    9: "Nove"
}

var decimal = {
    10: "Dez",
    11: "Onze",
    12: "Doze",
    13: "Treze",
    14: "Quatorce",
    15: "Quinze",
    16: "Dezesseis",
    17: "Dezessete",
    18: "Dezoito",
    19: "Dezenove",
    20: "Vinte",
    30: "Trinta",
    40: "Quarenta",
    50: "Cinquenta",
    60: "Sessenta",
    70: "Setenta",
    80: "Oitenta",
    90: "Noventa"
}

var hundred = {
    100: "Cento",
    200: "Duzentos",
    300: "Trezentos",
    400: "Quatrocentos",
    500: "Quinhentos",
    600: "Seiscentos",
    700: "Setecentos",
    800: "Oitocentos",
    900: "Novecentos"
}

window.addEventListener('load',start);
var rangeInput = document.querySelector('#rangeInput');

function start(){
    rangeInput.addEventListener('change',changeTextInput);
}

function changeTextInput(event){
    var number = rangeInput.value;
    //Mudança do input em numeral
    var numberInput = document.querySelector('#numberInput');
    numberInput.value = number;

    //Mudança do input em extenso
    var extenseInput = document.querySelector('#extenseInput');
    var result = numberToString(number,number.length,"");
    extenseInput.value = result;
    
}

function numberToString(number,numberLength,string){
    if(numberLength == 1){
        if(number == 0 && string.length>0){
            return "Zero";
        }
        if(string.length>0) {
            return string + " e " + unity[number];
        }
        else return unity[number];
    }else if(numberLength == 2){
        numberLength = numberLength-1;
        if((number<=20 && number >=10 )|| number%10==0){
            if(string.length>0){
                return string + " e " + decimal[number];
            }else return decimal[number];
        }else if(number<10){
            return numberToString(number, numberLength, string)
        }
        else{
            if(string.length>0){
                string = string + " e " +decimal[Math.floor(number/10)*10];
            }else{
                string = decimal[Math.floor(number/10)*10];
            }
            number = number - Math.floor(number/10)*10;
            return numberToString(number, numberLength, string)
        }
        
    }else if(numberLength == 3){
        if(number == 100){
            return "Cem"
        }else if(number%100==0){
            return hundred[number];
        }
        string = hundred[Math.floor(number/100)*100];
        number = number - Math.floor(number/100)*100;
        numberLength = numberLength-1;
        return numberToString(number, numberLength, string)
    }
}