import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select'
import '../../style.css'

function ExistingFilter(props) {


    const [option1, setOption1] = React.useState(null)

    const existingFilters = props.existingFilters.map(existingFilter=>{
        return({"value":existingFilter.id, "label":existingFilter.title})
    })
    console.log(props)

    React.useEffect(()=>{
        for(let i = 0 ; i < existingFilters.length ; i++)
        {
            if (existingFilters[i].label === props.lineObject.filterTitle)
            {
                setOption1(existingFilters[i])
            } 
        }
        
    },[props.lineObject.filterTitle])

    return (
        <Row>
            {/* <Col sm={1}>
                {props.isNegated ?
                    <Button variant="primary" style={{width:"50px", height:"39px"}} onClick={()=>props.existingFilterNegationToggle(props.lineId)}>!</Button>
                :
                    <Button variant="outline-secondary" style={{width:"50px", height:"39px"}} onClick={()=>props.existingFilterNegationToggle(props.lineId)}></Button>
                }

            </Col> */}
            <Col>
                <Select 
                    className="existing-filter---title" 
                    options={existingFilters} 
                    value={option1}
                    onChange={(selectedOptions)=>props.existingFilterSelectionChanged(selectedOptions, props.lineId)}
                />
            </Col>
        </Row>
    );
}

export default ExistingFilter;