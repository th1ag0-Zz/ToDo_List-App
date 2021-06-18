import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';
import { TasksContext } from '../../contexts/TasksContext';

interface SkillCardProps {
  task: {
    id: string;
    name: string;
    checked: boolean;
  };
}

function TaskCard({ task }: SkillCardProps) {
  const { myTasks, setMyTasks, saveToLocalStorage } = useContext(TasksContext);

  const [isChecked, setIsChecked] = useState(task.checked);

  function handleChecked() {
    setIsChecked(oldstate => !oldstate);

    const [taskFilterd] = myTasks.filter(item => item.id === task.id);

    const taskModify = {
      id: taskFilterd.id,
      name: taskFilterd.name,
      checked: !isChecked,
    };

    const data = myTasks.map(item => {
      if (item.id === task.id) {
        return taskModify;
      }
      return item;
    });

    setMyTasks(data);
  }

  useEffect(() => {
    saveToLocalStorage();
    console.log(myTasks);
  }, [isChecked]);

  return (
    <View style={styles.taskContainer}>
      <Text style={styles.textTask}>{task.name}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleChecked}
        style={styles.checkBox}>
        <Text style={{ fontSize: 18 }}>{isChecked && '✔️'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TaskCard;
