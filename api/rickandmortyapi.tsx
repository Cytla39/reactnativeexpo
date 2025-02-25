import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

// Obtener la lista de personajes
export const getCharacterList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/character`);
    return response.data.results || []; // Asegura que siempre se devuelva un array
  } catch (error) {
    console.error('Error fetching characters:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

// Obtener detalles de un personaje por su ID
export const getCharacterDetails = async (id: number) => {

  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data || null; // Devuelve `null` si no hay datos
  } catch (error) {
    console.error(`Error fetching details for character ID ${id}:`, error);
    return null; // Devuelve `null` en caso de error
  }
};
