// ----------------------------------------------
// Selects #pokedex and assign it to a variable.
// ----------------------------------------------

let pokedex = document.querySelector("#pokedex");
let gallery = document.querySelector("#pokeGallery");

// ------------------------------------
// An input field to search for Pokémon
// ------------------------------------

function searchPokemon() {
  let searchInput = document.createElement("input");
  searchInput.value = "";
  searchInput.placeholder = "Enter Pokémon name or ID!";
  searchInput.addEventListener("input", () => {
    search = searchInput.value;
  });
  return searchInput;
}

// ----------------------------
// An button to activate search
// ----------------------------

function searchButton() {
  let pokeButton = document.createElement("button");
  pokeButton.setAttribute("class", "button");
  pokeButton.textContent = "Search";
  pokeButton.addEventListener("click", async () => {
    pokeGallery.innerHTML = "";
    await displayPokemon(search);
  });
  return pokeButton;
}

// -----------------------------------------------------
// Define a function to get and store data from the APIs.
// -----------------------------------------------------

async function fetchPokemonData(pokemon) {
  let pokemonCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  let pokemonFlavor = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  );
  let callData = await pokemonCall.json();
  let flavorData = await pokemonFlavor.json();
  return { callData, flavorData };
}

// -------------------------------------------------------------------
// Define a function to create elements and append them to the website
// -------------------------------------------------------------------

function appendPokemon(callData, flavorData) {
  // ---------------------------------------------
  // Create elements for the website.
  // ---------------------------------------------

  let pokemonImage = document.createElement("img");
  let pokemonName = document.createElement("h2");
  let pokemonType = document.createElement("h3");
  let pokemonDescription = document.createElement("p");

  // ---------------------------------------------
  // Append the elements to the website
  // ---------------------------------------------

  pokeGallery.append(
    pokemonImage,
    pokemonName,
    pokemonType,
    pokemonDescription
  );

  // ---------------------------------------------------------
  // Use data from the APIs to set attributes for the elements
  // ---------------------------------------------------------

  pokemonImage.setAttribute("src", callData.sprites.front_default);
  pokemonName.textContent += `${callData.name}`;
  pokemonType.textContent += `${callData.types[0].type.name}`;
  pokemonDescription.textContent += `${flavorData.flavor_text_entries[0].flavor_text}`;
}

// ---------------------------------------------------------------------
// Define a function to get data from the APIs and append it to #pokedex
// ---------------------------------------------------------------------

async function displayPokemon(pokemon) {
  let { callData, flavorData } = await fetchPokemonData(pokemon);
  appendPokemon(callData, flavorData);
}

// ---------------------------------------------------------------------------
// A function that churns out a given number of Pokémon if you feed it an ID.
// Must be ameliorated to account for strings as well.
// ---------------------------------------------------------------------------
function pokemonPump(initialPokemon, finalPokemon) {
  for (let i = initialPokemon; i <= finalPokemon; i++) {
    displayPokemon(i);
  }
}

// Display everything
pokedex.append(searchPokemon());
pokedex.append(searchButton());
