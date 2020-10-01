handleFirstLoadPage();

function handleFirstLoadPage() {
  const url = "https://pokeapi.co/api/v2/pokemon/1/";
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => fillPokemonImage(data))
    .then((data) => fillPokemonInfo(data))
    .catch((err) => console.log(err));
}

function fillPokemonImage(data) {
  const urlImage = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`;
  const image = document.createElement("img");
  image.src = urlImage;
  const imageElement = document.querySelector(".pokemon .image");
  imageElement.innerHTML = "";
  imageElement.appendChild(image);
  return data;
}

function fillPokemonInfo(data) {
  const infoElement = document.querySelector(".pokemon .info");
  infoElement.innerHTML = "";
  createPokemonNameElement(data, infoElement);
  for (let statEl of data.stats) {
    createStatsElements(statEl, infoElement);
  }
  for (let index = 0; index < data.abilities.length; index++) {
    createAbilitiesElements(data.abilities[index].ability, infoElement);
  }
  return data;
}

function createPokemonNameElement(data, infoElement) {
  const pokemonName = document.createElement("h2");
  pokemonName.className = "name";
  pokemonName.innerHTML = `#${data.id} - ${capitalize(data.name)}`;
  infoElement.appendChild(pokemonName);
}

function createStatsElements(statEl, infoElement) {
  const statElement = document.createElement("p");
  statElement.id = `#${statEl.stat.name}`;
  const attribute = document.createElement("span");
  attribute.className = "attribute";
  attribute.innerHTML = `${statEl.stat.name}:`;
  statElement.innerHTML = attribute.outerHTML + statEl.base_stat;
  infoElement.appendChild(statElement);
}

function createAbilitiesElements(data, infoElement) {
  const ability = document.createElement("p");
  ability.id = "ability";
  const attribute = document.createElement("span");
  attribute.className = "attribute";
  attribute.innerHTML = "ability:";
  ability.innerHTML = attribute.outerHTML + data.name;
  infoElement.innerHTML += ability.outerHTML;
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", handleSearchPokemon);

function handleSearchPokemon(event) {
  event.preventDefault();
  debugger;
  const pokemonName = document.querySelector(".input").value;
  if (pokemonName === "") return;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => fillPokemonImage(data))
    .then((data) => fillPokemonInfo(data))
    .catch(() => popUpAlert());
  return;
}

function popUpAlert() {
  const input = document.querySelector(".input");
  input.style.display = "none";
  const alert = document.querySelector(".alert");
  alert.style.display = "inline";
  setTimeout(() => {
    const input = document.querySelector(".input");
    input.style.display = "inline";
    input.value = "";
    input.focus();
    const alert = document.querySelector(".alert");
    alert.style.display = "none";
  }, 3000);
}
