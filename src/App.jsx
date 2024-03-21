import React, {useEffect, useRef, useState} from 'react'
import './App.css'
import Todo from "./component/todo.jsx";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';



const getAllLocalStorageItems = () => {
    const items = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        items.push({ key, value })
    }
    return items
}

function App() {

    const [todos, setTodos] = useState(getAllLocalStorageItems())
    const inputs = useRef([])
    const [openedCalendar, setOpenedCalendar] = useState(false)
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        changeDate()
    }, [date]);

    const addInput = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el)
        }
    }

    const addTodo = () => {
        if(inputs.current[0].value === '') return
        localStorage.setItem(Math.random().toString(36).substring(7), JSON.stringify({name: inputs.current[0].value, checked: false, date: new Date().toISOString().split('T')[0]}))
        setTodos(getAllLocalStorageItems())
        inputs.current[0].value = ''
    }

    const changeDate = (e) => {
        if(openedCalendar){
            const id = openedCalendar[2]
            const newDate = date.toISOString().split('T')[0]
            localStorage.setItem(id, JSON.stringify({name: JSON.parse(localStorage.getItem(id)).name, checked: JSON.parse(localStorage.getItem(id)).checked, date: newDate}))
            setTodos(getAllLocalStorageItems())
            setOpenedCalendar(false)
        }
    }

  return (
      <>
          <h1 className="text-3xl mb-8">My Todo List</h1>
          <input type="text" ref={addInput} className="border-2 border-white-500 text-white-500 bg-transparent font-bold py-2 px-4 mb-4 rounded w-full"/>
          <button
              onClick={addTodo}
              className="border-2 border-white-500 hover:bg-white text-white-500 hover:text-black font-bold py-2 px-4 mb-8 rounded w-full">
              Nouvelle tâche
          </button>
          <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs uppercase border-b border-gray-600">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Tâche
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                          Actions
                      </th>
                  </tr>
                  </thead>
                  <tbody>
                  {todos.map((todo) => (
                      <Todo key={todo.key} data={JSON.parse(todo.value)} id={todo.key} setTodos={setTodos} getAllLocalStorageItems={getAllLocalStorageItems} openedCalendar={openedCalendar} setOpenedCalendar={setOpenedCalendar}/>
                  ))}
                  </tbody>
              </table>
          </div>

            {openedCalendar && <Calendar value={date} onChange={setDate} className={`absolute top-[${openedCalendar[1]}px] left-[${openedCalendar[0]}px]`}/>}
      </>
  )
}

export default App
