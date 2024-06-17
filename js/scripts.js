// Creating pokemonRepository module
let pokemonRepository = (function () {
  // Setting up the pokemon list
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  // Function to add a new pokemon to the list
  function add(pokemon) {
    // Checking the validity of pokemon data
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
      //console.log("Pokemon added successfully");
    } else {
      console.error("Invalid Pokemon data");
    }
    //console.log(Object.keys(pokemon));
  }
  // Function to get the list of all pokemons
  function getAll() {
    return pokemonList;
  }
  function findByName(name) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(name.toLowerCase())
    );
  }
  function showModal(title, text, imageUrl) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.classList.add("modal-image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // Event listeners for modal interactions
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  function showDetails(pokemon) {
    showModal(
      pokemon.name,
      `Height: ${pokemon.height} \nType: ${pokemon.types
        .map((typeInfo) => typeInfo.type.name)
        .join(", ")}`,
      pokemon.imageUrl
    );
  }

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function addListItem(pokemon) {
    // Assign the ul element with class
    let ulistItem = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");

    let image = document.createElement("img");
    image.src = pokemon.imageUrl;
    image.alt = pokemon.name;
    image.classList.add("pokemon-image");

    button.appendChild(image);

    listItem.appendChild(button);
    ulistItem.appendChild(listItem);

    button.addEventListener("click", function () {
      pokemonRepository.showDetails(pokemon);
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
  //Function to setup search filter
  function setupSearchFilter() {
    document
      .querySelector(".search-input")
      .addEventListener("input", function () {
        let searchQuery = this.value.toLowerCase();
        let filteredPokemon = findByName(searchQuery);

        let ulistItem = document.querySelector(".pokemon-list");
        ulistItem.innerHTML = "";
        filteredPokemon.forEach(function (pokemon) {
          addListItem(pokemon);
        });
      });
  }

  function launchProcesses() {
    loadList().then(function () {
      let promises = pokemonList.map((pokemon) => loadDetails(pokemon));
      Promise.all(promises).then(function () {
        pokemonList.forEach((pokemon) => addListItem(pokemon));
        setupSearchFilter();
      });
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
    setupSearchFilter: setupSearchFilter,
    launchProcesses: launchProcesses,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.launchProcesses();
