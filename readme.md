# Pokedex project

- Make a pokedex utilizing an online API.
- It ought to be searchable,
  - show Pokemon in a 5x5
  - with a slider that gives you the next 5x5 Pokemon
- There should be a focus element for a single pokemon.
  - It should show the pokemon in a card
  - a picture of the pokemon
    - when the picture is pressed they'll make a sound.
  - They'll have number in addition to name
  - their type will be displayed in a box that has the color of their type.
  - There will also be a description of each pokemon.

## Step 0

- [x] Create a folder for the project
- [x] Create a css,html,js-file for the project.

## Step 1

Integrating the API in the most basic possible way.

### First try

```JS
let data = fetch("https://pokeapi.co/api/v2/pokemon/ditto");
console.log(data);
```

Yields the following message:

```
Promise { <state>: "pending" } script.js:2:9
```

So fetch returns a **pending promise** which is why we need to wait for the data and extract it somehow.

### Second try

```JS
let data = fetch("https://pokeapi.co/api/v2/pokemon/ditto");
console.log(data);
```

Now I need to add it into an async function, because... _(reasons)_.

### Third try

```JS

async function fetchDitto {
    let data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
}

fetchDitto();

console.log(data);

```

- When I declare a function the function must be called fetchDitto().
- What I'm trying to log is outside the **scope** where data is defined.
- Jeg må få dataen ut i en .json-fil.

### Fourth try

```JS

async function fetchDitto() {
  let call = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await Response.json();
  console.log(data);
}

fetchDitto();
```

- So there's something wrong with how I set up fetching.
- Check documentation for async functions with fetch/await and try again.

### Fifth try

```JS

async function fetchDitto() {
  let dittoCall = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await dittoCall.json();
  console.log(data);

}

fetchDitto();



```

- OK! Checks out. Now I need to get an overview of the methods I need for DOM-manipulation.
  - I'll need to display an image of the Pokemon, so getting the image into the HTML-document.
  - Then try to display its name.
  - I'll also need to add some classes for styling, so I don't have to bother with that later. So I'll have to set up some **basic utility classes**.
    - flex, center, gap

## Step 2

### First try

```JS

let dittoImage = document.createElement("img")
bilde.setAttribute("src", `$(sprites?!)`);

```

I just need to throw shit at the wall and see what error messages I get, then read up on the documentation for the API.

- Should have called bilde --> dittoImage obviously.

### Second try

```JS

let pokedex = document.querySelector("#pokedex");

async function fetchDitto() {
  let dittoCall = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  let data = await dittoCall.json();
  console.log(data);
}

fetchDitto();

let dittoImage = document.createElement("img");
dittoImage.setAttribute("src", data.sprites.front_default);

```

- Ok, så bildet må inn i funksjonen slik at det har riktig **scope**
- Så må det appendes til pokedex.

### Third try

```js
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
```

Okay, so that worked. Now to try to explain what happened.

1. First, I define a variable that selects the div called pokedex. _Now, the question is whether this should be a let or a const_.
2. Second, I define a function called fetch Ditto.
   1. This needs to be an async function because we're using await.
      1. We're using await because we're using fetch, so fetch/await and async go hand in hand.
         1. This is because the function needs to integrate promises, and those needs to be fetched as the function is running, they're not preloaded into the function itself.
   2. I then create a variable that waits for fetch to do its job; getting the data from the API.
   3. Then I create a variable that awaits the creation of a .json-element that uses the data fetched from the API.
   4. Then I create a variable that creates an img-element and appends it to the pokedex-div.
   5. Finally, I alter the src-attribute of that variable to the data relevant to Ditto from the API.
   6. Well, I also just console.log the data from the API, but that's not very important.
3. Finally, I call the fetchDitto-function, it then does what I told it to do, and an image of Ditto is generated.

### Fourth try

I tried to add some new datapoints: name and type.

```JS

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
  dittoType.textContent += `${data.types.type.name}`;
  console.log(data);
}

```

This runs into the issue that I use:

```JS
dittoType.textContent += `${data.types.type.name}`;
```

That doesn't work because I'm trying to take text content from an array (types). It actually needs to be something like:

```JS
dittoType.textContent += `${data.types[0].type.name}`;
```

Now I'm telling it that I want to grab the type.name from the first list of the array. Probably.. I might want to loop through the types-array, because other Pokemon might have several types... That'll be on a future to-do list, when I generalize the function to work for all Pokémon.

Also added HTML and CSS:

- the first letter is defined in uppercase using pseudo-classes
- The imported objects are aligned to the center (cc = center center) using utility classes.

#### HTML

- flex and cc add flexbox and center items along both main axes.
- Added some minimal in-line styling just for ease of viewing.
  - Can add this via CSS later.

```HTML
  <body class="flex cc">
    <div id="pokedex" class="flex column cc" style="gap: 0.5rem"></div>
  </body>
```

#### CSS

- Added a border so I can see boxes without inspecting.
- Added utility classes to center boxes.
- Added a pseudo-element to tweak Pokémon names from API.

