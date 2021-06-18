import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  name: string;
  checked: boolean;
}

interface TaskContextData {
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  myTasks: Task[];
  setMyTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  greeting: string;
  isMyTasks: boolean;
  handleAddNewTask: () => void;
  eraseAllTaks: () => void;
  saveToLocalStorage: () => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

export const TasksContext = createContext({} as TaskContextData);

export default function TasksProvider({ children }: TasksProviderProps) {
  const [newTask, setNewTask] = useState('');
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [greeting, setGreeting] = useState('');

  const [isMyTasks, setIsMyTasks] = useState(false);

  async function saveToLocalStorage() {
    try {
      await AsyncStorage.setItem('@todolist:tasks', JSON.stringify(myTasks));
      console.log('salvo!');
    } catch (error) {
      Alert.alert('Não foi possivel adicionar esta tarefa');
    }
  }

  async function handleAddNewTask() {
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
      await AsyncStorage.setItem(
        '@todolist:tasks',
        JSON.stringify([...myTasks, data]),
      );
      console.log(myTasks);
    } catch (error) {
      Alert.alert('Não foi possivel adicionar esta tarefa');
    }
  }

  async function eraseAllTaks() {
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
        console.log(tasksArray);

        setMyTasks(tasksArray);
        setIsMyTasks(true);
      }
    }

    loadStorage();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        newTask,
        setNewTask,
        myTasks,
        setMyTasks,
        greeting,
        isMyTasks,
        handleAddNewTask,
        eraseAllTaks,
        saveToLocalStorage,
      }}>
      {children}
    </TasksContext.Provider>
  );
}
