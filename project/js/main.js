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


//get list based on entered values
function getToppingList() {

    dropdown.style.display = 'none';
    toppingListDropdown.options.length = 0;
    filteredListArr = [];

    if (search_input.value) {
        var toppings = search_input.value.toLowerCase();
        //debugger;
        for (var i = 0; i < jsonReponse.length; i++) {
            if (jsonReponse[i].name.toLowerCase().indexOf(toppings) !== -1) {
                dropdown.style.display = 'block';
                filteredListArr.push(jsonReponse[i].id);
                if (filteredListArr.length === 0) dropdown.style.display = 'none';
                toppingListDropdown.size = filteredListArr.length;
                //appending the filtered toppings
                appendOptionsToList(jsonReponse[i].name, jsonReponse[i].id);
            }
        }
    }
    console.log('Done');
}

//append filtered options to select dropdown
function appendOptionsToList(text, val) {
    var createOptions = document.createElement('option');
    let exists = selectedItemArr.length > 0 && selectedItemArr.includes(val);
    if (!exists) {
        toppingListDropdown.appendChild(createOptions);
        createOptions.text = text;
        createOptions.value = val;
    }

}


// invoke function on selection
function selectTopping(selectedVal) {
    dropdown.style.display = 'none';
    const selected_option = selectedVal.value.trim();
    if (selected_option.length) {
        selectedItemArr.push(selectedVal.value);
        displaySelectedOption(selected_option);
        search_text.style.display = 'none';
        console.log(selectedItemArr);
    }
}

//append and display selected topping list template
const displaySelectedOption = (option) => {
    console.log(option);
    var resp = jsonReponse.find(x => x.id == option);
    const item = `
      <li class="list-items">
          <span>${resp.name}</span>
          <span class="delete" id="${resp.id}">×</span>
        </li>`;
    selectedToppingList.innerHTML += item;
};

//event listener for remove icon
selectedToppingList.addEventListener('click', e => {
        var index = selectedItemArr.indexOf(e.target.id);
        if (index !== -1) {
            selectedItemArr.splice(index, 1);
        }
        if (selectedItemArr.length === 0) search_text.style.display = 'block';
        console.log(selectedItemArr);
})
