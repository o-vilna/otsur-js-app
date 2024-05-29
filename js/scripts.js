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
  if (typeof pokemon === 'object' &&
      typeof pokemon.name === 'string' &&
      typeof pokemon.height ==='number' &&
      Array.isArray (pokemon.types)) {
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
    return pokemonList.filter(pokemon => pokemon.name ===name);
  }
  return {
    add: add,
    getAll: getAll,
    findByName: findByName
  };
})();
console.log(pokemonRepository.getAll());
// Adding a new pokemon to the list
pokemonRepository.add({ name: "Pikachu", height: 10, types: ["electric"] });
pokemonRepository.getAll().forEach(function (pokemon) {
  Object.keys(pokemon).forEach(function(key) {
    console.log("Key: " + key + ", Value: " + pokemon[key]);
  });
  const result = pokemon.height > 6 ? "Wow, that’s big!" : "";
});
let filteredPokemon = pokemonRepository.findByName("Squirtle");
console.log(filteredPokemon);
