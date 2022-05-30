import './TaskList.css'
import PropTypes from 'prop-types'
import Task from '../Task/Task'
import React from 'react'

const TaskList = props => {
	const { todos, onDeleted, onToggle, editTask } = props

	const tasks = todos.map(item => {
		const { id, ...itemProps } = item
		return (
			<Task
				key={id}
				{...itemProps}
				onDeleted={() => onDeleted(id)}
				onToggle={() => onToggle(id)}
				editTask={label => editTask(id, label)}
			/>
		)
	})

	return <ul className='todo-list'>{tasks}</ul>
}
export default TaskList

TaskList.propTypes = {
	todos: PropTypes.array.isRequired,
	onDeleted: PropTypes.func.isRequired,
	onCompleted: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
	onDeleted() {},
	onCompleted() {},
}
