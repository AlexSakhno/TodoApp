import './Header.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'

const Header = ({ onAddItem }) => {
	return (
		<header className='header'>
			<h1>todos</h1>
			<NewTaskForm onAddItem={onAddItem} />
		</header>
	)
}

export default Header
