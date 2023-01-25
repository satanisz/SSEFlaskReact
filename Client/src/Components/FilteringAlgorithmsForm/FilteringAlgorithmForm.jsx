import React from 'react';
import FilteringComponent from './FilteringComponent';
import Form from 'react-bootstrap/Form';
import {Row, Col, Card} from 'react-bootstrap';

function FilteringAlgorithmForm(props) {

    const filteringAlgorithmFormData = props.filteringAlgorithmFormData
    const setFilteringAlgorithmFormData = props.setFilteringAlgorithmFormData
    function setOrdFilterData(myData){
        setFilteringAlgorithmFormData((prevFilteringAlgorithmFormData)=>{
            return {...prevFilteringAlgorithmFormData, ordFilterData:myData}
        })
    }
    function setMatFilterData(myData){
        setFilteringAlgorithmFormData((prevFilteringAlgorithmFormData)=>{
            return {...prevFilteringAlgorithmFormData, matFilterData:myData}
        })
    }
    function setIsOrdAnd(myData){
        setFilteringAlgorithmFormData((prevFilteringAlgorithmFormData)=>{
            return {...prevFilteringAlgorithmFormData, isOrdAnd:myData}
        })
    }

    function setIsMatAnd(myData){
        setFilteringAlgorithmFormData((prevFilteringAlgorithmFormData)=>{
            return {...prevFilteringAlgorithmFormData, isMatAnd:myData}
        })
    }

    function setTitle(event){
        setFilteringAlgorithmFormData((prevFilteringAlgorithmFormData)=>{
            return {...prevFilteringAlgorithmFormData, title:event.target.value}
        })
    }


    return (
        <div>
             <Form.Control onChange={setTitle} type="text" placeholder="Title" defaultValue={filteringAlgorithmFormData.title} className='mt-1' />
                <Row>
                    <Col className='pt-3'>
                        <Card>
                            <Card.Title className='mx-auto pt-2'>
                                <p> Order filters:</p>
                            </Card.Title>
                        <Card.Body className='mt-0 pt-0'>
                        <FilteringComponent 
                            attributes={filteringAlgorithmFormData.ordAttributes}
                            filterData={filteringAlgorithmFormData.ordFilterData}
                            isAnd={filteringAlgorithmFormData.isOrdAnd}
                            setFilterData={setOrdFilterData}
                            setIsAnd={setIsOrdAnd}
                        />
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col className='pt-3'>
                        <Card>
                            <Card.Title className='mx-auto pt-2'>
                                <p> Material filters:</p>
                            </Card.Title>
                            <Card.Body className='mt-0 pt-0'>
                                <FilteringComponent 
                                    attributes={filteringAlgorithmFormData.matAttributes}
                                    filterData={filteringAlgorithmFormData.matFilterData}
                                    isAnd={filteringAlgorithmFormData.isMatAnd}
                                    setFilterData={setMatFilterData}
                                    setIsAnd={setIsMatAnd}
                                    />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </div>
    );
}

export default FilteringAlgorithmForm;