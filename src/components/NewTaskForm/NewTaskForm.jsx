import React, { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = props => {
	const [newTask, setNewTask] = useState({
		label: '',
		min: '',
		sec: '',
	})

	const onChangeLabel = e => {
		setNewTask(() => ({ ...newTask, label: e.target.value }))
	}

	const onChangeMin = e => {
		setNewTask(() => ({ ...newTask, min: e.target.value }))
	}

	const onChangeSec = e => {
		setNewTask(() => ({ ...newTask, sec: e.target.value }))
	}

	const onSubmit = e => {
		e.preventDefault()

		let { label, min, sec } = newTask

		if (min === '') min = 1
		if (sec === '') min = 0
		const timeout = (min * 60 || 0) + (+sec || 0)
		props.onAddItem(label, timeout)

		setNewTask(() => ({
			...newTask,
			label: '',
			min: '',
			sec: '',
		}))
	}

	const inputForm = {
		taskLabel: [],
	}

	return (
		<form className='new-todo-form' onSubmit={onSubmit}>
			<input
				className='new-todo'
				placeholder='What needs to be done?'
				autoFocus
				onChange={onChangeLabel}
				value={newTask.label}
			></input>
			<input
				type='number'
				className='new-todo-form__timer'
				placeholder='Min'
				onChange={onChangeMin}
				value={newTask.min}
			></input>
			<input
				type='number'
				className='new-todo-form__timer'
				placeholder='Sec'
				onChange={onChangeSec}
				value={newTask.sec}
			></input>
			<input type='submit' className='submitTask'></input>
		</form>
	)
}

export default NewTaskForm
