import {useState, useEffect, useRef} from 'react'
import './toDo.css'
import { Link } from 'react-router-dom';

function CompletedTask(){

    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(()=>{
        const current = JSON.parse(localStorage.getItem("doneTasks"));
        if (current !== null) {
            setDoneTasks(current);
        }
        document.title = "Completed List";
    },[])

    useEffect(() => {
        console.log(doneTasks)
    }, [doneTasks])

    function returnTask(index){
        const current = doneTasks[index];
        const currentTasks = JSON.parse(localStorage.getItem("tasks"));
        localStorage.setItem("tasks", JSON.stringify([...currentTasks, current.taskName]));
    }

    function delTask(index){
        const updatedTasks = (doneTasks.filter((_, i) => i !== index));
        setDoneTasks(updatedTasks);
        localStorage.setItem("doneTasks", JSON.stringify(updatedTasks))

    }
    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleDateString('en-US', options);
    }


    return(<div className='list-box'>

            <h1>Completed Tasks</h1>

            <ol>
                {doneTasks.map((element, index) => 
                    <li key={index}>  
                        <span className='list-text' id={'task'+index}>{element.taskName}</span>
                        <span className='date-text' id={'task'+index}>{formatDate(element.date)}</span>
                        <button className='del-button' id={'return'+index} onClick={()=>{returnTask(index);delTask(index);}}>↩</button>
                        <button className='del-button' id={'del2'+index} onClick={()=>{delTask(index)}}>✖</button>

                    </li>
                )}
            </ol>

            <Link to={"/"}>
                <button className='page2-button'>
                    Unfinished Tasks
                </button>
            </Link>

    </div>)
}

export default CompletedTask