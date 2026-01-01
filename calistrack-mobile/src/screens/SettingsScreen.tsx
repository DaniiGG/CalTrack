import { View, Text, Pressable } from 'react-native';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  const logout = async () => {
    await api.post('/logout');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Ajustes
      </Text>

      <Pressable
        onPress={logout}
        style={{
          marginTop: 30,
          backgroundColor: '#c00',
          padding: 14,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  );
}
