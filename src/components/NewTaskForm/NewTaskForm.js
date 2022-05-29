import React from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
	state = {
		label: '',
		min: '',
		sec: '',
	}

	onChangeLabel = e => {
		this.setState({
			label: e.target.value,
		})
	}

	onChangeMin = e => {
		this.setState({
			min: e.target.value,
		})
	}

	onChangeSec = e => {
		this.setState({
			sec: e.target.value,
		})
	}

	onSubmit = e => {
		e.preventDefault()

		let { label, min, sec } = this.state

		if (min === '') min = 1
		if (sec === '') min = 0
		const timeout = (min * 60 || 0) + (+sec || 0)
		this.props.onAddItem(label, timeout)

		this.setState({
			label: '',
			min: '',
			sec: '',
		})
	}

	render() {
		return (
			<form className='new-todo-form' onSubmit={this.onSubmit}>
				<input
					className='new-todo'
					placeholder='What needs to be done?'
					autoFocus
					onChange={this.onChangeLabel}
					value={this.state.label}
				></input>
				<input
					type='number'
					className='new-todo-form__timer'
					placeholder='Min'
					onChange={this.onChangeMin}
					value={this.state.min}
				></input>
				<input
					type='number'
					className='new-todo-form__timer'
					placeholder='Sec'
					onChange={this.onChangeSec}
					value={this.state.sec}
				></input>
				<input type='submit' className='submitTask'></input>
			</form>
		)
	}
}
