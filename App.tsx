import React from 'react';
import { StatusBar } from 'react-native';
import Home from './src/pages/Home';

import TasksProvider from './src/contexts/TasksContext';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#121014" barStyle="light-content" />
      <TasksProvider>
        <Home />
      </TasksProvider>
    </>
  );
};

export default App;