```CSS
* {
  border: 1px solid red;
  }

/* ----------------- */
/*  UTILITY CLASSES  */
/* ----------------- */

.flex {
  display: flex;
}

.cc {
  justify-content: center;
  align-items: center;
}

.column {
    flex-direction: column;
}

/* ------------ */
/*     BODY     */
/* ------------ */

h2::first-letter {
  text-transform: uppercase;
}
```

### Fifth try

Added a new fetch to get Ditto's flavor text and appended a paragraph where its flavor text is inputted.

```JS

let dittoFlavor = await fetch("https://pokeapi.co/api/v2/pokemon-species/ditto");

let dittoDescription = document.createElement("p");
pokedex.appendChild(dittoDescription);

dittoDescription.textContent += `${flavor.flavor_text_entries[0].flavor_text}`;

```

- [ ] **Vurdere å legge til en width på 15 rem for å få teksten til å se bra ut, i tillegg til text-wrap: balance.**
- [ ] Ta en nøyere titt på Andy Bell's CSS-reset iht. bilder/tekst.

## Step 3

Generaliser funksjonen til å ta inn en hvilken som helst Pokémon.

### Step 3a

Generaliserte funksjonen og la inn (overdrevet mange) kommentarer.

- [ ] Oversette kommentarer til engelsk & kjøre tekstkorrektur.
- [ ] Forenkle mine stream of consciousness-kommentarer.

```JS

// ----------------------------------------------
// Selects #pokedex and assign it to a variable.
// ----------------------------------------------

let pokedex = document.querySelector("#pokedex");

// ---------------------------------------------------------------------
// Define a function to get data from the APIs and append it to #pokedex
// ---------------------------------------------------------------------

async function fetchPokemon(pokemon) {
  // -------------------------------------------------------------------------------------
  // fetching data from the APIs
  // -------------------------------------------------------------------------------------

  let pokemonCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  let pokemonFlavor = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  );

  // -------------------------------------------------------------------------------------
  // Store the data.
  // ---------------------------------------------

  let callData = await pokemonCall.json();
  let flavorData = await pokemonFlavor.json();

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

  pokedex.appendChild(pokemonImage);
  pokedex.appendChild(pokemonName);
  pokedex.appendChild(pokemonType);
  pokedex.appendChild(pokemonDescription);

  // ---------------------------------------------------------
  // Use data from the APIs to set attributes for the elements
  // ---------------------------------------------------------

  pokemonImage.setAttribute("src", callData.sprites.front_default);
  pokemonName.textContent += `${callData.name}`;
  pokemonType.textContent += `${callData.types[0].type.name}`;
  pokemonDescription.textContent += `${flavorData.flavor_text_entries[0].flavor_text}`;
}

```

### Step 3b - First try

Call the function and make it display the first ten Pokémon in the **simplest** possible way.

```JS

fetchPokemon(1);
fetchPokemon(2);
fetchPokemon(3);
fetchPokemon(4);
fetchPokemon(5);
fetchPokemon(6);
fetchPokemon(7);
fetchPokemon(8);
fetchPokemon(9);
fetchPokemon(10);

```

**Issue:** Each call finishes at different times since they're async functions, so the Pokémon won't display in order.

**Insight**: _Async functions might need some kind of timeout when they rely on other async functions._

### Step 3b - Second try

This time I'll try to use a loop. Instructor suggests getting used to making several small functions
and not be tempted to make one big function.

- Fetch som egen funksjon
- Use data from the APIs to set attributes for the elements som egen funksjon.
- **Use do at some point to show evolution chains?**

### Steb 3b - Third try

Okay, so I tried to create more functions, and I also have a function that displays the range of Pokémon I want to display, based on ID. Downside is that it doesn't take strings (yet). ChatGPT suggests the following improvements:

1. 🔄 Improve handling of non-English text
2. 🛑 Prevent broken layout on fetch errors
3. 🧪 Optional: Accept names (strings) in pokemonPump

```JS

// ----------------------------------------------
// Selects #pokedex and assign it to a variable.
// ----------------------------------------------

let pokedex = document.querySelector("#pokedex");
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

  pokedex.appendChild(pokemonImage);
  pokedex.appendChild(pokemonName);
  pokedex.appendChild(pokemonType);
  pokedex.appendChild(pokemonDescription);

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
pokemonPump(1, 3);

```

## Step 4

- Add a search bar that parces integers as well as strings.

  - Find a method that filters strings based on search parameters: type, element, rarity etc.

  ### First try

  Tried to create a search function that fulfills the criteria:

  ```JS
  function searchInput() {
  let searchPokemon = document.createElement("input");
  inputElement.value = search;
  inputElement.placeholder = "Enter Pokémon name or ID!";
  inputElement.addEventListener("input", () => (search = inputElement.value));
  return inputElement;
  }
  ```

  Things I did wrong:

  - Inconsistent naming conventions.

  ## Second try

  Create a function to output Pokémon from the search function.

  
