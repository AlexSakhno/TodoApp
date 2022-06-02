import React, { useState } from 'react'

import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

const App = () => {
	const [state, setState] = useState(() => ({
		todoData: [],
		filter: 'all',
	}))

	const onToggle = id => {
		const toggleItem = todoData.map(el =>
			el.id === id ? { ...el, done: !el.done } : el
		)
		setState(() => ({ ...state, todoData: toggleItem }))
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

		setState(() => ({ ...state, todoData: [...todoData, newItem] }))
	}

	const editItem = (id, label) => {
		const idx = todoData.findIndex(el => el.id === id)
		const newTodo = { ...todoData[idx], label }
		const newTodos = [...todoData]

		newTodos.splice(idx, 1, newTodo)

		setState(() => ({ ...state, todoData: newTodos }))
	}

	const deleteItem = id => {
		const deleteItem = todoData.filter(el => el.id !== id)

		setState(() => ({ ...state, todoData: deleteItem }))
	}

	const deleteCompletedItem = () => {
		const deleteItems = todoData.filter(el => !el.done)

		setState(() => ({ ...state, todoData: deleteItems }))
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
