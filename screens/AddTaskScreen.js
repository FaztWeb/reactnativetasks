import React, {useState, useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Textarea, Form, Item, Input, Label} from 'native-base';
import {Layout} from '../components/Layout';
import {TaskContext} from '../contexts/TaskContext';

const AddTaskScreen = (props) => {
  const [newTask, setNewTask] = useState({title: '', description: '', id: ''});
  const {addContextTask} = useContext(TaskContext);

  const saveTask = () => {
    addContextTask({...newTask, id: new Date().getMilliseconds().toString()});
    props.navigation.navigate('HomeScreen');
  };

  const handleChange = (name, value) => {
    setNewTask({...newTask, [name]: value});
  };

  return (
    <Layout
      title="Add Task"
      footer={
        <>
          <Button full onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text>Cancel</Text>
          </Button>
          <Button full onPress={saveTask}>
            <Text>Save Task</Text>
          </Button>
        </>
      }>
      <Form style={styles.container}>
        <Item>
          <Label>Title: </Label>
          <Input
            value={newTask.title}
            onChangeText={(value) => handleChange('title', value)}
            placeholder="Write a title"
          />
        </Item>
        <Textarea
          style={styles.container}
          value={newTask.description}
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

export default AddTaskScreen;