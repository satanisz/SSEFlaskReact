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
                    <Form.Control 
                        onChange={setName} // Way1: call local function on change
                        type="text"
                        placeholder="Title"
                        value={props.rowData.name}  // set value of field
                    />
                </Col>
                <Col sm={2}>
                    <Form.Control 
                        onChange={(event)=>props.updateValueVer2(event, 'valueAbc', props.rowData.id)} // Way2: directly call function which was send as a paremeter
                        type="text"
                        placeholder="Value abc"
                        value={props.rowData.valueAbc}
                    />
                </Col>
                <Col sm={2}>
                    <Form.Control 
                        onChange={(event)=>props.updateValueVer2(event,'valueCde', props.rowData.id)}
                        type="text"
                        placeholder="Value cde"
                        value={props.rowData.valueCde}
                    />
                </Col>
            </Row>

    );
}

export default FormRow;