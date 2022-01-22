"use strict"

// google analitics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'G-Q02SM9WTBM');

// load data from local file
const url = "data/local_artist.json";

let dataStorage = []
const getData = async () => {
    const response = await fetch(url)
    const data = await response.json()

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


// close searchbar if user clicks somewhere else 
document.addEventListener("click", (evt) => {
    barItemCounter()
    const flyoutElement = document.querySelector(".addmr-container");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            return;
        }

        targetElement = targetElement.parentNode;
    } while (targetElement);

    document.querySelector("#checkbox-search").checked = false
});




document.addEventListener('click', (e) => {


    if (document.querySelector("#checkbox-search").checked) {
        document.querySelector(".for-input-search").style.opacity = "0"
        document.querySelector(".input-search").focus()

        document.querySelector(".for-checkbox-search").classList.add("x-rotate")
        document.querySelector(".input-search").classList.add("input-search-to-search")
        search()
        let newitem = `<table class="search-table">
        <thead>
            <tr>
            <input spellcheck="false" class="input-search" id="input-search">
            <label class="for-input-search" for="input-search">add more</label>


            <input id="checkbox-search" type="checkbox">
            <label class="for-checkbox-search" for="checkbox-search">&#10005;</label>

            </tr>
        </thead>
        <tbody id="stable">

        </tbody>

    </table>`
        // document.querySelector(".addmr-container").innerHTML = newitem

    }
    else if (!document.querySelector("#checkbox-search").checked) {
        document.querySelector(".input-search").value = ""
        document.querySelector(".for-input-search").style.opacity = "1"
        document.querySelector(".input-search").classList.remove("input-search-to-search")
        document.querySelector(".for-checkbox-search").classList.remove("x-rotate")
        document.querySelector(".for-input-search").blur()
        appendSerch("")

    }
})

const barItemCounter = () => {


    let db = JSON.parse(sessionStorage.getItem("toCompare")) != null ? JSON.parse(sessionStorage.getItem("toCompare")).length : 0;

    if (db > 2) {
        document.querySelector("#checkbox-search").checked = false;
        document.querySelector("#checkbox-search").disabled = true;
        document.querySelector(".input-search").classList.add("disabled")
        document.querySelector(".for-input-search").style.color = "gray"
        document.querySelector(".for-checkbox-search").style.color = "gray"
        document.querySelector(".compare-btn").disabled = false;

    }
    else if (db < 1) {
        document.querySelector(".compare-btn").disabled = true;
        document.querySelector(".for-input-search").innerHTML = "add artist"


    }
    else {
        document.querySelector(".for-input-search").style.color = "#1db954"
        document.querySelector(".for-checkbox-search").style.color = "#1db954"
        document.querySelector("#checkbox-search").disabled = false;
        document.querySelector(".input-search").classList.remove("disabled")
        document.querySelector(".for-input-search").classList.remove("disabled")
        document.querySelector(".for-input-search").innerHTML = "add more"
        document.querySelector(".compare-btn").disabled = false;


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


// display the filtered results
let appendSerch = (filtered) => {
    let htmlTemlate = ""
    for (let iterator of filtered) {
        htmlTemlate += `
                <tr>
                    <td onclick="addToCompare(this)" >${iterator.artist}</td>
                    <td><span class="item-type">artist</span></td>
                    <td onclick="addToCompare(this)"><i  class="far fa-plus-square"></i></td>
                </tr>`
    }
    document.querySelector("#stable").innerHTML = htmlTemlate;
}

// search in for artist,albums etc in the database
const search = () => {
    const inputfield = document.querySelector(".input-search")
    inputfield.addEventListener("keyup", () => {
        let filteredResults = [];
        // go through the og database and check if the input matches de database
        for (let iti of dataStorage) {
            // convert to lowercase and no special characters 
            let artist = iti.artist.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');


            if (artist.includes(inputfield.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
                filteredResults.push(iti);
            }


        }
        if (inputfield.value != "") {
            appendSerch(filteredResults)
        }
        else {
            appendSerch("")
        }

    })
}






const compare = () => {

    let selectedItems = sessionStorage.getItem("toCompare") != "undefined" ? sessionStorage.getItem("toCompare") : nth
    let selectedYears = document.querySelector("#year-select").value
    sessionStorage.setItem('year', JSON.stringify(selectedYears))

    let selectedItemsInString = JSON.parse(selectedItems)
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
    if (selectedLength > 0) {
        let selectedYear = JSON.parse(sessionStorage.getItem('year'))

        let firstSelected = data.artistall[0]
        let secondSelected = selectedLength > 1 ? data.artistall[1] : ""
        let thirdSelected = selectedLength > 2 ? data.artistall[2] : ""

        // valueReturn(firstSelected['listeners'][0][`${selectedYear}`][0])   ---ez volt eredetileg

        let firstSelected_y = selectedLength > 0 ? valueReturn(firstSelected['listeners'][0][`${selectedYear}`][0]) : ""
        let secondSelected_y = selectedLength > 1 ? valueReturn(secondSelected['listeners'][0][`${selectedYear}`][0]) : ""
        let thirdSelected_y = selectedLength > 2 ? valueReturn(thirdSelected['listeners'][0][`${selectedYear}`][0]) : ""


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
                maintainAspectRatio: false,
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
                        text: `Listeners in ${selectedYear}`,
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

