async function start() {
    var resource = await fetch('http://localhost:3001/results');
    var userArray = await resource.json();
    //userArray = filterUserArray();
    loadUsersPanel(userArray);
    loadMoreInfo(userArray);
}

function loadUsersPanel(userArray){
    let value = document.querySelector('#card-user');
    value.textContent = `${userArray[0].name.first} ${userArray[0].name.last}, ${userArray[0].dob.age} anos`;
}
function loadMoreInfo(userArray){
    let male = 0;
    let female = 0;
    let sumAge = 0 ;
    let averageAge = 0;
    for(let user of userArray){
        if(user.gender == "female"){
            female++;
        }else{
            male++;
        }
        sumAge += user.dob.age;
        averageAge += user.dob.age;
    }
    averageAge = averageAge/userArray.length;
    
    let maleSpan = document.querySelector('#statsMale');
    maleSpan.textContent = `Homens: ${male}`;

    let femaleSpan = document.querySelector('#statsFemale');
    femaleSpan.textContent = `Mulheres: ${female}`;

    let sumSpan = document.querySelector('#statsSum');
    sumSpan.textContent = `Soma de Idades: ${sumAge}`;

    let averageSpan = document.querySelector('#statsAverage');
    averageSpan.textContent =  `Média de Idades: ${averageAge}`;

}
start(); 