import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import Button from '../../components/Button';
import TaskCard from '../../components/TaskCard';
import { TasksContext } from '../../contexts/TasksContext';

const Home = () => {
  const {
    eraseAllTaks,
    greeting,
    newTask,
    setNewTask,
    handleAddNewTask,
    isMyTasks,
    myTasks,
  } = useContext(TasksContext);

  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadUserName() {
      const user = await AsyncStorage.getItem('@todolist:user');

      if (user) {
        setUserName(`${user}!`);
      }
    }

    loadUserName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {greeting}, {userName} 😃
      </Text>

      <TextInput
        value={newTask}
        style={styles.input}
        placeholder="Nova tarefa"
        placeholderTextColor="#777"
        onChangeText={setNewTask}
      />

      <Button title="Adicionar" onPress={handleAddNewTask} bgColor="#1474db" />

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
        renderItem={({ item }) => <TaskCard task={item} />}
      />

      <Button onPress={eraseAllTaks} title="Apagar tudo!" bgColor="#d11b1b" />
    </View>
  );
};

export default Home;
