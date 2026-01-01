import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AddRoutineExerciseScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const routineId = route.params.routineId;

  const [exercises, setExercises] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [rest, setRest] = useState('60');

  useEffect(() => {
    api.get('/exercises').then(res => setExercises(res.data));
  }, []);

  const addExercise = async () => {
     if (!selected) return;
    await api.post(`/routines/${routineId}/exercises`, {
      exercise_id: selected.id,
      sets: Number(sets),
      reps: Number(reps),
      rest_seconds: Number(rest),
    });

    navigation.goBack();
  };

  if (selected) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {selected.name}
        </Text>

        <TextInput
          placeholder="Series"
          value={sets + ' Series'}
          onChangeText={setSets}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Reps"
          value={reps + ' Reps'}
          onChangeText={setReps}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Descanso (seg)"
          value={rest + ' Seg Descanso'}
          onChangeText={setRest}
          keyboardType="numeric"
        />

        <Pressable
  onPress={addExercise}
  disabled={!selected}
  style={{
    backgroundColor: selected ? '#111' : '#999',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  }}
>
  <Text style={{ color: '#fff' }}>Guardar</Text>
</Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={exercises}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => setSelected(item)}
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderColor: '#ddd',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.muscle_group}</Text>
        </Pressable>
      )}
    />
  );
}
