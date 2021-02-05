import React, {useEffect, useState, useContext} from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Button} from 'native-base';
import {Layout} from '../components/Layout';
import TaskContent from '../components/TaskContent';
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
    console.log('llamo');
  }, [getContextTasks, isFocused]);

  return (
    <Layout
      title="My Tasks"
      footer={
        <Button full onPress={() => props.navigation.navigate('AddTaskScreen')}>
          <Text>Add Task</Text>
        </Button>
      }>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={(task) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ModifyTaskScreen', {id: task.id})
            }>
            <TaskContent task={{...task}} />
          </TouchableOpacity>
        )}
      />
    </Layout>
  );
};

export default HomeScreen;
