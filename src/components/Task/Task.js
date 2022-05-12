import './Task.css'

const Task = () => {
	return (
		<li className='comsplite'>
			<div className='view'>
				<input type='checkbox' className='toggle' />
				<label htmlFor=''>
					<span className='description'>Completed task</span>
					<span className='created'>created 17 seconds ago</span>
				</label>
				<button className='icon icon-edit'></button>
				<button className='icon icon-destroy'></button>
			</div>
		</li>
	)
}

export default Task
