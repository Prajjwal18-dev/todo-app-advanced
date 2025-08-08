import { useEffect, useState } from "react"
import {TodoProvider} from './context'
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"


function App() {

  const [todos,setTodos] = useState([])  // This state has all the todos

  const addTodo = (todo)=>{   // this todo comes from input not from state
    // setTodos(...todos,{id: Date.now() , ...todo})
    setTodos((prev) => [{id: Date.now(), ...todo} , ...prev])
  }

  const updateTodo = (id , todo) => {
    setTodos((prev) => prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((val) => { return val.id!==id } ))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((val) => val.id===id ? {...val, completed: !val.completed} : val))
  }

  // Local Storage
  useEffect(()=>{
    const oldTodos = JSON.parse(localStorage.getItem("todos"))

    if(oldTodos && todos.length>0){
      setTodos(oldTodos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  },[todos])


  return (
    <TodoProvider value={{addTodo,updateTodo,toggleComplete,todos,deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                       {todos.map((todo)=>(
                        <div key={todo.id} className="w-full"> 
                          <TodoItem/>
                         </div>
                       ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
