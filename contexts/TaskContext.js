import React, {createContext, Component} from 'react';

export const TaskContext = createContext();

export class TaskProvider extends Component {
  constructor(props) {
    super(props);
    this.getContextTasks = () => {
      return this.state.contextTasks;
    };
    this.addContextTask = (newTask) => {
      const {contextTasks} = this.state;
      contextTasks.push(newTask);
      this.setState({contextTasks});
    };
    this.updateContextTask = (task, id) => {
      const {contextTasks} = this.state;
      const taskIndex = contextTasks.findIndex((t) => t.id === id);
      contextTasks[taskIndex].title = task.title;
      contextTasks[taskIndex].description = task.description;
      this.setState({contextTasks});
    };
    this.deleteContextTask = (id) => {
      const {contextTasks: oldTasks} = this.state;
      const contextTasks = oldTasks.filter((t) => t.id === id);
      this.setState({contextTasks});
    };
    this.state = {
      contextTasks: [],
      getContextTasks: this.getContextTasks,
      addContextTask: this.addContextTask,
      updateContextTask: this.updateContextTask,
      deleteContextTask: this.deleteContextTask,
    };
  }
  render() {
    return (
      <TaskContext.Provider value={this.state}>
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

export default TaskContext;
