import React , {useContext , createContext} from "react";

const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo:'message',
            completed: false,
        } 
    ],
    addTodo: (todo) => {} , // functionality is not defined here, defined in app.jsx
    updateTodo: (id, todo ) =>{},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider 