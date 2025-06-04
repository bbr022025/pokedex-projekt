/* First attempt: just make a variable to fetch the data of a pokemon, then log the data.
Issue: 
*/

// ```JS ```;

// Selects #pokedex and assign it to a variable.
let pokedex = document.querySelector("#pokedex");

/* Define a function to get data from the API and append an
image to #pokedex. */
async function fetchDitto() {
  let dittoCall = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await dittoCall.json();
  let dittoImage = document.createElement("img");
  let dittoName = document.createElement("h2");
  let dittoType = document.createElement("h3");
  pokedex.appendChild(dittoImage);
  pokedex.appendChild(dittoName);
  pokedex.appendChild(dittoType);

  dittoImage.setAttribute("src", data.sprites.front_default);
  dittoName.textContent += `${data.name}`;
  dittoType.textContent += `${data.types[0].type.name}`;
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
