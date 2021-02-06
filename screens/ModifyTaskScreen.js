import React, {useState, useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Textarea, Form, Item, Input, Label} from 'native-base';
import {Layout} from '../components/Layout';
import {TaskContext} from '../contexts/TaskContext';
import {useEffect} from 'react/cjs/react.development';

const ModifyTaskScreen = (props) => {
  const [task, setTask] = useState({title: '', description: '', id: ''});
  const {contextTasks, updateContextTask, deleteContextTask} = useContext(
    TaskContext,
  );

  useEffect(() => {
    const taskIndex = contextTasks.findIndex(
      (t) => t.id === props.route.params.id,
    );

    if (taskIndex > -1) {
      setTask((t) => ({
        ...t,
        title: contextTasks[taskIndex].title,
        description: contextTasks[taskIndex].description,
      }));
    }
  }, [contextTasks, props.route.params.id]);

  const updateTask = () => {
    updateContextTask(task, props.route.params.id);
    props.navigation.navigate('HomeScreen');
  };

  const deleteTask = () => {
    deleteContextTask(props.route.params.id);
    props.navigation.navigate('HomeScreen');
  };

  const handleChange = (name, value) => {
    setTask({...task, [name]: value});
  };

  return (
    <Layout
      title="Modify Task"
      footer={
        <>
          <Button full onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text>Cancel</Text>
          </Button>
          <Button full onPress={updateTask}>
            <Text>Update Task</Text>
          </Button>
          <Button full onPress={deleteTask}>
            <Text>Delete Task</Text>
          </Button>
        </>
      }>
      <Form style={styles.container}>
        <Item>
          <Label>Title: </Label>
          <Input
            value={task.title}
            onChangeText={(value) => handleChange('title', value)}
          />
        </Item>
        <Textarea
          style={styles.container}
          value={task.description}
          onChangeText={(value) => handleChange('description', value)}
          bordered
          placeholder="Describe your task"
        />
      </Form>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ModifyTaskScreen;
