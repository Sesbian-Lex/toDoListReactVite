import {useState, useEffect} from 'react'
import './toDo.css'
import { Link } from 'react-router-dom';

function ToDo(){

    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [doneTasks, setDoneTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(
        new Array(tasks.length).fill(false)
    );
    const [editText, setEditText] = useState("");

    useEffect(() => {
        setIsEditing(new Array(tasks.length).fill(false));
    }, [tasks]);

    useEffect(()=>{
        const current = JSON.parse(localStorage.getItem("tasks"));
        if (current !== null) {
            setTask(current);
        }
        document.title = "To-Do List";
    },[])

    useEffect(() => {
        console.log(doneTasks)
    }, [doneTasks])

    function handleInputChange(event){
        setNewTask(event.target.value)
    }
    function checkTask(index){
        const current = tasks[index];
        setDoneTasks(d => {
            const updated = [...d, { taskName: current, date: new Date().toISOString() }];
            localStorage.setItem("doneTasks", JSON.stringify(updated));
            return updated;
        });
    }
    function addTask(){
        if(newTask.trim() !== ""){
            const currentTask = [...tasks, newTask];
            setTask(currentTask);
            localStorage.setItem("tasks", JSON.stringify(currentTask))    
        }
        setNewTask("");
    }
    function delTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTask(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))  
        
    }
    function handleEditInputChange(event){
        setEditText(event.target.value)
    }
    function upTask(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index-1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index-1]];
            setTask(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks)) 
        }
    }
    function downTask(index){
        if(index < tasks.length-1){
                const updatedTasks = [...tasks];
                [updatedTasks[index+1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index+1]];
                setTask(updatedTasks);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks)) 
            }
    }
    function editTask(index){
        const updatedIsEditing = [...isEditing];
        updatedIsEditing[index] = true;
        setIsEditing(updatedIsEditing);
        setEditText(tasks[index]);
    }
    function handleEditSubmit(index){
        if(editText.trim() !== ""){
            const updatedTasks = [...tasks]; 
            updatedTasks[index] = editText;
            setTask(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks)) 
            setEditText("");
        }

        const updatedIsEditing = [...isEditing];
        updatedIsEditing[index] = false;
        setIsEditing(updatedIsEditing);
        
    }


    return(<div className='list-box'>

            <h1>To-Do List</h1>
            <div className='input-box'>
                <input  type="text" 
                        placeholder="Enter task..." 
                        value={newTask} 
                        onChange={handleInputChange}/>
                <button className='add-button'
                        onClick={addTask}>
                    Add Task
                </button>
                <Link to={"/completed"}>
                    <button className='page2-button'>
                        {/* Edit onClick later */}
                        Completed Tasks
                    </button>
                </Link>
            </div>

            <ol>
                {tasks.map((element, index) => 
                    <li key={index}>
                        {isEditing[index] ? <input  type='text' 
                                className='list-text'
                                value={editText} 
                                onChange={handleEditInputChange} 
                                id={'input'+index}
                                onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                        handleEditSubmit(index);
                                        }
                                    }}
                                // onBlur={() => handleEditSubmit(index)}
                                /> 
                                : 
                                <span className='list-text' id={'task'+index}>{element}</span>
                        }

                        <button className='check-button' id={'check'+index} onClick={()=>{checkTask(index);delTask(index);}} disabled={isEditing[index]}>✔</button>
                        <button className='del-button' id={'del'+index} onClick={()=>{delTask(index)}} disabled={isEditing[index]}>✖</button>
                        <button className='up-button' id={'up'+index} onClick={()=>{upTask(index)}} disabled={isEditing[index]}>↑</button>
                        <button className='down-button' id={'down'+index} onClick={()=>{downTask(index)}} disabled={isEditing[index]}>↓</button>
                        <button className='down-button' id={'edit'+index} onClick={()=>{editTask(index)}} disabled={isEditing[index]}>✎</button>

                    </li>
                )}
            </ol>
    </div>)
}

export default ToDo