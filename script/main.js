"use strict"

// load data from local file
const url = "data/local_artist.json";

let dataStorage = []
const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()
    // Append(data)                  ez a regi h1es append, torolt ezt es a funct is
    // save to global var
    dataStorage = data;
}
getData()

// Append selected card to the compare bar....2xvan
const addToCompare = (nameIn) => {
    // Append selected card to the compare bar
    let barValues = sessionStorage.getItem("toCompare") != null ? sessionStorage.getItem("toCompare") : [];
    if (!barValues.includes(nameIn.parentElement.children[0].innerHTML)) {
        let newCard = document.createElement("div")
        newCard.classList.add("compare-item-card")
        newCard.innerHTML = `<p>${nameIn.parentElement.children[0].innerHTML}</p> <span onclick="deleteFromCompare(this)" class="compareCardDeleteBtn">&#10005;</span>`;
        saveTosessionStorage(nameIn.parentElement.children[0].innerHTML);
        document.querySelector(".card-container").appendChild(newCard)
    }




}

// Delete cards from the compare par by click on X
const deleteFromCompare = (e) => {
    e.parentElement.remove()
    deleteFromsessionStorage(e.parentElement)
}
// Delete cards from the sessionStorage
const deleteFromsessionStorage = (item) => {
    let toCompare;
    if (sessionStorage.getItem('toCompare') === null) {
        toCompare = []
    }
    else {
        toCompare = JSON.parse(sessionStorage.getItem('toCompare'))
    }
    let itemToRemoveIndex = item.children[0].innerText;
    toCompare.splice(toCompare.indexOf(itemToRemoveIndex), 1);
    sessionStorage.setItem('toCompare', JSON.stringify(toCompare))
}


// save selected artists/albums etc to local storage 
const saveTosessionStorage = (item) => {
    let toCompare;
    if (sessionStorage.getItem('toCompare') === null) {
        toCompare = []
    }
    else {
        toCompare = JSON.parse(sessionStorage.getItem('toCompare'))
    }
    toCompare.push(item)
    console.log(item);
    sessionStorage.setItem('toCompare', JSON.stringify(toCompare))
}
// get and append the locasstorage values (saved artists/albums etc) to the DOM 
const getFromsessionStorage = () => {
    let toCompare;
    if (sessionStorage.getItem('toCompare') === null) {
        toCompare = []
    }
    else {
        toCompare = JSON.parse(sessionStorage.getItem('toCompare'))
    }
    for (const iti of toCompare) {
        let newCard = document.createElement("div")
        newCard.classList.add("compare-item-card")
        newCard.innerHTML = `<p>${iti}</p> <span onclick="deleteFromCompare(this)" class="compareCardDeleteBtn">&#10005;</span>`;
        document.querySelector(".card-container").appendChild(newCard)

    }
}
getFromsessionStorage()


// animation to searchbar to appear
let tranformToSearch = () => {
    document.querySelector(".add-more-btn").addEventListener('click', () => {
        let newItem = document.createElement("div")
        newItem.classList.add("search-container")
        newItem.style.backgroundColor = "rgb(209, 209, 209)"
        newItem.innerHTML = `

        <table class="search-table">
            <thead>
                <tr>
                    <th><input placeholder="Search" class="search-input"></th>
                    <th><span class="spanom">&#10005;</span></th>
                </tr>
            </thead>
            <tbody id="stable">

            </tbody>
                
        </table>`
        let oldItem = document.querySelector(".add-more-btn")
        setTimeout(() => {
            document.querySelector(".search-input").focus()
        }, 10);
        document.querySelector(".cards-container").replaceChild(newItem, oldItem)
        search()
    })

}
tranformToSearch()

// animation to searchbar to disappear
let closeSearch = (click) => {
    let oldItem = document.querySelector(".search-container")
    let newItem = document.createElement("div")
    let clsItem = document.querySelector(".spanom")
    if (clsItem != null && oldItem != null) {
        clsItem.addEventListener("click", () => {

            newItem.setAttribute('onclick', "tranformToSearch()")

            newItem.classList.add("add-more-btn")
            newItem.innerHTML = ` <p>add more</p><span>&#10005;</span>`
            document.querySelector(".cards-container").replaceChild(newItem, oldItem)

        }
        )


    }



}






