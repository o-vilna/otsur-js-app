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
pokemonList.forEach(function (pokemon) {
  let result = "";
  if (pokemon.height > 6) {
    result = "- Wow, that’s big!"; // If height is greater than 6, set result to "Wow, that’s big!"
  }
  //console.log(pokemon.name + " (height: " + pokemon.height + result + ")");
//});
  document.write(
    pokemon.name + " (height: " + pokemon.height + result + ")<br>"
  );
});
