import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'
import React from 'react'

export default class App extends React.Component {
	state = {
		todoData: JSON.parse(localStorage.getItem('state')) || [],
		filter: 'all',
	}

	completeItem = id => {
		this.setState(({ todoData }) => ({
			todoData: todoData.map(el =>
				el.id === id ? { ...el, done: !el.done } : el
			),
		}))
	}

	addItem = value => {
		if (!value) {
			alert('Укажите наименование задачи')
			return
		}
		const newId = this.state.todoData.length + 1

		const currentDate = new Date()

		const newItem = {
			id: newId,
			label: value,
			done: false,
			date: String(currentDate),
		}

		this.setState(({ todoData }) => {
			localStorage.setItem('state', JSON.stringify([...todoData, newItem]))
			return {
				todoData: [...todoData, newItem],
			}
		})
	}

	deleteItem = id => {
		localStorage.clear()
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(el => el.id !== id),
		}))
		localStorage.setItem(
			'state',
			JSON.stringify(this.state.todoData.filter(el => el.id !== id))
		)
	}

	deleteCompletedItem = () => {
		localStorage.clear()
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(el => !el.done),
		}))
		localStorage.setItem(
			'state',
			JSON.stringify(this.state.todoData.filter(el => !el.done))
		)
	}

	filter(items, filter) {
		switch (filter) {
			case 'all':
				return items
			case 'active':
				return items.filter(item => !item.done)
			case 'completed':
				return items.filter(item => item.done)
			default:
				return items
		}
	}

	onChangeFilter = filter => {
		this.setState({ filter })
	}

	render() {
		const { todoData, filter } = this.state
		const visibleItems = this.filter(todoData, filter)
		const countActiveTask = todoData.filter(el => !el.done).length
		return (
			<section className='todoapp'>
				<Header onAddItem={this.addItem} />
				<section className='main'>
					<TaskList
						todos={visibleItems}
						onDeleted={this.deleteItem}
						onCompleted={this.completeItem}
					/>
					<Footer
						countTodo={countActiveTask}
						onDeleteCompleted={this.deleteCompletedItem}
						filter={filter}
						onChangeFilter={this.onChangeFilter}
					/>
				</section>
			</section>
		)
	}
}
