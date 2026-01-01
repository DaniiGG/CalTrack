import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

type Phase = 'set' | 'rest';

export default function WorkoutFocusScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const routine = route.params?.routine;

  if (!routine) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Rutina no encontrada</Text>
      </View>
    );
  }

  const exercises = routine.exercises;

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<Phase>('set');
  const [timer, setTimer] = useState(0);
  const [finished, setFinished] = useState(false);

  const startTime = useRef(Date.now());
  const finishAnim = useRef(new Animated.Value(0)).current;

  const currentExercise = exercises[exerciseIndex];

  const totalSets = currentExercise.sets;
  const repsTarget = currentExercise.reps;
  const restRecommended = currentExercise.rest_seconds ?? 60;
  const exerciseName = currentExercise.exercise.name;

  // ⏱️ Timer universal (set y descanso)
  useEffect(() => {
    startTime.current = Date.now();
    setTimer(0);

    const interval = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, currentSet, exerciseIndex]);

  const completeSet = () => {
    if (currentSet < totalSets) {
      setPhase('rest');
    } else {
      // Último set del ejercicio
      if (exerciseIndex < exercises.length - 1) {
        setExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setPhase('set');
      } else {
        // 🏁 FIN DE RUTINA
        setFinished(true);

        Animated.timing(finishAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            navigation.replace('WorkoutSummary', {
              routine,
            });
          }, 900);
        });
      }
    }
  };

  const finishRest = () => {
    setCurrentSet(prev => prev + 1);
    setPhase('set');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 32, fontWeight: '700' }}>
        {exerciseName}
      </Text>

      <Text style={{ color: '#888', fontSize: 18, marginTop: 8 }}>
        Set {currentSet} / {totalSets}
      </Text>

      {phase === 'set' ? (
        <>
          <Text style={{ color: '#aaa', fontSize: 18, marginTop: 20 }}>
            Reps objetivo
          </Text>

          <Text style={{ color: '#fff', fontSize: 36 }}>
            {repsTarget}
          </Text>

          <Text
            style={{
              color: '#0f0',
              fontSize: 52,
              fontWeight: 'bold',
              marginVertical: 40,
            }}
          >
            {timer}s
          </Text>

          <TouchableOpacity
            onPress={completeSet}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#0a7',
              paddingVertical: 22,
              paddingHorizontal: 50,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: '#000', fontSize: 20, fontWeight: '700' }}>
              ✅ Set completado
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={{ color: '#f90', fontSize: 20, marginTop: 30 }}>
            Descanso
          </Text>

          <Text
            style={{
              color: '#f90',
              fontSize: 52,
              fontWeight: 'bold',
              marginVertical: 30,
            }}
          >
            {timer}s
          </Text>

          <Text style={{ color: '#666', marginBottom: 20 }}>
            Recomendado: {restRecommended}s
          </Text>

          <TouchableOpacity
            onPress={finishRest}
            activeOpacity={0.85}
            style={{
              backgroundColor: '#222',
              paddingVertical: 16,
              paddingHorizontal: 40,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>
              Continuar
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* 🎬 OVERLAY FIN DE RUTINA */}
      {finished && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: finishAnim,
            transform: [
              {
                scale: finishAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          }}
        >
          <Text
            style={{
              color: '#0a7',
              fontSize: 34,
              fontWeight: '800',
              marginBottom: 12,
            }}
          >
            💪 Entrenamiento completado
          </Text>

          <Text style={{ color: '#666', fontSize: 16 }}>
            Buen trabajo
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
