import React from 'react';
import './style.css'
import {v4} from 'uuid'

function LineContainer(props) {
    
    const [isMouseHover, setIsMouseHover] = React.useState(false)
    function deleteLine(){
        props.setRows(prevRows => prevRows.filter(row => row.id !== props.content.props.id))
        console.log(props.rows)
      }

    function addLine(){
        let newRows = []
        for (let i = 0 ; i < props.rows.length ; i++){
            newRows.push(props.rows[i]);
            if(props.rows[i].id === props.content.props.id)
            {
                newRows.push({id:v4(), ...props.emptyRow})
            }
        }
        props.setRows(newRows)
    }
    
    return (
        <div className="line-container"  
            onMouseEnter={()=>{
                setIsMouseHover(true)
            }} 
            onMouseLeave={()=>{
                setIsMouseHover(false)
            }}
        >
            {props.content}
            {isMouseHover && <button onClick={addLine}>Add</button>}
            {isMouseHover && <button onClick={deleteLine}>Delete</button>}
            {props.index}
        </div>
    );
}

export default LineContainer;