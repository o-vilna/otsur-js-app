// Creating pokemonRepository module
let pokemonRepository = (function () {
  // Setting up the pokemon list
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7,
      types: ["grass", "poison"],
    },
    {
      name: "Charmander",
      height: 6,
      types: ["fire"],
    },
    {
      name: "Squirtle",
      height: 5,
      types: ["water"],
    },
  ];
  // Function to add a new pokemon to the list
  function add(pokemon) {
    // Checking the validity of pokemon data
    if (
      typeof pokemon === "object" &&
      typeof pokemon.name === "string" &&
      typeof pokemon.height === "number" &&
      Array.isArray(pokemon.types)
    ) {
      pokemonList.push(pokemon);
      console.log("Pokemon added successfully");
    } else {
      console.error("Invalid Pokemon data");
    }
    console.log(Object.keys(pokemon));
  }
  // Function to get the list of all pokemons
  function getAll() {
    return pokemonList;
  }
  function findByName(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  function addListItem(pokemon) {
    // Assign the ul element with class
    let ulistItem = document.querySelector(".pokemon-list");
    // Create a new li element for each pokemon
    let listItem = document.createElement("li");
    // Creating a button
    let button = document.createElement("button");
    // Set button text to Pokémon name
    button.innerText = pokemon.name;
    // Add class to button
    button.classList.add("pokemon-button");
    // Appending the button to the list item
    listItem.appendChild(button);
    // Adding the li element to the ul
    ulistItem.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    // Iterating over all properties of the current pokemon
    Object.keys(pokemon).forEach(function (key) {
      console.log("Key: " + key + ", Value: " + pokemon[key]);
    });
  }
  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();
console.log(pokemonRepository.getAll());
// Adding a new pokemon to the list
pokemonRepository.add({ name: "Pikachu", height: 10, types: ["electric"] });
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
let filteredPokemon = pokemonRepository.findByName("Squirtle");
console.log(filteredPokemon);
