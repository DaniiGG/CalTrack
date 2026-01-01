import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { removeToken } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import { logout as apiLogout } from '../services/auth';
import { useAuth } from '../context/AuthContext';

type Routine = {
  id: number;
  name: string;
  description?: string;
  level: string;
};

export default function HomeScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
const { logout: setLogout } = useAuth();

  const loadRoutines = async () => {
    try {
      const res = await api.get('/routines');
      setRoutines(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
  await apiLogout();     // backend + storage
  setLogout();           // estado global
};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadRoutines);
    return unsubscribe;
  }, []);


  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 16 }}>
      <Pressable
        onPress={() => navigation.navigate('CreateRoutine')}
        style={{
          backgroundColor: '#0a7',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          + Nueva Rutina
        </Text>
      </Pressable>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>
        Mis Rutinas 💪
      </Text>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('RoutineDetail', { routine: item })}
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: '#666' }}>{item.description}</Text>
            <Text style={{ marginTop: 8, fontStyle: 'italic' }}>
              Nivel: {item.level}
            </Text>
          </Pressable>
        )}
      />

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: '#111',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <Text style={{ color: '#fff' }}>Logout</Text>
      </Pressable>
    </View>
  );
}
