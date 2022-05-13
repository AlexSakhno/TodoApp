import React from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onChangeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state.label);

    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChangeLabel}
          value={this.state.label}
        ></input>
      </form>
    );
  }
}
