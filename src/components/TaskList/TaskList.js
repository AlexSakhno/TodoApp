import './TaskList.css'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

const TaskList = ({ todos, onDeleted, onCompleted }) => {
	const tasks = todos.map(item => {
		const { id, ...itemProps } = item
		return (
			<li key={id} className={item.done ? 'completed' : ''}>
				<Task
					{...itemProps}
					onDeleted={() => onDeleted(id)}
					onCompleted={() => onCompleted(id)}
				/>
			</li>
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
