import React from 'react'
import './Task.css'

export default class Task extends React.Component {
	render() {
		const { done, label, onDeleted, onComleted } = this.props
		return (
			<div className='view'>
				<input
					type='checkbox'
					className='toggle'
					onClick={onComleted}
					defaultChecked={done ? 'checked' : ''}
				/>
				<label htmlFor=''>
					<span className='description'>{label}</span>
					<span className='created'>created 17 seconds ago</span>
				</label>
				<button className='icon icon-edit'></button>
				<button className='icon icon-destroy' onClick={onDeleted}></button>
			</div>
		)
	}
}
