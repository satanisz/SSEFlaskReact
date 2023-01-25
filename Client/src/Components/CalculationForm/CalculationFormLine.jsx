import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select'
import Deallocation from './Deallocation';
import AllocationReallocation from './AllocationReallocation'
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";


function CalculationFormLine(props) {
   
    const [lineContent, setLineContent] = React.useState(null)
    const [isMouseHover, setIsMouseHover] = React.useState(false)
    const [currentActionType, setCurrentActionType] = React.useState(null)

    const actionTypeOptions = [
        {"value":"deallocation", "label":"deallocation"},
        {"value":"allocation", "label":"allocation"},
        {"value":"reallocation", "label":"reallocation"},
    ]
    

    React.useEffect(()=>{
        setCurrentActionType(null)
        for(let i = 0 ; i < actionTypeOptions.length ; i++){
            if (actionTypeOptions[i].value === props.element.calculationType){
                setCurrentActionType(actionTypeOptions[i])
                return
            } 
        }
        setCurrentActionType(null)
    },[props.element.calculationType])


    React.useEffect(()=>{
        console.log(props.element)
        if(props.element.calculationType === "deallocation"){
            setLineContent(null)
            let content = <Deallocation
                            data={props.element.data}
                            id={props.element.id}
                            allocationAlgorithmOptions={props.allocationAlgorithmOptions}
                            filteringAlgorithmOptions={props.filteringAlgorithmOptions}
                            allocationAlgorithmOptionChange={props.allocationAlgorithmOptionChange}
                            filteringAlgorithmOptionChange={props.filteringAlgorithmOptionChange}
                        />

            setLineContent(content)
        }else if (props.element.calculationType === "allocation" || props.element.calculationType === "reallocation"){
            setLineContent(null)
            let content = <AllocationReallocation
                            index = {props.index}
                            data={props.element.data}
                            useSpecialOrder = {props.element.data.useSpecialOrder}
                            id={props.element.id}
                            allocationAlgorithmOptions={props.allocationAlgorithmOptions}
                            filteringAlgorithmOptions={props.filteringAlgorithmOptions}
                            specialOrderOptions={props.specialOrderOptions}
                            allocationAlgorithmOptionChange={props.allocationAlgorithmOptionChange}
                            filteringAlgorithmOptionChange={props.filteringAlgorithmOptionChange}
                            specialOrderOptionChange={props.specialOrderOptionChange}
                            limesOptionChange={props.limesOptionChange}
                            demandChange={props.demandChange}
                            specialOrderToggle={props.specialOrderToggle}
                            specialOrderDemandChange={props.specialOrderDemandChange}
                            flowOptionChange={props.flowOptionChange}
                            
                        />

            setLineContent(content)
        }else{
            let content = "Choose action type"
            setLineContent(content)
        }
    },[props])
    
    const [style, setStyle] = React.useState(null)
    React.useEffect(()=>{
        if(props.element.calculationType == 'deallocation'){
            setStyle('bg-deallocation')
        }else if(props.element.calculationType == 'allocation'){
            setStyle('bg-allocation')
        }
        else if(props.element.calculationType == 'reallocation'){
            setStyle('bg-reallocation')
        }
        else{
            setStyle(null)
        }
    }, [props.element.calculationType])

    
    // *************************************************************************************** //

    return (
        <>
            <style type="text/css">
                {`
                    .bg-deallocation{
                        background-color: #ffc1c1 ;
                    }
                    .bg-allocation{
                        background-color: #fff4c1 ;
                    }
                    .bg-reallocation{
                        background-color: #c3ffc1;
                    }
                `}
            </style>

            <Card 
                className='my-4 card  border border-dark border-3 my-3'
                onMouseEnter={()=>{
                    setIsMouseHover(true)
                }} 
                onMouseLeave={()=>{
                    setIsMouseHover(false)
                }}
            >
                <Card.Header className={style} style={{minHeight: '57px'}}>
                <Row className>
                    <Col sm={5} className='my-auto'><h6><i>Step {props.index + 1}</i></h6></Col>
                    {/* <Col sm={1} className='mt-auto'><h5>Action</h5></Col> */}
                    <Col sm={2}>
                        <Select 
                            options={actionTypeOptions} 
                            value={currentActionType}
                            label="Action"
                            onChange={(selectedOptions)=>props.actionTypeOptionChange(selectedOptions, props.element.id)}
                        />
                    </Col>
                    <Col>
                        {isMouseHover && 
                            <AiFillPlusCircle
                                onClick={()=>props.addElementBelow(props.element.id)}
                                size='40px'
                                color='#43b05c'
                            >
                                Add
                            </AiFillPlusCircle>}

                        {isMouseHover && 
                            <AiFillMinusCircle 
                                onClick={props.isDeleteButtonDisabled ? '': ()=>props.removeElement(props.element.id)}
                                size='40px'
                                color={props.isDeleteButtonDisabled ? '#fc948c':'#f44336'}
                            >
                                Delete
                            </AiFillMinusCircle>}
                    </Col>
                    <Col sm={3}></Col>
                </Row>
                </Card.Header>
                <Card.Body className='bg-light'>
                    {lineContent &&
                        lineContent
                    }
                </Card.Body>
            </Card>
        </>
    );
}

export default CalculationFormLine;