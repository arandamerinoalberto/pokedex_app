import React from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';

function PokemonList({ pokemons }) {
  const navigate = useNavigate();

  const handleSelectPokemon = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  if (!pokemons.length) {
    return <div className="no-pokemon-message">No se encontraron Pokémon.</div>;
  }

  return (
    <div className="pokemon-container">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} onClick={() => handleSelectPokemon(pokemon.id)} className="pokemon-card-container">
          {console.log('Pokemon:', pokemon)} 
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            imageUrl={pokemon.imageUrl}
            previousEvolution={pokemon.previousEvolution} 
          />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
