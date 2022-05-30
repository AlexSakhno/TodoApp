import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'

import Timer from '../Timer/Timer'

import './Task.css'

const Task = props => {
	const [editState, setEdit] = useState(() => ({
		edit: false,
	}))

	const startEditing = () => {
		setEdit(() => ({ edit: true }))
	}

	const onEditing = evt => {
		const { editTask } = this.props
		if (evt.keyCode === 13) {
			editTask(evt.target.value)
			setEdit(() => ({ edit: false }))
		} else if (evt.keyCode === 27) {
			setEdit(() => ({ edit: false }))
		}
	}

	const { done, label, date, onDeleted, onToggle, timer } = props

	const { edit } = editState

	const currentDate = new Date()
	const createDate = date
	const agoTime = formatDistance(new Date(createDate), currentDate, {
		addSuffix: true,
	})

	return (
		<li className={done ? 'completed' : '' || edit ? 'editing' : ''}>
			<div className='view'>
				<input
					type='checkbox'
					className='toggle'
					onClick={onToggle}
					defaultChecked={done ? 'checked' : ''}
				/>
				<label htmlFor=''>
					<span className='title'>{label}</span>
					<Timer timer={timer} />
					<span className='description'>created {agoTime}</span>
				</label>
				<button className='icon icon-edit' onClick={startEditing}></button>
				<button className='icon icon-destroy' onClick={onDeleted}></button>
			</div>
			<input onKeyDown={onEditing} className='edit' defaultValue={label} />
		</li>
	)
}

export default Task
