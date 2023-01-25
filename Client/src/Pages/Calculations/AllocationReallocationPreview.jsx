import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './style.css'

function AllocationReallocationPreview(props) {

    return (
        <div>
            <Row className="pt-1">
                <Col sm={1} className='px-1'>
                    <h6>Demand</h6>
                    <div className={`component-value-field-preview ${props.data.demand === null && `error`}`}>
                         {props.data.demand !== null ? props.data.demand : "---ERROR---" } 
                    </div>
                </Col>
                <Col sm={1} className='px-1'>
                    <h6>Limes</h6>
                    <div className={`component-value-field-preview ${props.data.limes === null && `error`}`}>
                         {props.data.limes ? props.data.limes : "---ERROR---" } 
                    </div>
                </Col>
                <Col sm={2} className='px-1'>
                    <h6>Flow</h6>
                    <div className={`component-value-field-preview ${props.data.flow === null && `error`}`}>
                         {props.data.flow ? props.data.flow : "---ERROR---" } 
                    </div>
                </Col>
                <Col sm={4} className='px-1'>
                    <h6>Algorytm filtrowania</h6>
                    <div className={`component-value-field-preview ${props.data.filteringAlgorithmTitle === null && `error`}`}>
                         {props.data.filteringAlgorithmTitle ? props.data.filteringAlgorithmTitle : "---ERROR---" } 
                         {/* {props.data.filteringAlgorithmId}  */}
                    </div>
                </Col>
                <Col className='px-1'>
                    <h6>Algorytm alokacji</h6>
                    <div className={`component-value-field-preview ${props.data.allocationAlgorithmTitle === null && `error`}`}>
                         {props.data.allocationAlgorithmTitle ? props.data.allocationAlgorithmTitle : "---ERROR---" } 
                         {/* {props.data.allocationAlgorithmId}  */}
                    </div>
                </Col>
            </Row>
            {props.data.useSpecialOrder && 
                <Row id="example-collapse-text" className='pt-4'>
                    <Col sm={3}></Col>
                    <Col className='px-1'>
                        <h6>Specjalne zamowienie</h6>
                        <div className={`component-value-field-preview ${props.data.specialOrderTitle === null && `error`}`}>
                            {props.data.specialOrderTitle ? props.data.specialOrderTitle : "---ERROR---" } 
                            {/* {props.data.specialOrderId}  */}
                        </div>
                    </Col>
                    <Col sm={3} className='px-1'>
                        <h6>Special order demand</h6>
                        <div className={`component-value-field-preview ${props.data.specialOrderDemand === null && `error`}`}>
                            {props.data.specialOrderDemand !== null ? props.data.specialOrderDemand : "---ERROR---" } 
                        </div>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            }
        </div>
    );
}

export default AllocationReallocationPreview;