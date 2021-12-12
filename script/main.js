"use strict"

// fetch example data from json database 
const url = "data/local_artist.json";
let loadData = async () =>
{
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    Append(data)
}         
loadData()

let Append = (wholeDataBase) =>
{
let htmlTemlate = ""
for (let iterator of wholeDataBase) {
    htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.id}</h1>`
    console.log(iterator.id);
}
document.querySelector("#scene").innerHTML = htmlTemlate;
}



// HERE
let appendThis = (wholeDataBase) =>
{
let htmlTemlate = ""
for (let iterator of wholeDataBase) {
    htmlTemlate += `<h1 onclick="appendThis(this)">${iterator.id}</h1>`
    console.log(iterator.id);
}
document.querySelector("#scene").innerHTML = htmlTemlate;
}



// fetch  data from spotify database 
// let AId = '6u7q0ZGK0oilVYx4kqIk3E'
// fetch(`https://api.spotify.com/v1/artists/${AId}`, {
//             method: 'GET', headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + 'BQBdF2vXOMbJn6qZ6kBCB-mwIEiy-wbi6V932jng7-EYarvWvaJFaxbSMdwSZMBvRuYizqEbpO_mL8XsO8jOnW47bp8JFciLwtwW_-Bqv0jJMiZuBOVnwctdncVeGW1AeVJg2khM8i3e'
//             }
//         })
//             .then((response) => {
//                 console.log(response.json().then(
//                     (data) => { console.log(data) }
//                 ));
//             });


