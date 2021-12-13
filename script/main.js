"use strict"

// load data from local file
const url = "data/local_artist.json";

let dataStorage = []
const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data);
    Append(data)
    dataStorage = data;
}
getData()





// Append selected card to the compare bar....2xvan
const addToCompare = () => {
    document.querySelector(".compare-bar").classList.add("btn-to-search")
    let btn = document.querySelector(".add-more-btn")
    btn.classList.remove("compare-bar")


    // btn.style.width = "230px"

    // Append selected card to the compare bar
    // let newCard = document.createElement("div")
    // newCard.innerHTML = "<p>krubi</p>"
    // let krubi = "krubi"
    // newCard.classList.add("compare-item-card")
    // newCard.innerHTML = `<p>${krubi}</p> <span>&#10005;</span>`

    // document.querySelector(".card-container").appendChild(newCard)
}

let Append = (wholeDataBase) => {
    let htmlTemlate = ""
    for (let iterator of wholeDataBase) {
        htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.id}</h1>`

    }
    document.querySelector("#scene").innerHTML = htmlTemlate;
}



// HERE
let appendThis = (wholeDataBase) => {
    let htmlTemlate = ""
    for (let iterator of wholeDataBase) {
        htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.id}</h1>`
        console.log(iterator.id);
    }
    document.querySelector("#scene").innerHTML = htmlTemlate;
}

// search in for artist,albums etc in the database
const search = () => {
    const inputfield = document.querySelector("#search-input")
    inputfield.addEventListener("keyup", () => {

        let filteredResults = [];
        for (const iti of dataStorage) {
            let artistID = iti.id.toLowerCase();
            //   let carBrand = iti.initials.brand.toLowerCase();

            if (artistID.includes(inputfield.value.toLowerCase())) {
                filteredResults.push(iti);
            }
            //   else if (carBrand.includes(value.toLowerCase())) 
            //   {
            //     filteredResults.push(iti);
            //   }

        }

        console.log(inputfield.value);
        Append(filteredResults)
    })

}
search()




// // fetch  data from spotify database
// // let AId = '6u7q0ZGK0oilVYx4kqIk3E'
// // fetch(`https://api.spotify.com/v1/artists/${AId}`, {
// //             method: 'GET', headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + 'BQBdF2vXOMbJn6qZ6kBCB-mwIEiy-wbi6V932jng7-EYarvWvaJFaxbSMdwSZMBvRuYizqEbpO_mL8XsO8jOnW47bp8JFciLwtwW_-Bqv0jJMiZuBOVnwctdncVeGW1AeVJg2khM8i3e'
// //             }
// //         })
// //             .then((response) => {
// //                 console.log(response.json().then(
// //                     (data) => { console.log(data) }
// //                 ));
// //             });

