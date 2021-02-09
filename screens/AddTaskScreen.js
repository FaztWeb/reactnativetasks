import React, {useState, useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Textarea, Form, Item, Input, Label} from 'native-base';
import {Layout} from '../components/Layout';
import {TaskContext} from '../contexts/TaskContext';

const AddTaskScreen = (props) => {
  const [newTask, setNewTask] = useState({title: '', description: ''});
  const {addContextTask} = useContext(TaskContext);

  const saveTask = () => {
    addContextTask({...newTask, id: new Date().getMilliseconds().toString()});
    props.navigation.navigate('HomeScreen');
  };

  const handleChange = (name, value) => setNewTask({...newTask, [name]: value});

  return (
    <Layout
      title="Add Task"
      footer={
        <>
          <Button
            full
            onPress={() => props.navigation.navigate('HomeScreen')}
            style={styles.button}>
            <Text style={styles.text}>Cancel</Text>
          </Button>
          <Button full onPress={saveTask} style={styles.button}>
            <Text style={styles.text}>Save Task</Text>
          </Button>
        </>
      }>
      <Form style={styles.container}>
        <Item floatingLabel>
          <Label>Title</Label>
          <Input
            bordered
            onChangeText={(value) => handleChange('title', value)}
            value={newTask.title}
            placeholder="Write a title"
          />
        </Item>
        <Textarea
          rowSpan={3}
          value={newTask.description}
          onChangeText={(value) => handleChange('description', value)}
          bordered
          placeholder="Describe your task"
          style={styles.container}
        />
      </Form>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#5f27cd',
  },
});

export default AddTaskScreen;
