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
			todoData: [],
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

			return {
				todoData: newTodos,
			}
		})
	}

	const deleteItem = id => {
		setState(({ todoData }) => ({
			todoData: todoData.filter(el => el.id !== id),
		}))
	}

	const deleteCompletedItem = () => {
		setState(({ todoData }) => ({
			todoData: todoData.filter(el => !el.done),
		}))
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
		setState({ ...state, filter: filter })
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
