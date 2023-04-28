import { useState, useEffect } from "react";
import Todo from "./todo";
import "./todoApp.css"

export default function TodoApp() {
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    function handleSubmit(e) {
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(),
            title: title,
            completed: false,
        }
        setTodos([...todos, newTodo])

        setTitle('')

    }

    function handleUpdate(id, value) {
        const temp = [...todos];
        const item = temp.find(item => item.id === id)
        item.title = value;
        setTodos(temp)
    }

    function handleChange(e) {
        const value = e.target.value

        setTitle(value)
    }

    function handleDelete(id) {
        const temp = todos.filter(item => item.id !== id)
        setTodos(temp)

    }

    return (
        <div className="todoContainer">

            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="todoInput" value={title} />
                <input
                    onClick={handleSubmit}
                    type='submit'
                    value='Create todo'
                    className="buttonCreate" />

            </form>

            <div className="todosContainer">
                {
                    todos.map(item => (
                        <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
                    ))
                }

            </div>
        </div>
    );

}
