/* First attempt: just make a variable to fetch the data of a pokemon, then log the data.
Issue: 
*/

// ```JS ```;

let pokedex = document.querySelector("#pokedex");

async function fetchDitto() {
  let dittoCall = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await dittoCall.json();
  let dittoImage = document.createElement("img");
  pokedex.appendChild(dittoImage);

  dittoImage.setAttribute("src", data.sprites.front_default);
  console.log(data);
}

fetchDitto();

// let data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
// console.log(data);

// async function fetchUserData() {
//   try {
//     let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
//     let data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Feil ved henting av data", error);
//   }
// }

// fetchUserData();

console.log("JS connected!");
