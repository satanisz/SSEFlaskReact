import React from 'react';
import Select from 'react-select'
import '../../style.css'
import operators from '../../Pages/NewFilter/operatorsData'
import { Col, Form, Row } from 'react-bootstrap';

function NewCondition(props) {

    const [option1, setOption1] = React.useState(null)
    const [option2, setOption2] = React.useState(null)
    const [option3, setOption3] = React.useState(null)
    const attributes = props.attributeNames.map(attribute=>{
        return({"value":attribute, "label":attribute})
    })



    React.useEffect(()=>{
        // console.log("Selected option:")
        // console.log(props.selectedOption)
        //console.log(attributes)
        for(let i = 0 ; i < attributes.length ; i++)
        {
            if (attributes[i].value === props.lineObject.attributeName)
            {
                setOption1(attributes[i])
            } 
        }
        
    },[props.lineObject.attributeName])


    React.useEffect(()=>{
    //    if(operators.props.selectedOperator)
        for(let i = 0 ; i < operators.length ; i++)
        {
            if (operators[i].value === props.lineObject.operator)
            {
                setOption2(operators[i])
            } 
        }


    },[props.lineObject.operator])
    
        // selectedOption={props.lineObject.attributeName}
    // selectedOperator={props.lineObject.operator}
    // value={props.lineObject.value}

    
    React.useEffect(()=>{
    
        setOption3(props.lineObject.value)
    
    },[props.lineObject.value])

    return (
        <Row>
            <Col sm={5}>
                <Select 
                    className="line--parameters" 
                    options={attributes} 
                    name="attribute"
                    value={option1}
                    onChange={(selectedOptions)=>{
                        props.newConditionAttributeNamesSelectionChanged(selectedOptions, props.lineId)}
                    }
                />
            </Col>
            <Col sm={2}>
                <Select 
                    className="line--operators" 
                    options={operators}
                    value={option2}
                    onChange={(selectedOptions)=>{
                        props.newConditionOperatorSelectionChanged(selectedOptions, props.lineId)}
                    }
                    
                    
                />
            </Col>
            <Col sm={5}>
                <Form.Control 
                    onChange={(event)=>{
                        props.newConditionValueChanged(event, props.lineId)}
                    }
                    className='line---value'
                    type="text"
                    placeholder="Value"
                    defaultValue={option3}
                />
            </Col>
        </Row>
    );


}

export default NewCondition;