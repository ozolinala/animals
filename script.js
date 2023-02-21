"use strict"

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
// we don't want too many floating variables, we want to store it inside an object
let buttonDataFilter = {filter: "*"};

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    loadJSON();
    registerButtons();
}

function registerButtons(){
    document.querySelectorAll(".filter").forEach((each) =>{each.addEventListener("click", selectFilter)});
}

//  ------------------- FILTERING ---------------------
function selectFilter(event){
    let filteredList;
    buttonDataFilter = event.target.dataset.filter;
    if (buttonDataFilter !== "*") {
        filteredList = allAnimals.filter(whichAnimal);
    } else {
        filteredList = allAnimals;
    }
    displayList(filteredList);
}

function whichAnimal(animal){
    if (animal.type === buttonDataFilter){
        return true;
    }
}

//  ------------------- SORTING ----------------------------




//  ------------------- PREPARE OBJECTS FROM DATABASE ---------------------
async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}
function prepareObjects( inputData ) {
    // if you want to change map you need to use iterator+forEach
    allAnimals = inputData.map(preapareObject);
    displayList(allAnimals);
}
function preapareObject(jsonObject) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;
    return animal;
}

// -------------------- DISPLAY --------------------
function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";
    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}

