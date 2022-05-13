import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import React from 'react';

export default class TaskList extends React.Component{ 
  render() {
  const { todos, onDeleted, onCompleted, editTask} = this.props;
  
  const tasks = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      
        <Task key={id} {...itemProps} onDeleted={() => onDeleted(id)} onCompleted={() => onCompleted(id)} editTask={(label)=> editTask(id, label)}/>
      
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
}
};


TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  onDeleted() {},
  onCompleted() {},
};
