import { Tabs } from 'expo-router';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import RickandMortyList from '../../components/RickandMorty';
import CharacterDetails from '../../components/CharacterDetails';

export default function TabLayout() {
  const colorScheme = useColorScheme();


const Stack = createNativeStackNavigator();

  return (

      <Stack.Navigator>
        <Stack.Screen name="Home" component={RickandMortyList} />
        <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
      </Stack.Navigator>
  );
}
