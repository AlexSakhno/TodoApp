import React from 'react'
import './TaskFilter.css'

const TaskFilter = props => {
	const filterButton = [
		{ name: 'all', label: 'All' },
		{ name: 'active', label: 'Active' },
		{ name: 'completed', label: 'Completed' },
	]

	const { filter, onChangeFilter } = props
	const buttons = filterButton.map(({ name, label }) => {
		const isSelected = filter === name
		return (
			<li key={name}>
				<button
					className={isSelected ? 'selected' : ''}
					onClick={() => onChangeFilter(name)}
				>
					{label}
				</button>
			</li>
		)
	})
	return <ul className='filters'>{buttons}</ul>
}

export default TaskFilter
