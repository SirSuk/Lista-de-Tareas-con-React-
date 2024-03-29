import { useState } from "react"

export default function Todo({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  function FormEdit() {

    const [newValue, setNewValue] = useState(item.title)

    function handleSubmit(e) {
      e.preventDefault();

      // Get existing todos from local storage
      const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];

      // Find the index of the current todo in the array
      const index = existingTodos.findIndex(todo => todo.id === item.id);

      // Update the todo with the new value
      existingTodos[index] = {
        ...existingTodos[index],
        title: newValue
      };

      // Save the updated todos to local storage
      localStorage.setItem('todos', JSON.stringify(existingTodos));


    }
    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value)
    }
    function handleClick() {
      onUpdate(item.id, newValue)
      setIsEdit(false);
    }

    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input type="text" className="todoInput" onChange={handleChange} value={newValue} />
        <button className="button" onClick={handleClick}>Update</button>
      </form>
    )
  }

  function TodoElement() {
    return (

      <div className="todoInfo">
        <span className="todoTitle">{item.title}</span>

        <button className="button" onClick={() => setIsEdit(true)}>Editar</button>
        <button className="buttonDelete" onClick={() => onDelete(item.id)}>Borrar</button>
      </div>
    )
  }
  return (
    <div className="todo">
      {isEdit ? <FormEdit /> : <TodoElement />}
    </div>
  );
}
