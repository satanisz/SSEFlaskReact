import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './style.css'

function DeallocationPreview(props) {

    return (
        <Row className="py-1">
            <Col>
                <h6>Algorytm filtrowania</h6>
                <div className={`component-value-field-preview ${props.data.filteringAlgorithmId === null && `error`}`}>
                    {props.data.filteringAlgorithmTitle? props.data.filteringAlgorithmTitle : "---ERROR---" } 
                    {/* {props.data.filteringAlgorithmId}  */}

                </div>
            </Col>
            <Col>
                
                <h6>Algorytm alokacji</h6>
                <div className={`component-value-field-preview ${props.data.allocationAlgorithmId === null && `error`}`}>
                    {props.data.allocationAlgorithmTitle} 
                    {/* {props.data.allocationAlgorithmId}  */}
                </div>
            </Col>
        </Row>
    );
}

export default DeallocationPreview;
