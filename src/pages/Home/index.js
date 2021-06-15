import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, FlatList } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';
import TaskCard from '../../components/TaskCard';

function Home() {
  const [newTask, setNewTask] = useState('');
  const [myTasks, setMyTasks] = useState([]);
  const [greeting, setGreeting] = useState('');

  const [isMyTasks, setIsMyTasks] = useState(false);

  function handleAddNewSkill() {
    if (!newTask) {
      Alert.alert('Por favor, insira algum valor');
      return;
    }

    setMyTasks([...myTasks, newTask]);
    setNewTask('');

    setIsMyTasks(true);
  }

  function eraseAll() {
    setMyTasks([]);
    setIsMyTasks(false);
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

      <Button title="Adicionar" onPress={handleAddNewSkill} />

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
        keyExtractor={item => Math.random()}
        renderItem={({ item }) => <TaskCard skill={item} />}
      />

      <Button onPress={eraseAll} title="Apagar tudo!" bgColor="#d11b1b" />
    </View>
  );
}

export default Home;
