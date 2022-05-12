import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'
import React from 'react'

export default class App extends React.Component {
	state = {
		todoData: [
			{ id: 1, label: 'Completed task', done: false },
			{ id: 2, label: 'Editing task', done: false },
			{ id: 3, label: 'Active task', done: false },
		],
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
		const newId = this.state.todoData.length + 1
		const newItem = {
			id: newId,
			label: value,
			done: false,
		}

		this.setState(({ todoData }) => {
			return {
				todoData: [...todoData, newItem],
			}
		})
	}

	deleteItem = id => {
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(el => el.id !== id),
		}))
	}

	deleteCompletedItem = () => {
		this.setState(({ todoData }) => ({
			todoData: todoData.filter(el => !el.done),
		}))
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
						onComleted={this.completeItem}
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
