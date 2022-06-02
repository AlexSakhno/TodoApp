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

	const inputForm = [
		{
			classes: 'new-todo',
			type: 'text',
			placeholder: 'What needs to be done?',
			onchage: onChangeLabel,
			value: newTask.label,
		},
		{
			classes: 'new-todo-form__timer',
			type: 'number',
			placeholder: 'Min',
			onchage: onChangeMin,
			value: newTask.min,
		},
		{
			classes: 'new-todo-form__timer',
			type: 'number',
			placeholder: 'Sec',
			onchage: onChangeSec,
			value: newTask.sec,
		},
	]

	const inputs = inputForm.map(item => {
		const { classes, type, placeholder, onchage, value } = item

		return (
			<input
				key={placeholder}
				type={type}
				className={classes}
				placeholder={placeholder}
				onChange={onchage}
				value={value}
			></input>
		)
	})

	return (
		<form className='new-todo-form' onSubmit={onSubmit}>
			{inputs}
			<input type='submit' className='submitTask'></input>
		</form>
	)
}

export default NewTaskForm
