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
    let btn = document.querySelector(".add-more-btn")

    btn.addEventListener('click', () => {
        console.log("df");
        // document.querySelector(".card-container").appendChild(newCard)
        // document.querySelector(".add-more-btn").classList.add("btn-to-search")

        // Append selected card to the compare bar
        let newCard = document.createElement("div")
        newCard.innerHTML = "<p>krubi</p>"
        let krubi = "krubi"
        newCard.classList.add("compare-item-card")
        newCard.innerHTML = `<p>${krubi}</p> <span>&#10005;</span>`
        document.querySelector(".card-container").appendChild(newCard)
    })
    // btn.classList.remove("compare-bar")
    // btn.style.width = "230px"
}

// addToCompare()


let tranformToSearch = () => {

    let newItem = document.createElement("div")
    newItem.classList.add("search-container")
    newItem.style.backgroundColor = "rgb(209, 209, 209)"
    newItem.innerHTML = `<input placeholder="Search" class="search-input"><span onclick="closeSearch" class="spanom">&#10005;</span>`
    let oldItem = document.querySelector(".add-more-btn")
    setTimeout(() => {
        document.querySelector(".search-input").focus()
    }, 10);
    document.querySelector(".compare-container").replaceChild(newItem, oldItem)
    search()
}

const closeSearch = () => {
    let newItem = document.createElement("div")
    newItem.classList.add("add-more-btn")
    newItem.innerHTML = ` <p>add more</p> <span>&#10005;</span>`
    let oldItem = document.querySelector("search-container")
    document.querySelector(".compare-container").replaceChild(newItem, oldItem)
}




let Append = (wholeDataBase) => {
    let htmlTemlate = ""
    for (let iterator of wholeDataBase) {
        htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.artist}</h1>`

    }
    document.querySelector("#scene").innerHTML = htmlTemlate;
}



// HERE
let appendThis = (wholeDataBase) => {
    let htmlTemlate = ""
    for (let iterator of wholeDataBase) {
        htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.artist}</h1>`
        console.log(iterator.artist);
    }
    document.querySelector("#scene").innerHTML = htmlTemlate;
}

// search in for artist,albums etc in the database
const search = () => {
    const inputfield = document.querySelector(".search-input")
    inputfield.addEventListener("keyup", () => {
        let filteredResults = [];
        for (const iti of dataStorage) {
            let artistID = iti.artist.toLowerCase();
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

