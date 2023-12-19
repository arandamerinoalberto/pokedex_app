import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import SearchBar from './components/SearchBar';
import PokemonDetail from './components/PokemonDetail';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPreviousEvolution = async (evolutionChainUrl, pokemonName) => {
      try {
        const response = await fetch(evolutionChainUrl);
        const data = await response.json();
        return extractPreviousEvolution(data.chain, pokemonName);
      } catch (error) {
        console.error('Error fetching previous evolution:', error);
        return null;
      }
    };

    const extractPreviousEvolution = (chain, pokemonName) => {
      let currentStage = chain;
      let previousStage = null;

      while (currentStage && currentStage.species) {
        if (currentStage.species.name === pokemonName) {
          return previousStage ? previousStage.species.name : null;
        }
        previousStage = currentStage;
        currentStage = currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0] : null;
      }

      return null;
    };

    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const pokemonPromises = data.results.map(async item => {
          const pokemonResponse = await fetch(item.url);
          const pokemon = await pokemonResponse.json();

          // Obtener la URL de la especie
          const speciesResponse = await fetch(pokemon.species.url);
          const speciesData = await speciesResponse.json();
          const evolutionChainUrl = speciesData.evolution_chain.url;
          const previousEvolution = await fetchPreviousEvolution(evolutionChainUrl, pokemon.name);

          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(type => type.type.name),
            imageUrl: pokemon.sprites.front_default,
            previousEvolution: previousEvolution
          };
        });

        const results = await Promise.all(pokemonPromises);
        setPokemons(results);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue.toUpperCase());
  };

  return (
    <Router>
      <div className="app">
        <SearchBar onSearch={handleSearchChange} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/listadoPokemons" />} />
          <Route path="/listadoPokemons" element={<PokemonList pokemons={pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(searchTerm))} />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetail pokemons={pokemons} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