let Append = (wholeDataBase) => {
    let htmlTemlate = ""
    for (let iterator of wholeDataBase) {
        htmlTemlate += `<h1 onclick="addToCompare(this)">${iterator.artist}</h1>`

    }
    document.querySelector("#scene").innerHTML = htmlTemlate;
}

// display the filtered results
let appendSerch = (filtered) => {
    let htmlTemlate = ""
    for (let iterator of filtered) {
        htmlTemlate += `
                <tr>
                    <td onclick="addToCompare(this)" >${iterator.artist}</td>
                    <td onclick="addToCompare(this)" ><i  class="far fa-plus-square"></i></td>
                </tr>`
    }
    document.querySelector("#stable").innerHTML = htmlTemlate;
}

// search in for artist,albums etc in the database
const search = () => {
    const inputfield = document.querySelector(".search-input")
    inputfield.addEventListener("keyup", () => {
        let filteredResults = [];
        // go through the og database and check if the input matches de database
        for (const iti of dataStorage) {
            // convert to lowercase and no special characters 
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
        if (inputfield.value != "") {
            appendSerch(filteredResults)
        }
        else {
            appendSerch("")
            closeSearch("clicked")
        }
    })

    closeSearch()
}




// document.addEventListener('click', () => {
//     let iz = document.querySelector(".search-input")
//     if (iz != document.activeElement) {
//         closeSearch("clicked")
//     }

// });





const compare = () => {
    let selectedItems = sessionStorage.getItem("toCompare")
    let selectedYears = document.querySelector("#year-select").value
    console.log(selectedYears);
    sessionStorage.setItem('year', JSON.stringify(selectedYears))

    let selectedItemsInString = JSON.parse(selectedItems)
    // console.log(selectedItemsInString.length);
    let xs_labels = []
    let ys = [80, 90, 100, 110, 120]
    let labels = []


    let artistall = []

    for (let i of dataStorage) {

        for (let k of selectedItemsInString) {

            if (i.artist == k) {

                artistall.push(i)
                labels.push(i.artist)
                xs_labels.push(i.listeners)


            }
        }

    }

    // reset the canvas for chart (avoid to destroy)
    document.querySelector("#scene").innerHTML = '<canvas id="graph-container"></canvas>'
    appendChart({ ys, xs_labels, labels, artistall })
}


let valueReturn = (arrayIn) => {
    var value = []
    for (let iterator in arrayIn) {
        value.push(arrayIn[iterator])
    }
    return value
}

let appendChart = (data) => {

    let selectedLength = data.artistall.length;
    let selectedYear = JSON.parse(sessionStorage.getItem('year'))

    let firstSelected = data.artistall[0]
    let secondSelected = selectedLength > 1 ? data.artistall[1] : ""
    let thirdSelected = selectedLength > 2 ? data.artistall[2] : ""

    let firstSelected_y = valueReturn(firstSelected['listeners'][0][`${selectedYear}`][0])
    let secondSelected_y = selectedLength > 1 ? valueReturn(secondSelected['listeners'][0][`${selectedYear}`][0]) : ""
    let thirdSelected_y = selectedLength > 2 ? valueReturn(thirdSelected['listeners'][0][`${selectedYear}`][0]) : ""

    console.log(selectedYear);

    var ctx = document.getElementById('graph-container').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(data.xs_labels[0][0][selectedYear][0]),
            datasets: [{
                label: data.labels[0],
                data: firstSelected_y,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                radius: 1.5
            }, {
                label: selectedLength > 1 ? data.labels[1] : "",
                data: secondSelected_y,
                backgroundColor: selectedLength > 1 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0)',
                borderColor: selectedLength > 1 ? 'rgba(54, 162, 235, 1)' : 'rgba(54, 162, 235, 0)',
                borderWidth: 2,
                radius: 1.5
            }, {
                label: selectedLength > 2 ? data.labels[2] : "",
                data: thirdSelected_y,
                backgroundColor: selectedLength > 2 ? 'rgba(54, 162, 0, 0.2)' : 'rgba(54, 162, 0, 0)',
                borderColor: selectedLength > 2 ? 'rgba(54, 162, 0, 1)' : 'rgba(54, 162, 0, 0)',
                borderWidth: 2,
                radius: 1.5
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'hallgatottsag',
                    padding: 30,
                    fontsize: '30px',
                    font: {
                        weight: 'bold',
                        size: 20
                    },
                }
            }

        }
    });

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

