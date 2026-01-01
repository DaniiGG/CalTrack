import { View, Text, Pressable, Alert, FlatList, Image } from 'react-native';
import { api } from '../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function RoutineDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { routine: routineParam } = route.params;

  const [routine, setRoutine] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRoutine = async () => {
    try {
      const res = await api.get(`/routines/${routineParam.id}`);
      setRoutine(res.data);
      setLoading(false);
    } catch (e) {
      console.log('Error al cargar rutina', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRoutine();
    }, [])
  );

  const deleteRoutine = async () => {
    Alert.alert(
      'Eliminar rutina',
      '¿Seguro que quieres eliminar esta rutina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await api.delete(`/routines/${routineParam.id}`);
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando rutina...</Text>
      </View>
    );
  }

  if (!routine) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No se pudo cargar la rutina</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 12 }}>
        {routine.name}
      </Text>

      <Text style={{ fontSize: 16, color: '#666', marginBottom: 12 }}>
        {routine.description}
      </Text>

      <Text style={{ fontStyle: 'italic', marginBottom: 30 }}>
        Nivel: {routine.level}
      </Text>

      <FlatList
        style={{ flex: 1 }}
        data={routine.exercises || []}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          if (!item.exercise) return null;
          return (
            <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ddd' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.exercise.name}</Text>
              <Text>{item.sets} × {item.reps}</Text>
              <Text>Descanso: {item.rest_seconds}s</Text>
              {item.exercise.image_url && (
                <Image
                  source={{ uri: item.exercise.image_url }}
                  style={{ width: 100, height: 100, marginTop: 5 }}
                />
              )}
            </View>
          );
        }}
      />

      <Pressable
  onPress={() =>
    navigation.navigate('WorkoutFocus', { routine })
  }
  style={{
    backgroundColor: '#0a7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
    ▶️ Empezar entrenamiento
  </Text>
</Pressable>


      <Pressable
  onPress={() => navigation.navigate('Workout', { routine })}
  style={{
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
    ▶ Empezar entrenamiento
  </Text>
</Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('AddRoutineExercise', { routineId: routine.id })
        }
        style={{
          backgroundColor: '#0a7',
          padding: 14,
          borderRadius: 8,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          + Añadir ejercicio
        </Text>
      </Pressable>

      <Pressable
        onPress={deleteRoutine}
        style={{
          backgroundColor: '#c00',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Eliminar Rutina
        </Text>
      </Pressable>
    </View>
  );
}
