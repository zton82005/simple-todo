"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Home() {
	const [newItem, setNewItem] = useState("");
	const [todos, setTodos] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editItemId, setEditItemId] = useState(null);

	const inputRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newItem.trim() === "") {
			alert("Please enter a task before adding or editing.");
			return;
		}

		if (isEditing) {
			// If editing, update the existing todo item
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === editItemId ? { ...todo, title: newItem } : todo
				)
			);
			setIsEditing(false);
			setEditItemId(null);
		} else {
			// If not editing, add a new todo item
			setTodos((prevTodos) => [
				...prevTodos,
				{ id: crypto.randomUUID(), title: newItem, completed: false }, // Initialize completed as false for new items
			]);
		}

		setNewItem(""); // Clear the input field after adding or editing
	};

	const handleEdit = (id, title) => {
		setIsEditing(true);
		setEditItemId(id);
		setNewItem(title);
	};

	const handleDelete = (id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	const handleCheckboxChange = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	useEffect(() => {
		// Load todos from local storage when the component mounts
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	useEffect(() => {
		// Save todos to local storage whenever the todos state changes
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		if (isEditing) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	return (
		<div className="flex flex-col items-center p-6 md:p-24 gap-10">
			<h1 className="text-2xl">Today's Tasks</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full md:w-1/3 flex flex-col sm:flex-row"
			>
				<label htmlFor="item"></label>
				<input
					ref={inputRef}
					className="p-2 rounded-lg sm:rounded-tl-lg sm:rounded-bl-lg text-gray-500 flex-1 border border-gray-400"
					type="text"
					placeholder="Enter a task"
					value={newItem}
					onChange={(e) => setNewItem(e.target.value)}
					id="item"
				/>
				<button
					className="py-2 px-3 rounded-lg sm:rounded-tr-lg sm:rounded-br-lg bg-yellow-400 text-black mt-2 sm:mt-0 sm:ml-1"
					type="submit"
				>
					Add
				</button>
			</form>
			<h2 className="text-xl">To Do's:</h2>
			<div className="w-full md:w-1/3">
				<ul className="border border-gray-400 rounded-lg divide-y divide-gray-400">
					{todos.map((todo) => {
						const isBeingEdited = isEditing && todo.id === editItemId;

						return (
							<li key={todo.id} className="flex items-center p-3">
								<label className="flex items-center space-x-3 flex-1">
									<input
										className="text-white"
										type="checkbox"
										checked={todo.completed}
										onChange={() => handleCheckboxChange(todo.id)}
									/>
									<span
										className={`flex-1 ${
											todo.completed ? "line-through text-gray-600" : ""
										}`}
									>
										{todo.title}
									</span>
								</label>

								<button
									className="p-3 rounded-lg border border-yellow-400 items-center"
									onClick={() => handleEdit(todo.id, todo.title)}
									disabled={isBeingEdited}
								>
									<Image src="/edit.png" alt="edit" width={12} height={12} />
								</button>
								<button
									className="p-3 rounded-lg border border-yellow-400 items-center ml-1"
									onClick={() => handleDelete(todo.id)}
									disabled={isBeingEdited}
								>
									<Image src="/trash.png" alt="delete" width={12} height={12} />
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
