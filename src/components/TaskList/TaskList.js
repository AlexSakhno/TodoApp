import './TaskList.css'

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
