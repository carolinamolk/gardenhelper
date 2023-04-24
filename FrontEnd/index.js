//imports functions from separate js file
import {apiSearch, displayData, plantSuggestions, clear, shop, answer, exitAnswer} from './functions.js'


//assigns variable names to html elements
const button = document.querySelector('#searchButton')
const zipInput = document.querySelector('#zipcode')
const plantCategory = document.querySelectorAll('.plantCategory')
const shopZone = document.querySelector('#shopZone')
const ask = document.querySelector('#ask')
const xButton = document.querySelector("#x-button")


//adds event listener to input field
zipInput.addEventListener('click', () => { clear(zipInput) })

// enables user to press 'Enter' to search, sends to the button function above
document.querySelector('#zipcode').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        button.click() }
})

//adds event listener to 'find' button
button.addEventListener('click', async () => { apiSearch() })

// adds event listeners to each plant category button
plantCategory.forEach((category) => { 
    category.addEventListener('click', (Event) => { plantSuggestions(category) })
})

//adds event listener to shopping link
shopZone.addEventListener('click', (Event) => { shop() })

//adds event listener to "Why is this important?"
ask.addEventListener('click', (Event) => { answer() })

//adds event listener to answer box close button
xButton.addEventListener('click', (Event) => { exitAnswer() })



// TO DO
//work with params -- pull zone and plant suggestion and make it a click event
//popup for error messages
//popup for answer window