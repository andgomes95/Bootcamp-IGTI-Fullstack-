async function start() {
    var resource = await fetch('http://localhost:3001/results');
    var userArray = await resource.json();
    userArray = userArray.map( user =>{
            return {
                firstName : user.name.first,
                lastName : user.name.last,
                age : user.dob.age,
                gender: user.gender,
                picture: user.picture.medium
            }
        });
    //userArray = filterUserArray();
    loadUsersPanel(userArray);
    loadMoreInfo(userArray);
}

function loadUsersPanel(userArray){
    let value = document.querySelector('#card-user');
    let picture = document.querySelector('#pic-user');
    /** Find para achar uma pessoa */
    let person = userArray.find(user =>{
        return user.lastName === 'Porto'
    })
    /** Some para achar varias, porém só retorna true ou false */
    let people = userArray.filter(user =>{
        return user.lastName.includes('Costa');
    })
    console.log(people);
    value.textContent = `${person.firstName} ${person.lastName}, ${person.age} anos`;
    picture.src = person.picture;
}
function loadMoreInfo(userArray){
    let male = userArray.filter( user =>{
        return user.gender === "male"
    }).length
    let female = userArray.filter( user =>{
        return user.gender === "female"
    }).length;
    /** Soma das idades com forEach
    let sumAge = 0;
    userArray.forEach(user => {
        sumAge += user.age;
    });
     */
    //Soma das idades utilizando Reduce
    let sumAge = userArray.reduce((sum, actual)=>{
        return sum + actual.age;
    }, 0)
    let averageAge = sumAge/userArray.length;
    
    let maleSpan = document.querySelector('#statsMale');
    maleSpan.textContent = `Homens: ${male}`;

    let femaleSpan = document.querySelector('#statsFemale');
    femaleSpan.textContent = `Mulheres: ${female}`;

    let sumSpan = document.querySelector('#statsSum');
    sumSpan.textContent = `Soma de Idades: ${sumAge}`;

    let averageSpan = document.querySelector('#statsAverage');
    averageSpan.textContent =  `Média de Idades: ${averageAge}`;

}
window.addEventListener('load',start)