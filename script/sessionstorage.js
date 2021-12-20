
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

