import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function CreateRoutineScreen() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');

  const createRoutine = async () => {
    if (!name || !level) {
      Alert.alert('Error', 'Nombre y nivel son obligatorios');
      return;
    }

    try {
      await api.post('/routines', {
        name,
        description,
        level,
      });

      Alert.alert('Rutina creada');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error al crear rutina');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Nueva Rutina
      </Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: '#fff',
          padding: 14,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{
          backgroundColor: '#fff',
          padding: 14,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Nivel (beginner / intermediate / advanced)"
        value={level}
        onChangeText={setLevel}
        style={{
          backgroundColor: '#fff',
          padding: 14,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={createRoutine}
        style={{
          backgroundColor: '#111',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Guardar Rutina
        </Text>
      </Pressable>
    </View>
  );
}
