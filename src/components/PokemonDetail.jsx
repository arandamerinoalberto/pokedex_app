import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PokemonDetail({ pokemons }) {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundPokemon = pokemons.find(p => p.id.toString() === pokemonId);
    setPokemon(foundPokemon);
  }, [pokemonId, pokemons]);

  const handleBackToList = () => {
    navigate('/');
  };

  const formattedTypes = pokemon && pokemon.types.length === 2 ? [...pokemon.types].reverse() : pokemon?.types;

  if (!pokemon) return <div>Cargando el listado de Pokemons...</div>;

  return (
    <div className="pokemon-detail-large">
      <div className="pokemon-detail-card-top">
        <img src={pokemon.imageUrl} alt={`Imagen de ${pokemon.name}`} />
        <div className="pokemon-detail-card-id">
          <h2>ID / {pokemon.id}</h2>
        </div>
      </div>
      <div className="pokemon-detail-card-bottom">
        <h3 className="pokemon-detail-large-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>
        <div className="pokemon-detail-large-types">
          {formattedTypes?.map((type, index) => (
            <span key={index} className="pokemon-detail-type">
              {type?.toUpperCase()}
            </span>
          ))}
        </div>
        {pokemon.previousEvolution && (
          <div className="pokemon-detail-evolution-container">
            <p className="detail-evolution-text">Evoluciona de:</p>
            <p className="detail-evolution-name">{pokemon.previousEvolution}</p>
          </div>
        )}
        <button onClick={handleBackToList} className='button-detail'>Volver al listado</button>
      </div>
    </div>
  );
}

export default PokemonDetail;
