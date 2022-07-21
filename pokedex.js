const ALL_POKEMON = [];
const TYPES = ['all'];
const colors = {
    all: '#FFD700',
	grass: "#d2f2c2",
	poison: "#f7cdf7",
	fire: "#ffd1b5",
	flying: "#eae3ff",
	water: "#c2f3ff",
	bug: "#e0e8a2",
	normal: "#e6e6c3",
	electric: "#fff1ba",
	ground: "#e0ccb1",
	fighting: "#fcada9",
	psychic: "#ffc9da",
	rock: "#f0e09c",
	fairy: "#ffdee5",
	steel: "#e6eaf0",
	ice: "#e8feff",
	ghost: "#dbbaff",
	dragon: "#c4bdff",
	dark: "#a9abb0"
};

const getAllPokemons = () => {
   return fetch ('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
    .then ((response) => {
        return response.json();
    })
    .then ((response) => {
      return response;
    })
    .catch ((error) => {
        console.log('Ha habido un error al obtener los pokemon', error);
    });
};

const getPokemon = (url) => {
    return fetch(url)
    .then ((response) => {
        return response.json();
    })
    .then ((response) => {
        const pokemon = {
            name: response.name,
            id: response.id,
            type: response.types.map((type) => type.type.name),
            image: response.sprites.other['official-artwork']['front_default'],                     
        };
        
        pokemon.type.forEach((type) => {
            if (!TYPES.includes(type)) {
              TYPES.push(type);
            }
          });
    
        return pokemon; 
    })
    .catch((error) => console.log('Error obteniendo los pokemons', error));
};

renderPokemons = (pokemons) => {
    const container = document.querySelector(".container")
    container.innerHTML = ""
    for (const pokemon of pokemons) {
        const card = document.createElement("div")
        card.className = "container__card"

        const html = `
            <p class= container__id> ${pokemon.id}</p>
            <p class = "container__name"> ${pokemon.name}</p>
            <img class= "container__image" src =${pokemon.image} alt = ${pokemon.name} >
            <p class = "container__type"> ${pokemon.type}</p>

            `
        

        card.innerHTML = html

        

        container.appendChild(card)
    }

    

}

const searchPokemon = (pokemonInput,pokemons) => {
    console.log(pokemonInput)
    
    
    const filteredPokemon = pokemons.filter((poke) =>{
        const sameName = poke.name.includes(pokemonInput) 
        const sameId = poke.id ===Number(pokemonInput)

        return sameName || sameId
    })
    renderPokemons(filteredPokemon)
    
}   




const initApp = async () => {
    
   const everyPokemon = await getAllPokemons();
   
   for(const pokemon of everyPokemon.results) {
      const pokemonInfo = await getPokemon(pokemon.url);
      ALL_POKEMON.push(pokemonInfo);
  }

  

  renderPokemons(ALL_POKEMON)

  console.log(ALL_POKEMON)
  
  const input = document.querySelector("input")
  
  input.addEventListener("input", () => searchPokemon(input.value, ALL_POKEMON))
};

initApp();