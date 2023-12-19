const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión con MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pokedexDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema de Pokemon para MongoDB
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

// Creación del Modelo
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Endpoint para obtener todos los Pokémon
app.get('/pokemons', async (req, res) => {
  const pokemons = await Pokemon.find();
  res.json(pokemons);
});

// Endpoint para obtener un solo Pokémon por su ID
app.get('/pokemons/:id', async (req, res) => {
  const pokemon = await Pokemon.findOne({ id: req.params.id });
  res.json(pokemon);
});

// Endpoint para filtrar Pokémon por nombre
app.get('/pokemons/nombre/:nombre', async (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const pokemons = await Pokemon.find({ name: { $regex: new RegExp(nombre), $options: 'i' } });
  res.json(pokemons);
});

// Endpoint para filtrar Pokémon por evolución
app.get('/pokemons/evolucion/:evolucion', async (req, res) => {
  const evolucion = req.params.evolucion.toLowerCase();
  const pokemons = await Pokemon.find({ 'previousEvolution.name': { $regex: new RegExp(evolucion), $options: 'i' } });
  res.json(pokemons);
});

// Endpoint para filtrar Pokémon por tipo
app.get('/pokemons/tipo/:tipo', async (req, res) => {
  const tipo = req.params.tipo.toLowerCase();
  const pokemons = await Pokemon.find({ types: { $in: [tipo] } });
  res.json(pokemons);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutado en el puerto ${PORT}`);
});
