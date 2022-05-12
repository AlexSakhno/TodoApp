import React from 'react'
import './TaskFilter.css'

export default class TaskFilter extends React.Component {
	buttons = [
		{ name: 'all', label: 'All' },
		{ name: 'active', label: 'Active' },
		{ name: 'completed', label: 'Completed' },
	]

	render() {
		const { filter, onChangeFilter } = this.props
		const buttons = this.buttons.map(({ name, label }) => {
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
}
