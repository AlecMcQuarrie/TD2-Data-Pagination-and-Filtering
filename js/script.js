/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Declaring variables in the global scope
let studentList = document.getElementById('student-list');
let listItem = document.createElement('li');
let buttonAmount = Math.ceil(data.length / 9);
let buttonUl = document.getElementById('button-list');


//Search function
function search() {
   
}


//Show page functions
function showPage(page) {
   //Clear page before inserting new elements
   studentList.innerHTML = "";

   //Dynamic for loop that shows only the students that should show up on the current page
   for (let i = (page-1) * 9; i < ((page*9)); i++) {
      listItem.classList.add('student-item', 'cf');

      listItem.innerHTML = `
         <div class="student-details">
            <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}, ${data[i].name.title}.</h3>
            <span class="email">${data[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${data[i].registered.date}</span>
         </div>
      `

      studentList.appendChild(listItem);

      //To stay away from errors, I made the loop break if we just added the last element in the list
      //This is because, if we don't hit the end of the list, the loop will always try to add 9 items
      //We make it break if the last page has less than 9 items
      if (i === data.length - 1) {break;}
   }
}


//Add pagination function
function addPagination(page) {
   //Reset HTML every time a button is clicked, so we can add the active class to the correct button
   buttonUl.innerHTML = "";

   for (let i = 1; i <= buttonAmount; i++) {
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
         showPage(parseInt(button.innerHTML));
         addPagination(parseInt(button.innerHTML));
      })
   }
}

// Call functions
// initial function calls
showPage(1);
addPagination(1);

let searchLabel = document.createElement('label');
searchLabel.setAttribute('for', 'search');
searchLabel.classList.add('student-search');
searchLabel.innerHTML = `
                           <input id="search" placeholder="Search by name...">
                           <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                        `;

let searchButton = searchLabel.lastElementChild;
searchButton.addEventListener('click', search());

document.querySelector('header').appendChild(searchLabel);