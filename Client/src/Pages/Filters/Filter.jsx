import React, { useRef } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import FilterConditionsPreview from '../../Components/FilterPreview/FilterConditionsPreview';
import {useNavigate} from 'react-router-dom'

import './style.css'
import useDelete from '../../Hook/useDelete';

import useFetch from '../../Hook/useFetch';
import DependencyWarning from '../../Components/Dependency/DependencyWarning';
import Dependency from '../../Components/Dependency/Dependency';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ObjectHasErrors from '../../Components/ObjectHasErrors';

function Filter(props) {

    const navigate = useNavigate()
    const sendDeleteRequest = useDelete()
    const sendGetRequest = useFetch()

    const myRef = useRef(null)
    const [error,setError] = React.useState("")
    const [showOptions, setShowOptions] = React.useState(true)
    const [filterContent, setFilterContent] = React.useState('filter')

    const [dependencies, setDependencies] = React.useState(null)
    const [isPendingDependencies, setIsPendingDependencies] = React.useState(true)
    const [usingExistingFilterInFilterIsForbidden, setUsingExistingFilterInFilterIsForbidden] = React.useState(null)

    const [isPendingDelete, setIsPendingDelete] = React.useState(true)

    const executeScroll = () => myRef.current.scrollIntoView()    

    
    
    // ******************************** DELETE FILTER *************************************** //

    function deleteClick(){
        executeScroll()
        setFilterContent('check-dependencies-delete')
    }

    function deleteFilter(){
        setFilterContent('pending')
        sendDeleteRequest(`/filter/${props.id}`, setDeleteInfo)
    }

    function setDeleteInfo(data, isPending, error){
        if(!isPending && error===null){
            console.log("Removed succesfully!")
            setFilterContent('removed-succesfully') 
            setTimeout(()=>{
                props.forceRerender()
            }, 2000)
        }
        else if (error!= null){
            setError(`There was a problem when trying to remove the filter. ${error}`)
            setFilterContent('error')
        }
        setIsPendingDelete(isPending)
    }


    // ******************************** UPDATE FILTER *************************************** //

    function updateClick(){
        executeScroll()
        setFilterContent('check-dependencies-update')
    }

    function updateFilter(){
        setFilterContent('pending')
        navigate("/filter/update/" + props.id)
    }
  
    
    // ************************************* OTHERS ***************************************** //
    
    function cancleChanges(){
        setFilterContent('filter')
    }
    
    
    // ************************************************************************************** //
    
    return (
        <Card 
            ref={myRef} 
            className = {`mb-2 bg-light border border-2  border-secondary ${filterContent !== 'filter'  ? "card  border border-danger border-3 my-3" : null}`}

        >
            <Card.Title className='p-3'>
                Id: {props.id}: <a href={"http://localhost:5000/filter/" + props.id}>{props.title}</a>
                {!props.objectIsCorrect && 
                    <span className='aaa'>
                        <HiOutlineExclamationCircle/>
                    </span>
                }
            </Card.Title>
            <Card.Subtitle className='p-3'>
                {props.dateCreated}
            </Card.Subtitle>
            <Card.Body className='p-3'>
                {filterContent==='filter' &&
                    <>
                        <Row className='pt-1 pb-3'>
                            <Col sm={10}>
                                <FilterConditionsPreview
                                    filterRows={props.filterRows}
                                />
                            </Col>
                            <Col sm={2}>
                                {showOptions &&  
                                <>
                                    <Row className='my-1 mx-3'><Button variant="primary" size="sm" onClick={updateClick}>Update</Button></Row>
                                    <Row className='my-1 mx-3'><Button variant="primary" size="sm">Create similar</Button></Row>
                                    <Row className='my-1 mx-3'><Button variant="danger" size="sm" onClick={deleteClick}>Delete</Button></Row>
                                </>
                                }
                            </Col>
                        </Row>
                        {!props.objectIsCorrect && 
                        <ObjectHasErrors
                            active = {false}
                        />
                        }
                    </>
                }
                {filterContent==='delete' &&
                    // deleteWarningInfo
                    <>
                        <DependencyWarning
                            dependencies = {dependencies}
                            leftButtonFunction = {deleteFilter} 
                            leftButtonText = "Force delete"
                            rightButtonFunction = {cancleChanges}
                            rightButtonText = 'Cancel'
                        />
                    </>
                }
                {filterContent==='update' &&
                    <DependencyWarning
                    dependencies = {dependencies}
                    leftButtonFunction = {updateFilter} 
                    leftButtonText = "Update anyway"
                    rightButtonFunction = {cancleChanges}
                    rightButtonText = 'Cancel'  
                    />
                }
                {filterContent==='pending' &&
                    <h2>Processing...</h2>
                }
                {filterContent==='removed-succesfully' &&
                    <h2>Removed succesfully!</h2>
                }
                {filterContent==='error'&&
                    <h2>{error}</h2>
                }
                {filterContent==='check-dependencies-update'&&
                    <Dependency
                        typeOfElement = 'filter'
                        id = {props.id}
                        continueFunction = {updateFilter}
                        cancelFunction = {cancleChanges}
                    />
                }
                {filterContent==='check-dependencies-delete'&&
                    <Dependency
                        typeOfElement = 'filter'
                        id = {props.id}
                        continueFunction = {deleteFilter}
                        cancelFunction = {cancleChanges}
                    />
                }
            </Card.Body>
        </Card>
    );
}

export default Filter;