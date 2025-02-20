import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getPokemonList, getPokemonDetails } from '../api/pokeApi';

// Define types for Pokemon data
interface Pokemon {
  name: string;
  image: string;
}

const PokemonList: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      const list = await getPokemonList();
      const detailedPokemon = await Promise.all(
        list.map(async (p: { name: string }) => {
          const details = await getPokemonDetails(p.name);
          return { name: p.name, image: details.sprites.front_default };
        })
      );
      setPokemon(detailedPokemon);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF0000" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PokemonList;
