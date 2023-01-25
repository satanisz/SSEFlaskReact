import React from 'react';
import { useEffect } from "react"
import "./style.css"
import { Button, Col, Row, Form, Container } from 'react-bootstrap';
import FilterConditionsPreview from "../../Components/FilterPreview/FilterConditionsPreview"
import {v4} from 'uuid'
import DefaultElements from './defaultElements';
import Line from './Line';

function FilterForm(props) {
    
    const [activeLine, setActiveLine] = React.useState(-1)
    const defaultElements = new DefaultElements()
    const defaultElementData = defaultElements.getDefaultElementData()
    const defaultNewCondition = defaultElements.getDefaultNewCondition()
    const defaultExistingFilter = defaultElements.getDefaultExistingFilter()


    function setLogicalOperatorsForLastElements(){
        
        props.setLinesData(prevLinesData=>{
            const newLinesData = prevLinesData.map(line=>{
              return{...line, isLogicalOperatorExist:true
              }}
            )
            
            if(newLinesData.length>1 && newLinesData[newLinesData.length-2].isAnd === undefined){
              newLinesData[newLinesData.length-2].isAnd = true
            }
            
            if(newLinesData.length>0){
            newLinesData[newLinesData.length-1].isLogicalOperatorExist = false
            newLinesData[newLinesData.length-1].isAnd = true
            }
            return newLinesData
            
        })
    }
    
    function addNewCondition(){
        props.setLinesData(prevLinesData=>{
          return[...prevLinesData, {...defaultElementData, id:v4(), isNewCondition:true, lineObject:{...defaultNewCondition}}]
        })
        setLogicalOperatorsForLastElements()
      }
    
    function addExistingFilter(){
        props.setLinesData(prevLinesData=>{
            return[...prevLinesData, {...defaultElementData, id:v4(), isNewCondition:false, lineObject:defaultExistingFilter}]
        })
        setLogicalOperatorsForLastElements()
    }
    
    function removeData(){
        props.setLinesData(prevLinesData=>{
          let newArray = [...prevLinesData]
          newArray.pop()
          return newArray
        })
        setLogicalOperatorsForLastElements()
      }
    

      /* ************************************************************************ */
  // Interface elements that depending on linesData. 
  const[lines, setLines] = React.useState([])



  React.useEffect(()=>{
    
    let isDeleteActive = false
    if (props.linesData.length > 1){
      isDeleteActive = true
    }
    // TODO you can delete line below and mechanism works correctly
    isDeleteActive = true
    //*********************************************************** */
    setLines(props.linesData.map(line=>
      <Line
        key={line.id}
        id={line.id}
        numberOfOpeningBrackets={line.numberOfOpeningBrackets}
        isLineObjectExist={line.isLineObjectExist}
        isNewCondition={line.isNewCondition}
        lineObject={line.lineObject}
        isLogicalOperatorExist={line.isLogicalOperatorExist}
        isAnd={line.isAnd}
        numberOfClosingBrackets={line.numberOfClosingBrackets}
        existingFilters={props.existingFilters}
        attributeNames={props.attributeNames}
        toggleLogicalOperator={toggleLogicalOperator}
        editBracket={editBracket}
        existingFilterSelectionChanged={existingFilterSelectionChanged}
        existingFilterNegationToggle={existingFilterNegationToggle}
        newConditionAttributeNamesSelectionChanged={newConditionAttributeNamesSelectionChanged}
        newConditionOperatorSelectionChanged={newConditionOperatorSelectionChanged}
        newConditionValueChanged={newConditionValueChanged}
        addBelowThisElement={addBelowThisElement}
        removeThisElement={removeThisElement}
        setActiveLine={setActiveLine}
        allowToUseExistingFilters={props.allowToUseExistingFilters}
        isDeleteActive={isDeleteActive}

      />
      ))
  }, [props.linesData, props.existingFiltersFromApi, props.attributeNames])
    
  function removeThisElement(elementId)
  {
    props.setLinesData(prevLinesData => prevLinesData.filter(line => line.id !== elementId))
    setLogicalOperatorsForLastElements()
  }

  function toggleLogicalOperator(id){
    props.setLinesData(prevLinesData =>{
      return prevLinesData.map(line=>{
        return line.id === id ? {...line, isAnd: !line.isAnd} : line
      })
    })
  }

  function addBelowThisElement(elementId, isNewCondition)
  {
    console.log("adding existing filter form below id: " + elementId + " element")
    props.setLinesData(prevLinesData=>{
      
      const newLinesData = []
      
      for(let i = 0 ; i < prevLinesData.length ; i++)
      {
        newLinesData.push(prevLinesData[i])
        if(prevLinesData[i].id == elementId)
        {
          isNewCondition ?
            newLinesData.push({...defaultElementData, id:v4(), isNewCondition:true, lineObject:defaultNewCondition}) :
            newLinesData.push({...defaultElementData, id:v4(), isNewCondition:false, lineObject:defaultExistingFilter}) 

          
        }
      }
      return newLinesData
    })
    setLogicalOperatorsForLastElements()
  }
  function editBracket(id, isOpening, isAdding){
    // console.log("addBracket " + id + " isOpening:" + isOpening + "   isAdding:" + isAdding)
    if(isOpening){
        props.setLinesData(prevLinesData =>{
        return prevLinesData.map(line=>{
          return line.id === id ? {...line, numberOfOpeningBrackets: generateCorrectValue(line.numberOfOpeningBrackets, isAdding)} : line
        })
      })
    }
    else{
        props.setLinesData(prevLinesData =>{
        return prevLinesData.map(line=>{
          return line.id === id ? {...line, numberOfClosingBrackets: generateCorrectValue(line.numberOfClosingBrackets, isAdding)} : line
        })
      })

    }

  }
  function existingFilterSelectionChanged(selectedOptions, lineId){
    props.setLinesData(prevLinseData=>{
      const linesData = [...prevLinseData]
      for(let i = 0 ; i < linesData.length ; i++)
      {
        if(linesData[i].id===lineId){
          linesData[i].lineObject.id = selectedOptions.value 
          linesData[i].lineObject.filterTitle = selectedOptions.label
        }
      }
      return linesData
    })
  }

  function existingFilterNegationToggle(lineId){

    props.setLinesData(prevLinseData=>{
      const linesData = [...prevLinseData]
      for(let i = 0 ; i < linesData.length ; i++)
      {
        if(linesData[i].id===lineId){
          linesData[i].lineObject.isNegated = !linesData[i].lineObject.isNegated
        }
      }
      return linesData
    })
  }


  function newConditionAttributeNamesSelectionChanged(selectedOptions, lineId){
    props.setLinesData(prevLinseData=>{
      const linesData = [...prevLinseData]
      for(let i = 0 ; i < linesData.length ; i++)
      {
        if(linesData[i].id===lineId){
          linesData[i].lineObject.attributeName = selectedOptions.value 
        }
      }
      return linesData
    })
  }

  function newConditionOperatorSelectionChanged(selectedOptions, lineId){
    props.setLinesData(prevLinseData=>{
      const linesData = [...prevLinseData]
      for(let i = 0 ; i < linesData.length ; i++)
      {
        if(linesData[i].id===lineId){
          linesData[i].lineObject.operator = selectedOptions.value
        }
      }
      return linesData
    })
  }

  function newConditionValueChanged(event, lineId){
    console.log(event.target.value)
    props.setLinesData(prevLinseData=>{
      const linesData = [...prevLinseData]
      for(let i = 0 ; i < linesData.length ; i++)
      {
        if(linesData[i].id===lineId){
          linesData[i].lineObject.value = event.target.value
        }
      }
      return linesData
    })
  }
  

  function generateCorrectValue(value, isAdding){
    const operation = isAdding ? 1 : -1
    value = value + operation
    return value < 0 ? 0 : value
  }

  function setTitle(event){
    props.setFilterTitle(event.target.value)
  }

    return (
        <Container>
        <Row className='py-3'>
          <Col>
            <Form.Control className='filter-title' onChange={setTitle} type="text" placeholder="Title" defaultValue={props.filterTitle}/>
          </Col>
        </Row>
        <Row className='pt-5 pb-2'>
          <Col sm={3} className='px-0'>
          <div className="btn-group d-flex" role="group">
            <Button variant="success" onClick={addNewCondition}>New condition</Button>
            {props.allowToUseExistingFilters ?
              <Button variant="success" onClick={addExistingFilter}>Existing filter</Button>
              :
              <Button variant="success" onClick={addExistingFilter} disabled>Existing filter</Button>
            }              
            <Button variant="danger" onClick={removeData}>Delete last element</Button>
          </div>
          </Col>
        </Row>
        {lines}
        <Row className="filter-preview">
          <FilterConditionsPreview 
            filterRows={props.linesData}
            activeLine={activeLine}
          />
        </Row>
      </Container>
    );
}

export default FilterForm;