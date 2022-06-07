import React from "react"
import './index.css';

const Form = ({inputText, setInputText, todos, setTodos, setStatus }) => { 
    function Inputhandlechange(event) {
       setInputText(event.target.value) 
    }

    function submitHandleChange(event) {
        event.preventDefault()
        setTodos([
            ...todos, 
            { text: inputText, completed: false, id: Math.floor(Math.random() * 3000)}
        ])

        setInputText("")
    }

    return(
        <form>
            <div className="input-text">
                <input className="text"
                    type="text"
                    placeholder="Add a task"
                    value={inputText}
                    onChange={Inputhandlechange}
                />

                <button className="add-button"
                    type="submit"
                    onClick={submitHandleChange}>Add</button>
            </div>
        </form>
    )
}

export default Form