import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select'
import { v4 } from 'uuid';

function Deallocation(props) {

    // data={element.data}
    // allocationAlgorithmOptions={allocationAlgorithmOptions}
    // filteringAlgorithmOptions={filteringAlgorithmOptions}

    const [option1, setOption1] = React.useState(null)
    const [option2, setOption2] = React.useState(null)

    React.useEffect(()=>{
        for(let i = 0 ; i < props.filteringAlgorithmOptions.length ; i++){
            if (props.filteringAlgorithmOptions[i].value === props.data.filteringAlgorithmId){
                setOption1(props.filteringAlgorithmOptions[i])
                return
            } 
        }
        setOption1(null)
        
    },[props.data.filteringAlgorithmId])

    React.useEffect(()=>{
        for(let i = 0 ; i < props.allocationAlgorithmOptions.length ; i++){
            if (props.allocationAlgorithmOptions[i].value === props.data.allocationAlgorithmId)            {
                setOption2(props.allocationAlgorithmOptions[i])
                return
            } 
        }
        setOption2(null)
        
    },[props.data.allocationAlgorithmId])


    // *************************************************************************************** //

    return (
        <Row className="py-1">
            <Col>
                <h6>Algorytm filtrowania</h6>
                <Select 
                    options={props.filteringAlgorithmOptions} 
                    value={option1}
                    onChange={(selectedOptions)=>props.filteringAlgorithmOptionChange(selectedOptions, props.id)}
                />
            </Col>
            <Col>
                <h6>Algorytm alokacji</h6>
                <Select 
                    options={props.allocationAlgorithmOptions} 
                    value={option2}
                    onChange={(selectedOptions)=>props.allocationAlgorithmOptionChange(selectedOptions, props.id)}
                />
            </Col>
        </Row>
    );
}

export default Deallocation;