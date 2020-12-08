import {promises as fs} from "fs";
var cidades = [];
var estados = [];
var estadoSelecionado = {}
var SiglaList = []
var biggestCity = ""
var smallerCity = "CidageGenericaParaInicioDaComparacao"

async function init(){
  try{
    cidades = JSON.parse(await fs.readFile("cidades.json"));
    estados = JSON.parse(await fs.readFile("estados.json"));
    var idEstadoTemp;
    for(var j=0;j<estados.length;j++){
        estados[j]["Cidades"] = []
    }
    
    for(var i=0; i< cidades.length; i++){
        idEstadoTemp = parseInt(cidades[i]["Estado"])
        estados[idEstadoTemp-1]["Cidades"].push(cidades[i]);
    }

    for(var k=0;k<estados.length;k++){
        SiglaList.push(estados[k]["Sigla"]);
        var name = "estados/"+estados[k]["Sigla"]+".json";
        estadoSelecionado[estados[k]["Sigla"]] = estados[k]["Cidades"].length
        await fs.writeFile(name,JSON.stringify(estados[k]["Cidades"]));
    }
    console.log(SiglaList)
    for(var i=0; i<SiglaList.length;i++){
        leituraUF(SiglaList[i]);
    }
    
  }catch(err){
    console.log(err);
  }
}

async function leituraUF(uf){
    var estado;
    var bigCity = "";
    var smallCity = "";
    try{
        estado = JSON.parse(await fs.readFile("estados/"+ uf+ ".json"));
        smallCity = estado[0].Nome;
        for(var i=0;i<estado.length;i++){
            if(estado[i].Nome.length > bigCity.length){
                bigCity = estado[i].Nome;
            }else if(estado[i].Nome.length < smallCity.length){
                smallCity = estado[i].Nome;
            }
        }
        if(bigCity.length > biggestCity.length){
            biggestCity = bigCity;
        }else if(smallCity.length< smallerCity.length){
            smallerCity = smallCity;
        }
        //console.log(uf + " - maior cidade: "+bigCity+" - menor cidade: "+smallCity)
        console.log(" - maior cidade: "+biggestCity+" - menor cidade: "+smallerCity)
    }catch(err){
        console.log(err);
    }
}

async function top5Estados(){
    
}
async function down5Estados(){

}
init();