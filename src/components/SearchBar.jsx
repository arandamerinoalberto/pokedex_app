import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    console.log("Valor actual del input:", event.target.value);
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-text"
        type="text" 
        placeholder="Filtra pokemons por nombre..."
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};


export default SearchBar;
