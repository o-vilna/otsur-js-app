let pokemonRepository = (function () {
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
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
  };
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu" });
pokemonRepository.getAll().forEach(function (pokemon) {
  let result = "";
  if (pokemon.height > 6) {
    result = "- Wow, that’s big!"; // If height is greater than 6, set result to "Wow, that’s big!"
  }
  document.write(
    pokemon.name + " (height: " + pokemon.height + result + ")<br>"
  );
});
