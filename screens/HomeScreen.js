import React, {useEffect, useState, useContext} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Button} from 'native-base';
import {Layout} from '../components/Layout';
import TaskItem from '../components/TaskItem';
import {TaskContext} from '../contexts/TaskContext';

const HomeScreen = (props) => {
  const {getContextTasks} = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      if (isFocused) {
        const contextTasks = await getContextTasks();
        setTasks(contextTasks);
      }
    };
    getData();
  }, [getContextTasks, isFocused]);

  return (
    <Layout
      title="My Tasks"
      footer={
        <Button
          style={styles.button}
          full
          onPress={() => props.navigation.navigate('AddTaskScreen')}>
          <Text style={styles.text}>Add Task</Text>
        </Button>
      }>
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={(task) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ModifyTaskScreen', {id: task.item.id})
            }>
            <TaskItem task={{...task.item}} />
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 5,
  },
  text: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#5f27cd',
  },
});

export default HomeScreen;
