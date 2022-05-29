import React, { useState, useEffect } from 'react'

import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {
	const [state, setState] = useState(() => ({
		todoData: [],
		filter: null,
	}))

	useEffect(() => {
		setState(() => ({
			todoData: JSON.parse(localStorage.getItem('state')),
			filter: 'all',
		}))
	}, [])

	const onToggle = id => {
		setState(({ todoData }) => ({
			todoData: todoData.map(el =>
				el.id === id ? { ...el, done: !el.done } : el
			),
		}))
	}

	const addItem = (value, timeout) => {
		if (!value) {
			alert('Укажите наименование задачи')
			return
		}
		const { todoData } = state

		const newId = todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1

		const currentDate = new Date()

		const newItem = {
			id: newId,
			label: value,
			done: false,
			date: String(currentDate),
			timer: timeout,
		}

		setState(({ todoData }) => {
			localStorage.setItem('state', JSON.stringify([...todoData, newItem]))
			return {
				todoData: [...todoData, newItem],
			}
		})
	}

	const editItem = (id, label) => {
		setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id)
			const newTodo = { ...todoData[idx], label }
			const newTodos = [...todoData]

			newTodos.splice(idx, 1, newTodo)

			localStorage.setItem('state', JSON.stringify(newTodos))
			return {
				todoData: newTodos,
			}
		})
	}

	const deleteItem = id => {
		localStorage.clear()
		setState(({ todoData }) => ({
			todoData: todoData.filter(el => el.id !== id),
		}))
		localStorage.setItem(
			'state',
			JSON.stringify(state.todoData.filter(el => el.id !== id))
		)
	}

	const deleteCompletedItem = () => {
		localStorage.clear()
		setState(({ todoData }) => ({
			todoData: todoData.filter(el => !el.done),
		}))
		localStorage.setItem(
			'state',
			JSON.stringify(state.todoData.filter(el => !el.done))
		)
	}

	function filters(items, filter) {
		switch (filter) {
			case 'active':
				return items.filter(item => !item.done)
			case 'completed':
				return items.filter(item => item.done)
			default:
				return items
		}
	}

	const onChangeFilter = filter => {
		setState({ ...state, filter })
	}

	const { todoData, filter } = state
	const visibleItems = filters(todoData, filter)

	const countActiveTask = todoData.filter(el => !el.done).length

	return (
		<section className='todoapp'>
			<Header onAddItem={addItem} />
			<section className='main'>
				<TaskList
					todos={visibleItems}
					onDeleted={deleteItem}
					onToggle={onToggle}
					editTask={editItem}
				/>
				<Footer
					countTodo={countActiveTask}
					onDeleteCompleted={deleteCompletedItem}
					filter={filter}
					onChangeFilter={onChangeFilter}
				/>
			</section>
		</section>
	)
}

export default App
