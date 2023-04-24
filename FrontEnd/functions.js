//imports plant list data from json file 
import data from './plant-data.json' assert {type: 'json'}


//defines variable scope outside of respective function
let zoneData = 0


//function called when 'Search' button is clicked finds zone and displays zone data
const apiSearch = async () => {
    //sets variable zip equal to zipcode entered and trims white space
    const zip = document.querySelector('#zipcode').value.trim()

    //error handling/check for 5-digit zipcode, reloads the page
    if (!(/^\d{5}$/.test(zip))){
        alert("Invalid zipcode. Try again!")
        location.reload()
    }

    //requests data from API using zipcode entered
    let response = await axios.get(`https://phzmapi.org/${zip}.json`)

    //displays data pulled from API
    let zone = response.data.zone
    document.querySelector('#hardinessZone').innerText = zone
    document.querySelector('#tempRange').innerText = `${response.data.temperature_range} °F`
    document.querySelector('#coordinates').innerText = `${response.data.coordinates.lat}, ${response.data.coordinates.lon}`    

    //pull integer from zone data
    zoneData = parseInt(zone, 10)
} 


//function to parse/clean plant suggestion json data
const displayData = (pList) => {
    let newList = ''
    for (let x=0; x<pList.length; x++){
        newList = newList + pList[x] +'\n'}
    return (newList.toLowerCase())
}


//function called when plant list button is clicked, displays plant suggestion data
const plantSuggestions = (category) => {

    if (zoneData == 0) {
        alert("Find your zone first")}
    else {
        switch (category.id) {
            case "vegsAndHerbs": 
                document.querySelector('#vlist').innerText = displayData(data[zoneData].vegs_and_herbs)
                document.querySelector('#vlist').scrollIntoView({behavior: "smooth"}); break
            case "ornamentals": 
                document.querySelector('#olist').innerText = displayData(data[zoneData].ornamentals)
                document.querySelector('#olist').scrollIntoView({behavior: "smooth"}); break
            case "treesAndShrubs": 
                document.querySelector('#tlist').innerText = displayData(data[zoneData].trees_and_shrubs)
                document.querySelector('#tlist').scrollIntoView({behavior: "smooth"}); break
        }
    }
}


// clears forms/content from previous search if zipcode input box clicked
const clear = (zipInput) =>{
    zipInput.value = ""
    let clearSections = document.querySelectorAll('.clear')
    clearSections.forEach((section) => {
        section.innerText = "" })
    exitAnswer()
}


// sends user to zone's shopping options
const shop = () => {
    window.location.href = `https://www.brecks.com/plantfinder#/filter:ss_filter_zone:${zoneData}/finder-results`
}


// brings "Why is this important?" answer into view
const answer = () => {
    document.querySelector(".answer").style.display = "block"
    document.querySelector(".answer").scrollIntoView({behavior: "smooth"})
}


// hides "Why is this important?" out of view
const exitAnswer = () => {
    document.querySelector(".answer").style.display = "none"
}


//exports functions so they can be called from other files
export {apiSearch, displayData, plantSuggestions, clear, shop, answer, exitAnswer}