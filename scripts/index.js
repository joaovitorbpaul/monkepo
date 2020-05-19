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
  const pokemonName = document.querySelector(".pokemon .info .name");
  pokemonName.innerHTML = `#${data.id} - ${capitalize(data.name)}`;
  for (let statEl of data.stats) {
    const statItem = document.querySelector(`#${statEl.stat.name}`);
    statItem.innerHTML = statItem.innerHTML + statEl.base_stat;
  }
  for (let index = 0; index < data.abilities.length; index++) {
    const ability = document.createElement("p");
    ability.id = "ability";
    const attribute = document.createElement("span");
    attribute.className = "attribute";
    attribute.innerHTML = "ability:";
    ability.innerHTML =
      attribute.outerHTML + data.abilities[index].ability.name;
    const infoElement = document.querySelector(`.pokemon .info`);
    infoElement.innerHTML += ability.outerHTML;
  }
  return data;
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", handleSearchPokemon);

function handleSearchPokemon(event) {
  event.preventDefault();
  const pokemonName = document.querySelector(".input").value;
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => fillPokemonImage(data))
    .then((data) => fillPokemonInfo(data))
    .catch((err) => console.log(err));
  return;
}
