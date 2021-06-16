import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor: string;
}

function Button({ title, bgColor, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      activeOpacity={0.8}
      {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
