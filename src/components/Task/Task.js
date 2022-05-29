import React from 'react'
import PropTypes from 'prop-types'
import { formatDistance, intervalToDuration, setMinutes } from 'date-fns'

import Timer from '../Timer/Timer'

import './Task.css'

export default class Task extends React.Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
		done: PropTypes.bool.isRequired,
		date: PropTypes.string.isRequired,
		onDeleted: PropTypes.func.isRequired,
		onCompleted: PropTypes.func.isRequired,
	}

	static defaultProps = {
		onDeleted() {},
		onCompleted() {},
		date: '(no data available)',
	}

	state = {
		edit: false,
	}

	startEditing = () => {
		this.setState({ edit: true })
	}

	onEditing = evt => {
		const { editTask } = this.props
		if (evt.keyCode === 13) {
			editTask(evt.target.value)
			this.setState({ edit: false })
		} else if (evt.keyCode === 27) {
			this.setState({ edit: false })
		}
	}

	render() {
		const { done, label, date, onDeleted, onToggle, timer } = this.props

		const { edit } = this.state

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
					<button
						className='icon icon-edit'
						onClick={this.startEditing}
					></button>
					<button className='icon icon-destroy' onClick={onDeleted}></button>
				</div>
				<input
					onKeyDown={this.onEditing}
					className='edit'
					defaultValue={label}
				/>
			</li>
		)
	}
}
