import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

function FormRow(props) {
    console.log(props.rowData)

    //example with function
    function setName(event){
        //do something more if you want
        console.log(`Set name ${event.target.value} to element with id ${props.rowData.id}`)
        props.updateValueVer1(event.target.value, 'name', props.rowData.id)
    }


    return (

            <Row>
                <Col sm={2}>
                    {props.index == 0 &&
                        <Form.Label>{"Flow Name"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Flow Name"
                        onChange={setName} // Way1: call local function on change
                        type="text"
                        placeholder="Flow Name"
                        value={props.rowData.flowName}  // set value of field
                        disabled
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Quantity"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Quantity"
                        onChange={(event)=>props.updateValueVer2(event, 'quantity', props.rowData.id)} // Way2: directly call function which was send as a paremeter
                        type="text"
                        placeholder="quantity"
                        value={props.rowData.quantity}
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Value Min"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Value Min"
                        onChange={(event)=>props.updateValueVer2(event,'valueMin', props.rowData.id)}
                        type="text"
                        placeholder="Value Min"
                        value={props.rowData.valueMin}
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Value Tgt"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Value Tgt"
                        onChange={(event)=>props.updateValueVer2(event,'valueTgt', props.rowData.id)}
                        type="text"
                        placeholder="Value Tgt"
                        value={props.rowData.valueTgt}
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Value Max"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Value Max"
                        onChange={(event)=>props.updateValueVer2(event,'valueMax', props.rowData.id)}
                        type="text"
                        placeholder="Value Max"
                        value={props.rowData.valueMax}
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Dealocation"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Dealocation"
                        onChange={setName}
                        type="text"
                        placeholder="v"
                        value={props.rowData.valueDealo}
                        disabled
                    />
                </Col>
                <Col sm={1}>
                    {props.index == 0 &&
                        <Form.Label>{"Alocation"}</Form.Label>
                    }
                    <Form.Control 
                        name = "Alocation"
                        onChange={setName}
                        type="text"
                        placeholder="Alocation"
                        value={props.rowData.valueAlo}
                        disabled
                    />
                </Col>
            </Row>

    );
}

export default FormRow;