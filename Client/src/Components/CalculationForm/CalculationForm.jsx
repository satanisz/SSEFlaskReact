import React from 'react';
import CalculationFormLine from './CalculationFormLine';
import {v4} from 'uuid'
import { Col, Form, Row } from 'react-bootstrap';
import DefaultElements from './defaultElements';


function CalculationForm(props) {

    const defaultElements = new DefaultElements()
    const defaultDeallocationDataStructure = defaultElements.getDefaultDeallocationDataStructure()
    const defaultAllocationAndReallocationDataStructure = defaultElements.getDefaultAllocationReallocationDataStructure()
    const [calculationFormLines, setCalculationFormLine] = React.useState(null)

    const allocationAlgorithmOptions = props.allocationAlgorithm.map(element=>{
        return({"value":element.id, "label":element.title})
    })
    const filteringAlgorithmOptions = props.filteringAlgorithm.map(element=>{
        return({"value":element.id, "label":element.title})
    })
    const specialOrderOptions = props.specialOrder.map(element=>{
        return({"value":element.id, "label":element.title})
    })
    

    React.useEffect(()=>{
        setCalculationFormLine(null)
        setCalculationFormLine(props.calculationFormData.map((element, index)=>{
            let isDeleteButtonDisabled = false
            if(props.calculationFormData.length === 1){
                isDeleteButtonDisabled =  true
            }
            return(
                <CalculationFormLine 
                    index = {index}
                    element={element}
                    allocationAlgorithmOptions={allocationAlgorithmOptions}
                    filteringAlgorithmOptions={filteringAlgorithmOptions}
                    specialOrderOptions={specialOrderOptions}
                    actionTypeOptionChange={actionTypeOptionChange}
                    allocationAlgorithmOptionChange={allocationAlgorithmOptionChange}
                    filteringAlgorithmOptionChange={filteringAlgorithmOptionChange}
                    specialOrderToggle={specialOrderToggle}
                    specialOrderOptionChange={specialOrderOptionChange}
                    limesOptionChange={limesOptionChange}
                    flowOptionChange={flowOptionChange}
                    demandChange={demandChange}
                    specialOrderDemandChange={specialOrderDemandChange}
                    addElementBelow={addElementBelow}
                    removeElement={removeElement}
                    isDeleteButtonDisabled={isDeleteButtonDisabled}
                />
            )
       }))
    },[props.calculationFormData])

    function actionTypeOptionChange(selectedOptions, id){
        console.log(`actionTypeChanged ${id}`)
        console.log(selectedOptions)
        
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = JSON.parse(JSON.stringify(prevCalculationFormData))  //TO DO!!!

            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].calculationType = selectedOptions.value
                    if(selectedOptions.value == 'deallocation'){
                        newCalculationFormData[i].data = {...defaultDeallocationDataStructure}
                    }else{
                        newCalculationFormData[i].data = {...defaultAllocationAndReallocationDataStructure}
                    }
                }
            }
            return newCalculationFormData
        })
    }

    function allocationAlgorithmOptionChange(selectedOptions, id){
        // console.log(`AllocationAlgorithmChanged ${id} ${selectedOptions}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]

            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.allocationAlgorithmId = selectedOptions.value
                }
            }
            return newCalculationFormData
        })
    }
    
    function filteringAlgorithmOptionChange(selectedOptions, id){
        // console.log(`FilteringAlgorithmChanged ${id} ${selectedOptions}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]

            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.filteringAlgorithmId = selectedOptions.value
                }
            }
            return newCalculationFormData
        })
    }

    function specialOrderOptionChange(selectedOptions, id){
        // console.log(`SpecialOrderChanged ${id} ${selectedOptions}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]

            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.specialOrderId = selectedOptions.value
                }
            }
            return newCalculationFormData
        })
    }

    function limesOptionChange(selectedOptions, id){
        // console.log(`limesOptionChange ${id} ${selectedOptions}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]

            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.limes = selectedOptions.value
                }
            }
            return newCalculationFormData
        })
    }
    
    function flowOptionChange(selectedOptions, id){
        // console.log(`flowOptionChange ${id} ${selectedOptions}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]
            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.flow = selectedOptions.value
                }
            }
            return newCalculationFormData
        })
    }

    function specialOrderToggle(id){
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]
            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.useSpecialOrder = !newCalculationFormData[i].data.useSpecialOrder
                    if(!newCalculationFormData[i].data.useSpecialOrder){
                        newCalculationFormData[i].data = {...newCalculationFormData[i].data, specialOrderDemand:"", specialOrderId:null}
                    }
                }
            }
            return newCalculationFormData
        })
    }
    
    function demandChange(event, id){
        // console.log(`demandChange ${id} ${event.target.value}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]
            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.demand = event.target.value
                }
            }
            return newCalculationFormData
        })
    }

    function specialOrderDemandChange(event, id){
        // console.log(`specialOrderDemandChange ${id} ${event.target.value}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = [...prevCalculationFormData]
            for(let i = 0 ; i < newCalculationFormData.length ; i++){
                if(newCalculationFormData[i].id === id){
                    newCalculationFormData[i].data.specialOrderDemand = event.target.value
                }
            }
            return newCalculationFormData
        })
    }

    function addElementBelow(id){
        // console.log(`addElementBelow ${id}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = []
            for(let i = 0 ; i < prevCalculationFormData.length ; i++){
                newCalculationFormData.push(JSON.parse(JSON.stringify(prevCalculationFormData[i])))
                if(prevCalculationFormData[i].id === id){
                    let tmp = {calculationType:"", id:v4()}
                    newCalculationFormData.push(tmp)
                }
            }
            return JSON.parse(JSON.stringify(newCalculationFormData))
        })
    }

    function removeElement(id){
        // console.log(`removeElement ${id}`)
        props.setCalculationFormData(prevCalculationFormData=>{
            let newCalculationFormData = []
            for(let i = 0 ; i < prevCalculationFormData.length ; i++){
                if(prevCalculationFormData[i].id !== id){
                    newCalculationFormData.push(JSON.parse(JSON.stringify(prevCalculationFormData[i])))
                }
            }
            return JSON.parse(JSON.stringify(newCalculationFormData))
        })
    }

    function setTitle(event){
        props.setCalculationTitle(event.target.value)
    }


    // *************************************************************************************** //
    
    return (
        <div>
            <h1>Calculation form</h1>
            <Row className='py-3'>
                <Col>
                    <Form.Control 
                        className='calculation-title' 
                        onChange={setTitle}
                        type="text"
                        placeholder="Title"
                        value={props.calculationTitle}
                    />
                </Col>
            </Row>
            {calculationFormLines &&
                calculationFormLines
            }
        </div>
    );
}

export default CalculationForm;