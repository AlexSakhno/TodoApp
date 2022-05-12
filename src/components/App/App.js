import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {
	return (
		<section className='todoapp'>
			<Header />
			<section className='main'>
				<TaskList />
				<Footer />
			</section>
		</section>
	)
}

export default App
