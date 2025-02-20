import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=20`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return [];
  }
};

export const getPokemonDetails = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    return null;
  }
};
