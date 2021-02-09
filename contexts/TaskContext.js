import React, {createContext, useState, useEffect} from 'react';

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

export const TaskProvider = (props) => {
  const [contextTasks, setContextTasks] = useState([]);

  useEffect(() => {
    const StoreData = async () => {
      try {
        await AsyncStorage.setItem('@tasks', JSON.stringify([...contextTasks]));
      } catch (error) {
        errorHandler(error);
      }
    };
    StoreData();
  }, [contextTasks]);

  const updateContextTask = (task, id) => {
    const taskIndex = contextTasks.findIndex((t) => t.id === id);
    const tasks = [...contextTasks];
    tasks[taskIndex].title = task.title;
    tasks[taskIndex].description = task.description;
    setContextTasks(tasks);
  };
  const deleteContextTask = (id) => {
    const newContextTasks = contextTasks.filter((t) => t.id !== id);
    setContextTasks(newContextTasks);
  };

  // Retrieve all tasks from context
  const getContextTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks) {
        setContextTasks([...JSON.parse(storedTasks)]);
      }
      return contextTasks;
    } catch (error) {
      errorHandler(error);
    }
  };

  // add a new task to context
  const addContextTask = async (newTask) => {
    setContextTasks([...contextTasks, newTask]);
  };

  return (
    <TaskContext.Provider
      value={{
        contextTasks,
        getContextTasks,
        addContextTask,
        updateContextTask,
        deleteContextTask,
      }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
