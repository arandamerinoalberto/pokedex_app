import React from 'react';

function PokemonCard({ id, name, types, imageUrl, previousEvolution }) {
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedName = capitalizeFirstLetter(name);

  const formattedTypes = types.length === 2 ? [...types].reverse() : types;

  return (
    <div className="pokemon-card">
      <div className="pokemon-card-top">
        <img src={imageUrl} alt={`Imagen de ${formattedName}`} style={{ maxWidth: '100%', height: 'auto' }} />
        <div className="pokemon-card-id">
          <h2>ID / {id}</h2>
        </div>
      </div>
      <div className="pokemon-card-bottom">
        <h3>{formattedName}</h3>
        <div className="pokemon-types">
          {formattedTypes.map((type, index) => (
            <span key={index} className="pokemon-type">{type.toUpperCase()}</span>
          ))}
        </div>
        {previousEvolution && (
          <div className="pokemon-evolution-container">
            <div className="evolution-text">Evoluciona de:</div>
            <div className="evolution-name">{previousEvolution}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
