import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { api } from '../services/api';
import { saveToken } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const { setAuthenticated } = useAuth();

  const login = async () => {
    try {
      const response = await api.post('/login', { email, password });
      await saveToken(response.data.token);
      setAuthenticated(true);
      console.log(response.data);
    } catch (error: any) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#111' }}>
        CalisTrack 💪
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 14,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#ddd',
          color: '#111',
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 14,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ddd',
          color: '#111',
        }}
      />

      <Pressable
        onPress={login}
        style={{
          backgroundColor: '#111',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          Entrar
        </Text>
      </Pressable>
    </View>
  );
}
