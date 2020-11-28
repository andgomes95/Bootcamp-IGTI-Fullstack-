var userArray = null;
var inputSearch = null;
var stringSearch = null;
var cardSelectUsers = null;

async function start() {
    var resource = await fetch('http://localhost:3001/results');
    userArray = await resource.json();
    userArray = userArray.map( user =>{
            return {
                firstName : user.name.first.toLowerCase(),
                lastName : user.name.last.toLowerCase(),
                age : user.dob.age,
                gender: user.gender,
                picture: user.picture.medium
            }
        });
    cardSelectUsers = document.querySelector('#card-selected-users');
    inputSearch = document.querySelector('#search-text');
    inputSearch.focus();
    inputSearch.addEventListener('input',()=>{
        stringSearch = inputSearch.value;
    })
    preventFormSubmit();
}

function preventFormSubmit(){
    var form = document.querySelector('#form-search-bar');
    form.addEventListener('submit',function handleFormSubmit (event){
        event.preventDefault();
        loadStructure();
    });
}

function loadStructure(){
    selectedUsers = userArray.filter(user =>{
        return user.firstName.includes(stringSearch) || user.lastName.includes(stringSearch)
    })
    if(stringSearch != null){
        loadUsersPanel(selectedUsers);
        loadMoreInfo(selectedUsers);
    }else{
        loadUsersPanel(userArray);
        loadMoreInfo(userArray);
    }
    
}

function loadUsersPanel(array){
    
    let usersHTML = `<h3> ${array.length} Usuário(s) Selecionado(s) </h3><br>`;
    
    array.forEach(user =>{
        let first = capitalizeFirstLetter(user.firstName)
        let last = capitalizeFirstLetter(user.lastName)
        userHTML = `<img src="${user.picture}"></img>
        <span type="text" id="card-user">${first} ${last}, ${user.age} anos</span><br>`
        usersHTML +=userHTML
    })

    cardSelectUsers.innerHTML = usersHTML;

    //let value = document.querySelector('#card-user');
    //let picture = document.querySelector('#pic-user');
    //value.textContent = `${array[0].firstName} ${array[0].lastName}, ${array[0].age} anos`;
    //picture.src = array[0].picture;
}
function loadMoreInfo(array){
    let male = array.filter( user =>{
        return user.gender === "male"
    }).length
    let female = array.filter( user =>{
        return user.gender === "female"
    }).length;
    /** Soma das idades com forEach
    let sumAge = 0;
    userArray.forEach(user => {
        sumAge += user.age;
    });
     */
    //Soma das idades utilizando Reduce
    let sumAge = array.reduce((sum, actual)=>{
        return sum + actual.age;
    }, 0)
    let averageAge = sumAge/array.length;
    
    let maleSpan = document.querySelector('#statsMale');
    maleSpan.textContent = `Homens: ${male}`;

    let femaleSpan = document.querySelector('#statsFemale');
    femaleSpan.textContent = `Mulheres: ${female}`;

    let sumSpan = document.querySelector('#statsSum');
    sumSpan.textContent = `Soma de Idades: ${sumAge}`;

    let averageSpan = document.querySelector('#statsAverage');
    averageSpan.textContent =  `Média de Idades: ${averageAge.toFixed(2)}`;

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
window.addEventListener('load',start)