import React from 'react';
import { Col, Row, Form, Collapse } from 'react-bootstrap';
import Select from 'react-select'

function AllocationReallocation(props) {

    const limesOptions = [
        {"value":"-", "label":"-"},
        {"value":"+", "label":"+"}
    ]
    
    const flowOptions = [
        {"value":"noflow", "label":"noflow"},
        {"value":"flow2min", "label":"flow2min"},
        {"value":"flow2target", "label":"flow2target"},
        {"value":"flow2max", "label":"flow2max"}
    ]
    
    const [currentLimes, setCurrentLimes] = React.useState(null)
    const [currentFlow, setCurrentFlow] = React.useState(null)
    const [currentFilteringAlgorithm, setCurrentFilteringAlgorithm] = React.useState(null)
    const [currentAllocationAlgorithm, setCurrentAllocationAlgorithm] = React.useState(null)
    const [currentSpecialOrder, setCurrentSpecialOrder] = React.useState(null)
    const [currentDemand, setCurrentDemand] = React.useState(null)
    const [currentSpecialOrderDemand, setCurrentSpecialOrderDemand] = React.useState(null)
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=>{
        if(props.data.demand !== null){
            setCurrentDemand(props.data.demand)
        }else{
            setCurrentDemand("")
        }
    },[props.data.demand])

    React.useEffect(()=>{
        if(props.data.specialOrderDemand !== null){
            setCurrentSpecialOrderDemand(props.data.specialOrderDemand)
        }else{
            setCurrentSpecialOrderDemand("")
        }
    },[props.data.specialOrderDemand])

    React.useEffect(()=>{
        for(let i = 0 ; i < limesOptions.length ; i++){
            if (limesOptions[i].value === props.data.limes){
                setCurrentLimes(limesOptions[i])
                return
            } 
        }
        setCurrentLimes(null)
    },[props.data.limes])

    React.useEffect(()=>{
        for(let i = 0 ; i < flowOptions.length ; i++){
            if (flowOptions[i].value === props.data.flow){
                setCurrentFlow(flowOptions[i])
                return
            } 
        }
        setCurrentFlow(null)
    },[props.data.flow])

    React.useEffect(()=>{
        for(let i = 0 ; i < props.filteringAlgorithmOptions.length ; i++){
            if (props.filteringAlgorithmOptions[i].value === props.data.filteringAlgorithmId){
                setCurrentFilteringAlgorithm(props.filteringAlgorithmOptions[i])
                return
            } 
        }
        setCurrentFilteringAlgorithm(null)
    },[props.data.filteringAlgorithmId])

    React.useEffect(()=>{
        for(let i = 0 ; i < props.allocationAlgorithmOptions.length ; i++){
            if (props.allocationAlgorithmOptions[i].value === props.data.allocationAlgorithmId)            {
                setCurrentAllocationAlgorithm(props.allocationAlgorithmOptions[i])
                return
            } 
        }
        setCurrentAllocationAlgorithm(null)
    },[props.data.allocationAlgorithmId])

    React.useEffect(()=>{
        for(let i = 0 ; i < props.specialOrderOptions.length ; i++){
            if (props.specialOrderOptions[i].value === props.data.specialOrderId)            {
                setCurrentSpecialOrder(props.specialOrderOptions[i])
                return
            } 
        }
        setCurrentSpecialOrder(null)    
    },[props.data.specialOrderId])
    
    React.useEffect(()=>{
        console.log(props.data.useSpecialOrder)
        setOpen(props.data.useSpecialOrder)
    },[props.data.useSpecialOrder])

    console.log(`${props.index}: ${props.useSpecialOrder} ${props.id}`)
    
    
    // *************************************************************************************** //

    return (
        <div>
            <Row className="pt-1">
                <Col sm={1} className='px-1'>
                    <h6>Demand</h6>
                    <Form.Control 
                        onChange={(event)=>props.demandChange(event, props.id)}
                        type="text"
                        value={currentDemand}
                    />
                </Col>
                <Col sm={1} className='px-1'>
                    <h6>Limes</h6>
                    <Select 
                        options={limesOptions} 
                        value={currentLimes}
                        onChange={(selectedOptions)=>props.limesOptionChange(selectedOptions, props.id)}
                    />
                </Col>
                <Col sm={2} className='px-1'>
                    <h6>Flow</h6>
                    <Select 
                        options={flowOptions} 
                        value={currentFlow}
                        onChange={(selectedOptions)=>props.flowOptionChange(selectedOptions, props.id)}
                    />
                </Col>
                <Col sm={3} className='px-1'>
                    <h6>Algorytm filtrowania</h6>
                    <Select 
                        options={props.filteringAlgorithmOptions} 
                        value={currentFilteringAlgorithm}
                        onChange={(selectedOptions)=>props.filteringAlgorithmOptionChange(selectedOptions, props.id)}
                    />
                </Col>
                <Col className='px-1'>
                    <h6>Algorytm alokacji</h6>
                    <Select 
                        options={props.allocationAlgorithmOptions} 
                        value={currentAllocationAlgorithm}
                        onChange={(selectedOptions)=>props.allocationAlgorithmOptionChange(selectedOptions, props.id)}
                    />
                </Col>
                <Col sm={2} className='align-items-center'>
                    <Row><h6>Use special order</h6></Row>
                    {props.data.useSpecialOrder}
                    <input
                    type="checkbox"
                    checked={props.data.useSpecialOrder}
                    onChange={() => props.specialOrderToggle(props.id)}
                    />
                </Col>
            </Row>
            <Collapse in={props.useSpecialOrder} dimension="height" >
                    <Row id="example-collapse-text" className='pt-4'>
                    <Col sm={3}></Col>
                    <Col className='px-1'>
                        <h6>Specjalne zamowienie</h6>
                        <Select 
                            options={props.specialOrderOptions} 
                            value={currentSpecialOrder}
                            onChange={(selectedOptions)=>props.specialOrderOptionChange(selectedOptions, props.id)}
                        />
                    </Col>
                    <Col sm={2} className='px-1'>
                        <h6>Special order demand</h6>
                        <Form.Control 
                            onChange={(event)=>props.specialOrderDemandChange(event, props.id)}
                            type="text" 
                            value={currentSpecialOrderDemand}
                        />
                    </Col>
                    <Col sm={3}></Col>

                    </Row>
                </Collapse>
        </div>
    );
}

export default AllocationReallocation;