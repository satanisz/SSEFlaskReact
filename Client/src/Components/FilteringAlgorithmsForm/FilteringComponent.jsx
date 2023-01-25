import React, { useEffect } from 'react';
import LineContainer from '../../Components/LineContainer'
import LineContent from './LineContent'
import {v4} from 'uuid'
import { Button, Row, Col, Container, Card} from 'react-bootstrap'

function FilteringComponent(props) {
    // attributes={ordAttributes}
    // filterData={ordFilterData}
    // setFilterData={setOrdFilterData}
    // isOrdAnd={isOrdAnd}
    // setIsOrdAnd={setIsOrdAnd}

    function toggleLogicalOperater(){
        props.setIsAnd(!props.isAnd)
    }

    
    // React.useEffect(()=>{
    //     props.setFilterData([
    //         {id:v4(), idOfSelectedOption:-1},
    //         {id:v4(), idOfSelectedOption:-1},
    //     ])
    // },[])
    

    
    const emptyLineContent = {idOfSelectedOption:-1}

    const [linesContent, setLinesContent] = React.useState(null)
    const [linesContainer, setLinesContainer] = React.useState(null)
    React.useEffect(()=>{
        setLinesContent(props.filterData.map(lineContent=>{
            return <LineContent
                id={lineContent.id}
                attributes = {props.attributes}
                filterData={props.filterData}
                setFilterData={props.setFilterData}
            />
        }))
    },[props.filterData])

    React.useEffect(()=>{
        if(linesContent){
            setLinesContainer(linesContent.map(lineContent=>{
                return<LineContainer
                    content={lineContent}
                    rows={props.filterData}
                    setRows={props.setFilterData}
                    emptyRow={emptyLineContent}
                />
            }))
        }
    },[linesContent])



    return (
        <Row>
            <Col sm={10} >{linesContainer && linesContainer}</Col>
            <Col sm={2} className='my-auto'>
                <Button variant="primary" onClick={toggleLogicalOperater}>
                {props.isAnd ? "AND" : "OR"}
                </Button>
            </Col>
        </Row>
    );
}

export default FilteringComponent;