import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { api } from '../services/api';

export default function WorkoutScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const routine = route.params?.routine;

  type WorkoutSet = {
  set_number: number;
  reps: number;
  completed: boolean;
};

type WorkoutExercise = {
  exercise_id: number;
  name: string;
  sets: WorkoutSet[];
};

  if (!routine) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Rutina no encontrada</Text>
      </View>
    );
  }

  const [startTime] = useState(Date.now());
  const [saving, setSaving] = useState(false);

  const [exercises, setExercises] = useState<WorkoutExercise[]>(
    routine.exercises.map((e: any) => ({
      exercise_id: e.exercise.id,
      name: e.exercise.name,
      sets: Array.from({ length: e.sets }).map((_, i) => ({
        set_number: i + 1,
        reps: e.reps,
        completed: false,
      })),
    }))
  );

  const updateReps = (
    exIndex: number,
    setIndex: number,
    reps: string
  ) => {
    const copy = [...exercises];
    copy[exIndex].sets[setIndex].reps = Number(reps);
    setExercises(copy);
  };

  const toggleSet = (exIndex: number, setIndex: number) => {
    const copy = [...exercises];
    copy[exIndex].sets[setIndex].completed =
      !copy[exIndex].sets[setIndex].completed;
    setExercises(copy);
  };

  const finishWorkout = async () => {
    setSaving(true);
    const duration = Math.floor((Date.now() - startTime) / 1000);

    try {
      await api.post('/workouts', {
        routine_id: routine.id,
        duration_seconds: duration,
        exercises,
      });

      Alert.alert('Entrenamiento guardado 💪');
      navigation.goBack();
    } catch (e) {
      console.log(e);
      Alert.alert('Error al guardar el entrenamiento');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        {routine.name}
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 16,
              marginBottom: 20,
              borderRadius: 12,
              backgroundColor: '#f2f2f2',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {item.name}
            </Text>

            {item.sets.map((set, setIndex) => (
              <View
                key={setIndex}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={{ width: 70 }}>
                  Serie {set.set_number}
                </Text>

                <TextInput
                  keyboardType="numeric"
                  value={String(set.reps)}
                  onChangeText={text =>
                    updateReps(index, setIndex, text)
                  }
                  style={{
                    backgroundColor: '#fff',
                    padding: 8,
                    borderRadius: 6,
                    width: 60,
                    textAlign: 'center',
                  }}
                />

                <Pressable
                  onPress={() => toggleSet(index, setIndex)}
                  style={{
                    marginLeft: 12,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    backgroundColor: set.completed
                      ? '#0a7'
                      : '#ccc',
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    {set.completed ? '✓' : 'OK'}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      />

      <Pressable
        disabled={saving}
        onPress={finishWorkout}
        style={{
          backgroundColor: '#0a7',
          padding: 18,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          {saving ? 'Guardando...' : 'Finalizar entrenamiento'}
        </Text>
      </Pressable>
    </View>
  );
}
