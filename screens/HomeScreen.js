import React, {useEffect, useContext} from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {Button} from 'native-base';
import {Layout} from '../components/Layout';
import TaskItem from '../components/TaskItem';
import {TaskContext} from '../contexts/TaskContext';

const HomeScreen = (props) => {
  const {getContextTasks, contextTasks} = useContext(TaskContext);

  useEffect(() => {
    const getData = async () => {
      await getContextTasks();
    };
    getData();
  }, []);

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
        data={contextTasks}
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
