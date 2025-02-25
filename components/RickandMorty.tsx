import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { getCharacterList, getCharacterDetails } from '../api/rickandmortyapi';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Define el tipo para los personajes
interface Personaje {
  id: number;
  name: string;
  image: string;
}

const RickandMortyList: React.FC = () => {
  const navigation = useNavigation();
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const list = await getCharacterList(); // Obtiene la lista de personajes
        const detailedPersonajes = await Promise.all(
          list.map(async (p: { id: number; name: string }) => {
            const details = await getCharacterDetails(p.id);
            return { id: p.id, name: p.name, image: details.image, gender: details.gender };
          })
        );
        setPersonajes(detailedPersonajes);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={personajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('CharacterDetails', { character: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RickandMortyList;
