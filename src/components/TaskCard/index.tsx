import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

interface SkillCardProps {
  skill: string;
}

function TaskCard({ skill }: SkillCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.textTask}>{skill}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleCheck}
        style={styles.checkBox}>
        <Text style={{ fontSize: 18 }}>{isChecked && '✔️'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TaskCard;
