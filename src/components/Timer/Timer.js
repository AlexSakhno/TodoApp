import React, { useEffect, useState } from 'react'

const Timer = props => {
	const [timer, setTimer] = useState(() => ({
		active: false,
		timeLeft: null,
		timerId: null,
	}))

	useEffect(() => {
		setTimer(() => ({ timeLeft: props.timer }))
	}, [])

	const stepTimer = () => {
		const { timeLeft } = timer
		if (!timeLeft) {
			stopTimer()
			return
		}
		setTimer(({ timeLeft }) => ({ timeLeft: timeLeft - 1 }))
	}

	const playTimer = () => {
		let { active } = timer
		if (!active) {
			let timerId = setInterval(stepTimer, 1000)
			setTimer(() => ({ ...timer, active: true, timerId: timerId }))
		}
	}

	const stopTimer = () => {
		const { active, timerId } = timer

		if (active) {
			clearInterval(timerId)
			setTimer(() => ({ ...timer, active: false, timerId: null }))
		}
	}

	const formatTime = value => {
		return `0${value}`.slice(-2)
	}

	const { timeLeft } = timer
	const minutes = Math.trunc(timeLeft / 60)
	const seconds = timeLeft % 60

	return (
		<span className='description'>
			<button className='icon icon-play' onClick={playTimer}></button>
			<button className='icon icon-pause' onClick={stopTimer}></button>
			<span className='timer_time'>
				{formatTime(minutes)}:{formatTime(seconds)}
			</span>
		</span>
	)
}

export default Timer
