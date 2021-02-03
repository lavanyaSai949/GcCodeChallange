//fetching json data from external json file using fetch method
fetch('./json/pizza-toppings.json')
    .then(response => response.json())
    .then(data => {
        // fetched the data from json successfully
        jsonReponse = data;
        console.log(jsonReponse);
    });

//declaring variables
let jsonReponse = [];
let search_input = document.getElementById('search'); // search input field
let toppingListDropdown = document.getElementById('toppingListDropdown'); // dropdown list
let dropdown = document.getElementById('dropdown'); // dropdown container
let selectedToppingList = document.querySelector(".selected-toppings-list"); // selected list
let search_text = document.querySelector(".search-text"); // label field
let selectedItemArr = [];
let filteredListArr = [];

//default dropdown should be hidden
dropdown.style.display = 'none';

//event listener for search input field
search_input.addEventListener('keyup', getToppingList);

toppingListDropdown.onclick = function() {
    selectTopping(this);
};

//append and display selected topping list template
const displaySelectedOption = (option) => {
    console.log(option)
    var resp = jsonReponse.find(x => x.id == option);
    const item = `
      <li class="list-items">
          <span>${resp.name}</span>
          <span class="delete" id="${resp.id}">×</span>
        </li>`;
    selectedToppingList.innerHTML += item;
};