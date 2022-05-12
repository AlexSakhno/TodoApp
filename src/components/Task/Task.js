import React from 'react'
import { formatDistance } from 'date-fns'
import './Task.css'

export default class Task extends React.Component {
	render() {
		const { done, label, date, onDeleted, onCompleted } = this.props
		const currentDate = new Date()
		const createDate = date
		const agoTime = formatDistance(new Date(createDate), currentDate, {
			addSuffix: true,
		})
		return (
			<div className='view'>
				<input
					type='checkbox'
					className='toggle'
					onClick={onCompleted}
					defaultChecked={done ? 'checked' : ''}
				/>
				<label htmlFor=''>
					<span className='description'>{label}</span>
					<span className='created'>created {agoTime}</span>
				</label>
				<button className='icon icon-edit'></button>
				<button className='icon icon-destroy' onClick={onDeleted}></button>
			</div>
		)
	}
}
