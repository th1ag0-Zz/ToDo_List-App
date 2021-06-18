import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const Welcome: React.FC = () => {
  const { navigate } = useNavigation();

  const [user, setUser] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!user);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setUser(value);
    setIsFilled(!!value);
  }

  async function handleSubmit() {
    if (!user) return Alert.alert('Me diz como chamar você, por favor 🥺');

    try {
      await AsyncStorage.setItem('@todolist:user', user);
      navigate('Home');
    } catch (error) {
      Alert.alert('Não foi possível salvar o seu nome 🥺');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Como podemos{'\n'}chamar vocẽ?</Text>
        <Text style={{ fontSize: 40 }}>{isFilled ? '😄' : '😁'}</Text>

        <TextInput
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder="Digite seu nome..."
          style={[
            styles.input,
            (isFocused || isFilled) && { borderBottomColor: '#1474db' },
          ]}
          onChangeText={handleInputChange}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Welcome;
