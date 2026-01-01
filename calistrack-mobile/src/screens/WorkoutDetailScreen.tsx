import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function WorkoutDetailScreen() {
  const route = useRoute<any>();
  const { workout } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        {workout.routine.name}
      </Text>

      <FlatList
        data={workout.exercises}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {item.exercise.name}
            </Text>
            <Text>
              {item.sets} × {item.reps}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
