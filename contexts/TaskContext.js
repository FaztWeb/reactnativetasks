import React, {createContext, Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const TaskContext = createContext();

export const errorHandler = (e) => {
  Alert.alert(
    'Task Error',
    `The problem is ${e}`,
    [
      {
        text: 'ok',
      },
    ],
    {
      cancelable: true,
    },
  );
};

export class TaskProvider extends Component {
  constructor(props) {
    super(props);
    this.getContextTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        if (storedTasks) {
          this.setState({contextTasks: [...JSON.parse(storedTasks)]});
        }
        return this.state.contextTasks;
      } catch (error) {
        errorHandler(error);
      }
    };
    this.addContextTask = (newTask) => {
      const {contextTasks} = this.state;
      contextTasks.push(newTask);
      this.setState({contextTasks}, async () => await this.StoreData());
    };
    this.updateContextTask = (task, id) => {
      const {contextTasks} = this.state;
      const taskIndex = contextTasks.findIndex((t) => t.id === id);
      contextTasks[taskIndex].title = task.title;
      contextTasks[taskIndex].description = task.description;
      this.setState({contextTasks}, async () => await this.StoreData());
    };
    this.deleteContextTask = (id) => {
      const {contextTasks: oldTasks} = this.state;
      const contextTasks = oldTasks.filter((t) => t.id !== id);
      this.setState({contextTasks}, async () => await this.StoreData());
    };
    this.state = {
      contextTasks: [],
      getContextTasks: this.getContextTasks,
      addContextTask: this.addContextTask,
      updateContextTask: this.updateContextTask,
      deleteContextTask: this.deleteContextTask,
    };
  }

  StoreData = async () => {
    try {
      await AsyncStorage.setItem(
        '@tasks',
        JSON.stringify([...this.state.contextTasks]),
      );
    } catch (error) {
      errorHandler(error);
    }
  };

  render() {
    return (
      <TaskContext.Provider value={this.state}>
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

export default TaskContext;
