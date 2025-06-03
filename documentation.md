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
