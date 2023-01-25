import React from 'react';
import './style.css'
import {v4} from 'uuid'
import Button from 'react-bootstrap/Button';
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Row, Col } from 'react-bootstrap'

function LineContainer(props) {
    
    const [isMouseHover, setIsMouseHover] = React.useState(false)
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = React.useState(false)
    function deleteLine(){
        props.setRows(props.rows.filter(row => row.id !== props.content.props.id))
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

    React.useEffect(()=>{
        
        if (props.rows.length > 1){
            setIsDeleteButtonDisabled(false)
        }
        else{
            setIsDeleteButtonDisabled(true)
        }
        
    }, [props.rows])
    
    return (
        <Row className="line-container"  
            onMouseEnter={()=>{
                setIsMouseHover(true)
            }} 
            onMouseLeave={()=>{
                setIsMouseHover(false)
            }}
        >
            <Col sm={7}>
                {props.content}
            </Col>
            <Col>
                {isMouseHover && <AiFillPlusCircle onClick={addLine} size='40px' color='#43b05c'>Add</AiFillPlusCircle>}
                {isMouseHover && <AiFillMinusCircle onClick={isDeleteButtonDisabled ? '': deleteLine} size='40px' color={isDeleteButtonDisabled? '#fc948c':'#f44336'}>Delete</AiFillMinusCircle>}
            </Col>
        </Row>
    );
}

export default LineContainer;