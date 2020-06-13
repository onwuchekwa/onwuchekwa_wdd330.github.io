//localStorage helpers
function writeToLS(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}
function readFromLS(key) {
    console.log('readFromLS initialized');
    return JSON.parse(window.localStorage.getItem(key));
}

//variables to be used by the class
let starList;
let thisPage = 1;
const sw_url = 'https://swapi.dev/api/';

export default class StarWarsList {
    constructor(elementID, category){
        this.key = elementID;
        this.parentElement = document.getElementById(elementID);
        this.backButton = this.buildBackButton();
        this.category = category;
        this.url = `${sw_url}${category}/?page=`;
    }
    /*init(){
        if(getStarWars(this.category).ok){
            this.showFullList();
        } else {
            console.log('list did not initialize function');
        };
    }*/
    init(){
        console.log(`initializing data`);
        fetch(`${this.url}${thisPage}`)
        .then(response => response.json())
        .then(data => {
            writeToLS(this.key, data);
            starList = [];
            data.results.forEach(element =>  {
                starList.push(newPerson(element));
            })
            this.showFullList();
        });
    }
    showFullList(){
        const data = readFromLS(this.key);
        console.log(`showFullList initialized`);
        const container = this.parentElement;
        //clear the parent element
        container.innerHTML = '';
        //fill with the new list
        
        starList.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element.name}`;
            container.appendChild(li);
        })
        this.backButton.classList.add('hide');
        this.addListeners();
        this.buildPagination(data);
    }
    addListeners() {
        // get all 'li' children of the 'ul' element and attach a listener to each
        const listArr = Array.from(this.parentElement.children);
        console.log(listArr);
        listArr.forEach(item => {
            item.addEventListener('click', event => {
            this.showOneItem(event.currentTarget.innerText);
            })
        })
    }
    getItemByName(itemName) {
        return starList.find(item => item.name === itemName);
    }
    showOneItem(itemName){
        console.log(`showOneItem: ${itemName}`);
        const item = this.getItemByName(itemName);
        //this.parentElement.appendChild(renderOneItemFull(item));
        //clear the parent element and build a back button
        this.parentElement.innerHTML = '';

        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${item.name}</h2>
            <ul>
                <li>Height: ${item.height}</li>
                <li>Hair Color: ${item.hair_color}</li>
                <li>Eye Color: ${item.eye_color}</li>
                <li>Gender: ${item.gender}</li>
                <li>Species: ${item.species}</li>
            </ul>`;

        this.parentElement.appendChild(li);
        this.backButton.classList.remove('hide');
        document.getElementById('pages').classList.add('hide');
    }
    buildPagination(data){
        console.log(`building pagination`)
        const lastPage = Math.ceil(data.count / 10);
        console.log(lastPage);

        const listArr = Array.from(document.getElementById('pages').children);
        console.log(listArr);
        listArr.forEach(item => {
            item.addEventListener('click', event => {
                if(event.currentTarget.id == 'first'){
                    console.log('heading to First page');
                    if(thisPage != 1){
                        thisPage = 1;
                        this.init();
                    }  
                } else if (event.currentTarget.id == 'previous'){
                    console.log('heading to Previous page');
                    if(thisPage !=1){
                        thisPage -= 1;
                        this.init();
                    }
                }
                else if (event.currentTarget.id == 'next'){
                    console.log('heading to Next page');
                    if(thisPage != lastPage){
                        thisPage += 1;
                        this.init();
                    }
                }
                else if (event.currentTarget.id == 'last'){
                    console.log('heading to Last page');
                    if(thisPage != lastPage){
                        thisPage = lastPage;
                        this.init();
                    }
                }
            })
        })
        document.getElementById('pages').classList.remove('hide');
    }
    buildBackButton(){
        const backButton = document.createElement("button");
        backButton.textContent = "Return to List";
        backButton.addEventListener('click', () => {this.showFullList();});
        this.parentElement.before(backButton);
        return backButton;
    }
}

function newPerson(person){
    const newPerson = {
        name: person.name,
        height: person.height,
        hair_color: person.hair_color,
        eye_color: person.eye_color,
        gender: person.gender,
        species: person.species
    }
    return newPerson;
}