// Creating pokemonRepository module
let pokemonRepository = (function () {
  // Setting up the pokemon list
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  // Function to add a new pokemon to the list
  function add(pokemon) {
    // Checking the validity of pokemon data
    if (typeof pokemon === "object" && "name" in pokemon) {
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

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
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

  function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading...";
    loadingMessage.id = "loading-message";
    document.body.appendChild(loadingMessage);
  }
  function hideLoadingMessage() {
    let loadingMessage = document.getElementById("loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  return {
    add: add,
    getAll: getAll,
    findByName: findByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
let filteredPokemon = pokemonRepository.findByName("Squirtle");
console.log(filteredPokemon);
