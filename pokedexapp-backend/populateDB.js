const mongoose = require('mongoose');
const axios = require('axios');

// Esquema de Pokémon con evolución previa
const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  types: [String],
  imageUrl: String,
  previousEvolution: {
    name: String,
    id: Number,
  },
});

// Modelo de Pokémon
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pokedexDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Función para obtener la evolución previa de un Pokémon
async function getPreviousEvolution(speciesUrl) {
  try {
    const response = await axios.get(speciesUrl);
    const speciesData = response.data;

    if (speciesData.evolves_from_species) {
      const prevSpeciesResponse = await axios.get(speciesData.evolves_from_species.url);
      const prevSpeciesData = prevSpeciesResponse.data;

      return {
        name: speciesData.evolves_from_species.name,
        id: prevSpeciesData.id,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching previous evolution:', error);
    return null;
  }
}

// Función para poblar la base de datos con datos de Pokémon
async function populateDB() {
  try {
    // Obtener una lista de Pokémon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
    const pokemons = response.data.results;

    for (const pokemon of pokemons) {
      // Obtener datos detallados de cada Pokémon
      const pokemonDetails = await axios.get(pokemon.url);
      const { id, name, types, sprites } = pokemonDetails.data;

      // Obtener la evolución previa
      const previousEvolution = await getPreviousEvolution(pokemonDetails.data.species.url);

      // Crear un objeto Pokémon con la evolución previa
      const newPokemon = new Pokemon({
        id,
        name,
        types: types.map(type => type.type.name),
        imageUrl: sprites.front_default,
        previousEvolution, // Agrega la evolución previa al objeto
      });

      // Guardar el Pokémon en la base de datos
      await newPokemon.save();
      console.log(`Pokemon ${name} added to the database.`);
    }

    console.log('All Pokemons have been added to the database.');
  } catch (error) {
    console.error('An error occurred while populating the database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Ejecutar la función
populateDB();
