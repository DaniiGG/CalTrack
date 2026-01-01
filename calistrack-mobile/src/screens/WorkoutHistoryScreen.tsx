import { View, Text, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    api.get('/workouts').then(res => setWorkouts(res.data));
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        Historial
      </Text>

      <FlatList
        data={workouts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('WorkoutDetail', { workout: item })
            }
            style={{
              padding: 16,
              marginBottom: 12,
              backgroundColor: '#f2f2f2',
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {item.routine.name}
            </Text>
            <Text>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <Text>
              ⏱ {Math.floor(item.duration_seconds / 60)} min
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
