import React, {useState} from 'react';
import {deleteIcon, editIcon, checkIcon, calendarIcon} from "../assets";

function Todo(props) {

    const [id, setId] = useState(props.id)
    const inputTitle = React.createRef();

    const deleteTodo = () => {
        localStorage.removeItem(id)
        props.setTodos(props.getAllLocalStorageItems());
    }

    const setEditableTodo = () => {
        inputTitle.current.disabled = false
        inputTitle.current.focus()
    }

    const checkTodo = () => {
        const newChecked = !props.data.checked
        localStorage.setItem(id, JSON.stringify({name: props.data.name, checked: newChecked, date: props.data.date}))
        props.setTodos(props.getAllLocalStorageItems());
    }

    const openDate = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = rect.right; // Position X par rapport au bouton
        const y = rect.bottom;  // Position Y par rapport au bouton
        if (props.openedCalendar && props.openedCalendar[0] === x && props.openedCalendar[1] === y){
            props.setOpenedCalendar(false)
            return
        }
        props.setOpenedCalendar([x,y,id])
    }

    const changeTitle = () => {
        localStorage.setItem(id, JSON.stringify({name: inputTitle.current.value, checked: props.data.checked, date: props.data.date}))
    }

    return (
        <tr className="border-b border-gray-600">
            <td scope="row" className={`px-6 py-4 font-medium whitespace-wrap ${props.data.checked ? "opacity-50" : ""} ${props.data.date === new Date().toISOString().split('T')[0] ? "text-red-600" : "text-white"}`}>
                <input type={"text"} onBlur={changeTitle} disabled={true} ref={inputTitle} defaultValue={props.data.name} className={`bg-transparent`}/>
            </td>
            <td className={`px-6 py-4 ${props.data.checked ? "opacity-50" : ""} ${props.data.date === new Date().toISOString().split('T')[0] ? "text-red-600" : "text-white"}`}>
                {props.data.date}
            </td>
            <td className={"px-6 py-4 flex justify-center space-x-6"}>
                <img src={checkIcon} onClick={checkTodo} alt="delete" className="w-6 h-6 cursor-pointer"/>
                <img src={calendarIcon} onClick={openDate} alt="delete" className="w-6 h-6 cursor-pointer"/>
                <img src={editIcon} onClick={setEditableTodo} alt="delete" className="w-6 h-6 cursor-pointer"/>
                <img src={deleteIcon} onClick={deleteTodo} alt="delete" className="w-6 h-6 cursor-pointer"/>
            </td>

        </tr>
    );
}

export default Todo;