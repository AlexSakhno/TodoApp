import React from 'react'

export default class Timer extends React.Component {
	state = {
		active: false,
		timeLeft: null,
		timerId: null,
	}

	componentDidMount() {
		this.setState({ timeLeft: this.props.timer })
	}

	stepTimer = () => {
		const { timeLeft } = this.state
		if (!timeLeft) {
			this.stopTimer()
			return
		}
		this.setState(({ timeLeft }) => ({ timeLeft: timeLeft - 1 }))
	}

	playTimer = () => {
		let { active } = this.state
		if (!active) {
			let timerId = setInterval(this.stepTimer, 1000)
			this.setState({ active: true, timerId: timerId })
		}
	}

	stopTimer = () => {
		const { active, timerId } = this.state

		if (active) {
			clearInterval(timerId)
			this.setState({ active: false, timerId: null })
		}
	}

	formatTime = value => {
		return `0${value}`.slice(-2)
	}

	render() {
		const { timeLeft } = this.state
		const minutes = Math.trunc(timeLeft / 60)
		const seconds = timeLeft % 60

		return (
			<span className='description'>
				<button className='icon icon-play' onClick={this.playTimer}></button>
				<button className='icon icon-pause' onClick={this.stopTimer}></button>
				<span className='timer_time'>
					{this.formatTime(minutes)}:{this.formatTime(seconds)}
				</span>
			</span>
		)
	}
}
