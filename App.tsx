import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Home from './src/pages/Home';
import Routes from './src/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TasksProvider from './src/contexts/TasksContext';

import 'react-native-gesture-handler';

const App = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>();

  useEffect(() => {
    async function verifyStorage() {
      const storage = await AsyncStorage.getItem('@todolist:user');

      if (storage) {
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    }

    verifyStorage();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#121014" barStyle="light-content" />
      <TasksProvider>{isNewUser ? <Routes /> : <Home />}</TasksProvider>
    </>
  );
};

export default App;
