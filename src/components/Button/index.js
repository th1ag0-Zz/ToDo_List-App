import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

function Button({ onPress, title, bgColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, bgColor && { backgroundColor: bgColor }]}
      activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
