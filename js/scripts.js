// Creating pokemonRepository module
let pokemonRepository = (function () {
  // Setting up the pokemon list
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  //let modalContainer = document.querySelector("#modal-container");//

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
      pokemon.name.toLowerCase().startsWith(name.toLowerCase()),
    );
  }

  function showModal(title, text, imageUrl) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.text(title);
    modalBody.html(
      `<p>${text}</p><img src="${imageUrl}" class="modal-image img-fluid" alt="${title} image">`,
    );
    $("#exampleModal").modal("show");
  }

  function showDetails(pokemon) {
    showModal(
      pokemon.name,
      `Height: ${pokemon.height} \nWeight: ${pokemon.weight}`,
      pokemon.imageUrl,
    );
  }
  // Function to add a list item
  function addListItem(pokemon) {
    let ulistItem = document.querySelector("#list");
    let listItem = document.createElement("div");
    listItem.classList.add(
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "col-12",
      "mb-4",
    );

    let card = document.createElement("div");
    card.classList.add("card", "mb-3", "h-100");

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title", "text-center");
    cardTitle.innerText = pokemon.name;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text", "text-center");
    cardText.innerText = `Type: ${pokemon.types
      .map((typeInfo) => typeInfo.type.name)
      .join(", ")}`;

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = pokemon.imageUrl;
    cardImage.alt = `Image of ${pokemon.name}`;

    let cardButton = document.createElement("button");
    cardButton.classList.add("btn", "btn-secondary");
    cardButton.innerText = "More Details";
    cardButton.setAttribute("data-toggle", "modal");
    cardButton.setAttribute("data-target", "#exampleModal");

    cardButton.addEventListener("click", function () {
      showDetails(pokemon);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    listItem.appendChild(card);
    ulistItem.appendChild(listItem);
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
        item.weight = details.weight;
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
      .querySelector(".form-control")
      .addEventListener("input", function () {
        let searchQuery = this.value.toLowerCase();
        let filteredPokemon = findByName(searchQuery);

        let ulistItem = document.querySelector(".row");
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
  };
})();
pokemonRepository.launchProcesses();
