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

}

// addToCompare()


let tranformToSearch = () => {

    document.querySelector(".add-more-btn").addEventListener('click', () => {
        let newItem = document.createElement("div")
        newItem.classList.add("search-container")
        newItem.style.backgroundColor = "rgb(209, 209, 209)"
        newItem.innerHTML = `<input placeholder="Search" class="search-input"><span class="spanom">&#10005;</span>`
        let oldItem = document.querySelector(".add-more-btn")
        setTimeout(() => {
            document.querySelector(".search-input").focus()

        }, 10);
        document.querySelector(".compare-container").replaceChild(newItem, oldItem)
        search()
    })

}
tranformToSearch()

let closeSearch = () => {
    document.querySelector(".spanom").addEventListener("click", () => {
        let oldItem = document.querySelector(".search-container")
        let newItem = document.createElement("div")
        newItem.setAttribute('onclick', "tranformToSearch()")

        newItem.classList.add("add-more-btn")
        newItem.innerHTML = ` <p>add more</p><span>&#10005;</span>`
        document.querySelector(".compare-container").replaceChild(newItem, oldItem)
        setTimeout(() => {
            newItem.click()
        }, 10);
    })
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
            let artistID = iti.artist.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            //   let carBrand = iti.initials.brand.toLowerCase();
            if (artistID.includes(inputfield.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
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

    closeSearch()
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

