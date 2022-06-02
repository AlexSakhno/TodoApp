import React, { useEffect, useState } from 'react'

const Timer = props => {
	const [active, setActive] = useState(false)
	const [timeLeft, setTimeLeft] = useState(null)
	const [timerId, setTimerId] = useState(null)

	const timer = props.timer

	useEffect(() => {
		setTimeLeft(timer)
	}, [timer])

	const stepTimer = () => {
		if (!timeLeft) {
			stopTimer()
			return
		}
		setTimeLeft(timeLeft => timeLeft - 1)
	}

	const playTimer = () => {
		if (!active) {
			setTimerId(setInterval(stepTimer, 1000))
			setActive(true)
		}
	}

	const stopTimer = () => {
		if (active) {
			clearInterval(timerId)
			setActive(false)
		}
	}

	const formatTime = value => {
		return `0${value}`.slice(-2)
	}

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
