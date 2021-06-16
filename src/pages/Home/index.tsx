import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import Button from '../../components/Button';
import TaskCard from '../../components/TaskCard';

interface Task {
  id: string;
  name: string;
  checked: boolean;
}

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [greeting, setGreeting] = useState('');

  const [isMyTasks, setIsMyTasks] = useState(false);

  async function handleAddNewSkill() {
    if (!newTask) {
      Alert.alert('Por favor, insira algum valor');
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newTask,
      checked: false,
    };

    setMyTasks(oldvalue => [...oldvalue, data]);
    setNewTask('');

    setIsMyTasks(true);

    try {
      const storageTasks = await AsyncStorage.getItem('@todolist:tasks');

      if (storageTasks) {
        await AsyncStorage.setItem(
          '@todolist:tasks',
          JSON.stringify([...myTasks, data]),
        );
      } else {
        await AsyncStorage.setItem('@todolist:tasks', JSON.stringify([data]));
      }
    } catch (error) {
      Alert.alert('Não foi possivel adicionar esta tarefa');
    }
  }

  async function eraseAll() {
    setMyTasks([]);
    setIsMyTasks(false);
    await AsyncStorage.setItem('@todolist:tasks', '');
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Bom dia!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde!');
    } else {
      setGreeting('Boa noite!');
    }

    async function loadStorage() {
      const storageTasks = await AsyncStorage.getItem('@todolist:tasks');

      if (storageTasks) {
        const tasksArray = JSON.parse(storageTasks);

        setMyTasks(tasksArray);
        setIsMyTasks(true);
      }
    }

    loadStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greeting} 😃</Text>

      <TextInput
        value={newTask}
        style={styles.input}
        placeholder="Nova tarefa"
        placeholderTextColor="#777"
        onChangeText={setNewTask}
      />

      <Button title="Adicionar" onPress={handleAddNewSkill} bgColor="#1474db" />

      <Text
        style={[
          styles.title,
          { fontSize: 20, marginTop: 40, marginBottom: 20 },
        ]}>
        Minhas tarefas:
      </Text>

      {!isMyTasks && (
        <Text style={{ color: '#555', textAlign: 'center' }}>
          Nenhuma tarefa adicionada
        </Text>
      )}

      <FlatList
        data={myTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard skill={item.name} />}
      />

      <Button onPress={eraseAll} title="Apagar tudo!" bgColor="#d11b1b" />
    </View>
  );
};

export default Home;
