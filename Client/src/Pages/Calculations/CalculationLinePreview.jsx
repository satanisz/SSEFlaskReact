import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AllocationReallocationPreview from './AllocationReallocationPreview';
import DeallocationPreview from './DeallocationPreview';
import './style.css'

function CalculationLinePreview(props) {

    const [preview, setPreview] = React.useState(null)
    const [style, setStyle] = React.useState(null)

    
    React.useEffect(()=>{
        if (props.calculationType === 'deallocation'){
            setPreview(
                <DeallocationPreview
                    data={props.element.data}
                />
            )
        }
        else{
            setPreview(
                <AllocationReallocationPreview
                    data={props.element.data}
                />
            )
        }
    },[])

    React.useEffect(()=>{
        if(props.calculationType == 'deallocation'){
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
    }, [props.calculationType])
   

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

            <Card className= 
                {`
                    card  border 
                    ${props.isLast ? `border-bottom-1` : `border-bottom-0`}
                    rounded-0
                    border-dark border-3 my-0 `} 
            >
                <Card.Header className={`py-1 ${style}`}>
                    <Row className>
                        <Col sm={5} className='my-auto'><h6><i>Step {props.index + 1}</i></h6></Col>
                        <Col sm={2}>
                            {/* <div className={`component-value-field-preview`}>
                                {props.calculationType}
                            </div> */}
                            <h6>{props.calculationType}</h6>

                            {/* <Select 
                                options={actionTypeOptions} 
                                value={currentActionType}
                                label="Action"
                                onChange={(selectedOptions)=>props.actionTypeOptionChange(selectedOptions, props.element.id)}
                            /> */}
                        </Col>
                        
                        <Col>
                        </Col>
                        
                        <Col sm={3}></Col>
                    </Row>
                </Card.Header>
                <Card.Body className='bg-light pt-0 pb-2'>
                    {preview}
                </Card.Body>
            </Card>
        </>
    );
}

export default CalculationLinePreview;