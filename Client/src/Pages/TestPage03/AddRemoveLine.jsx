import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

function AddRemoveLine(props) {

    console.log(props)


    return (
        <div>
            <Row>
                <Col>
                    {props.children}
                </Col>
                <Col sm={1}>
                    <Button onClick={()=>props.addElement(props.id)}>Add</Button>{' '}
                </Col>
                <Col sm={1}>
                    <Button>Remove</Button>
                </Col>
            </Row>
        </div>
    );
}

export default AddRemoveLine;