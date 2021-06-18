import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import Home from '../pages/Home';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator headerMode="none">
      <stackRoutes.Screen name="Welcome" component={Welcome} />

      <stackRoutes.Screen name="Home" component={Home} />
    </stackRoutes.Navigator>
  );
};

export default AppRoutes;
