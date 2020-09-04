/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Declaring variables in the global scope
let studentList = document.getElementById('student-list');
let nonSearchButtonAmount = Math.ceil(data.length / 9);
let buttonUl = document.getElementById('button-list');

let filteredData = []

//Filter Search Results Function
function filterResults(searchValue) {
   //Make sure the user actually searched for a value
   if (searchValue !== "") {
      //reset filtered data array for new searches
      filteredData = [];
      for (let i = 0; i < data.length; i++) {
         let tempName = data[i].name.first + " " + data[i].name.last;
         if (tempName.toLowerCase().includes(searchValue.toLowerCase())) {
            filteredData.push(data[i]);
         }
      }

      //If no results are returned
      if (filteredData.length === 0) {
         //Empty list and buttons to show no results screen
         studentList.innerHTML = "";
         buttonUl.innerHTML = "";

         //Create the h1 element to let user know that no results were returned
         let noResults = document.createElement('h1');
         noResults.innerHTML = `We're sorry, but "${searchValue}" does not exist here.`
         noResults.style.fontSize = "30px";
         noResults.style.textAlign = "center";
         studentList.appendChild(noResults);

         //Create button to reset search
         let resetSearch = document.createElement('button');
         resetSearch.innerHTML = "<h1 style='font-size:30px;'>Reset Search</h1>";
         studentList.appendChild(resetSearch);
         resetSearch.addEventListener('click', () => {
            showPage(1, data);
            addPagination(1, nonSearchButtonAmount, data);
         });
      } else {
         //If results are found
         let searchResultButtons = Math.ceil(filteredData.length / 9);
         showPage(1, filteredData);
         addPagination(1, searchResultButtons, filteredData);
      }
   }

}


//Show page functions
function showPage(page, listData) {
   //Clear page before inserting new elements
   studentList.innerHTML = "";

   //Dynamic for loop that shows only the students that should show up on the current page
   for (let i = (page - 1) * 9; i < ((page * 9)); i++) {
      let listItem = document.createElement('li');

      listItem.classList.add('student-item', 'cf');

      listItem.innerHTML = `
         <div class="student-details">
            <img class="avatar" src="${listData[i].picture.large}" alt="Profile Picture">
            <h3>${listData[i].name.first} ${listData[i].name.last}, ${listData[i].name.title}.</h3>
            <span class="email">${listData[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${listData[i].registered.date}</span>
         </div>
      `

      studentList.appendChild(listItem);

      //To stay away from errors, I made the loop break if we just added the last element in the list
      //This is because, if we don't hit the end of the list, the loop will always try to add 9 items
      //We make it break if the last page has less than 9 items
      if (i === listData.length - 1) { break; }
   }
}


//Add pagination function
function addPagination(page, numOfButtons, dataList) {
   //Reset HTML every time a button is clicked, so we can add the active class to the correct button
   buttonUl.innerHTML = "";

   for (let i = 1; i <= numOfButtons; i++) {
      //Get LI element
      let buttonListItem = document.createElement('li');
      buttonListItem.innerHTML = `<button>${i}</button>`;

      //Get button element, which is the child of the LI
      let button = buttonListItem.firstElementChild;

      //Set active button
      if (i === page) {
         button.classList.add('active');
      }

      //Append the button to the HTML
      buttonUl.appendChild(buttonListItem);

      //Add event listener to the button
      button.addEventListener('click', () => {
         //Use the inner HTML of the button to pass which button is being clicked to the functions
         showPage(parseInt(button.innerHTML), dataList);
         addPagination(parseInt(button.innerHTML), numOfButtons, dataList);
      })
   }
}

// Call functions
// initial function calls
showPage(1, data);
addPagination(1, nonSearchButtonAmount, data);

let searchLabel = document.createElement('label');
searchLabel.setAttribute('for', 'search');
searchLabel.classList.add('student-search');
searchLabel.innerHTML = `
                           <input id="search" placeholder="Search by name...">
                           <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
                           
                        `;

let resetLabel = document.createElement('label');
resetLabel.classList.add('student-search');
resetLabel.innerHTML = `
                           <button type="button" id="search-button"><p style="padding-top:10px;padding-bottom:10px;">Clear</p></button>
                        `;

let searchButton = searchLabel.lastElementChild;
searchButton.addEventListener('click', () => {
   let valueOfSearch = document.getElementById('search');
   filterResults(valueOfSearch.value);
   valueOfSearch.value = "";
});

let resetButton = resetLabel.lastElementChild;
resetButton.addEventListener('click', () => {
   showPage(1, data);
   addPagination(1, nonSearchButtonAmount, data);
});

document.querySelector('header').appendChild(searchLabel);
document.querySelector('header').appendChild(resetLabel);