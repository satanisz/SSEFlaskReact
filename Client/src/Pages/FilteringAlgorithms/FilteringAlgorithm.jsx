import React, { useRef } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import useDelete from '../../Hook/useDelete';
import FilterTitlesPreview from './FilterTitlesPreview';
import {useNavigate} from 'react-router-dom'
import Dependency from '../../Components/Dependency/Dependency';
import './style.css'
import UpdateFilteringAlgorithm from './UpdateFilteringAlgorithm';
import BigMessageCard from '../../Components/BigMessageCard';
import ObjectHasErrors from '../../Components/ObjectHasErrors';
import { HiOutlineExclamationCircle } from "react-icons/hi";


function FilteringAlgorithm(props) {
    
    const navigate = useNavigate()
    const executeScroll = () => myRef.current.scrollIntoView()    
    const myRef = useRef(null)

    const [showOptions, setShowOptions] = React.useState(true)

    const [orderFiltresInfo, setOrderFilterInfo] = React.useState(null)
    const [materialFiltresInfo, setMaterialFilterInfo] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState('filtering-algorithm') 

    const sendDeleteRequest = useDelete()

    const [errorDelete, setErrorDelete] = React.useState(null)
    const [isPendingDelete, setIsPendingDelete] = React.useState(false)

    const [update, setUpdate] = React.useState(false)

    const [infoMessage, setInfoMessage] = React.useState(null)
    
    React.useEffect(()=>{
        if(props){
            let data
            if(props.orderFilters.length > 0){
                data = props.orderFilters.map((filter, index)=>{
                let logicalOperator = null
                
                if(index == props.orderFilters.length - 1){
                    logicalOperator = null
                }
                else if(props.isOrderAnd){
                    logicalOperator="AND"
                }
                else{
                    logicalOperator="OR"
                }

                return(<FilterTitlesPreview
                    title={filter.title}
                    logicalOperator={logicalOperator}
                    id = {filter.id}
                />)
                
                })
            }
            else{
                data = <p className='filter-title-error'>--ERROR--</p>
            }
            setOrderFilterInfo(data)
        }
    }, [props])












    function updateClick(){
        executeScroll()
        setContentToDisplay('check-dependencies-update')
    }






    function updateFunction(){
        executeScroll()
        setContentToDisplay('update-form')
    }

    function finishEdition(rerender){
        setContentToDisplay('filtering-algorithm')
        if(rerender){
            props.forceRerender()
        }
    }

    function deleteClick(){
        executeScroll()
        setContentToDisplay('check-dependencies-delete')
    }

    function deleteFunction(){
        setInfoMessage('Processing...')
        setContentToDisplay('info-card')
        sendDeleteRequest( `/filtering-algorithm/${props.id}`, setDeleteInfo)
    }

    function setDeleteInfo(data, isPending, error){
        if(!isPending && error===null){
            setInfoMessage('Removed succesfully!')
            setContentToDisplay('info-card')
            setTimeout(()=>{
                props.forceRerender()
            }, 2000)
          }
          setErrorDelete(error)
          setIsPendingDelete(isPending)
    }














    React.useEffect(()=>{
        if(props){
            let data
            if(props.materialFilters.length > 0){
                data = props.materialFilters.map((filter, index)=>{
                let logicalOperator = null

                if(index == props.materialFilters.length - 1){
                    logicalOperator = null
                }
                else if(props.isMaterialAnd){
                    logicalOperator="AND"
                }
                else{
                    logicalOperator="OR"
                }

                return(<FilterTitlesPreview
                    title={filter.title}
                    logicalOperator={logicalOperator}
                    id = {filter.id}
                />)
                
                })
            
            }
            else{
                data = <p className='filter-title-error'>--ERROR--</p>
            }
            setMaterialFilterInfo(data)
        }
        
    }, [props])
    


    function redirectToUpdate(){
        navigate("/filtering-algorithm/update/" + props.id)
    }



    return (
        <Card 
            ref={myRef} 
            className = {`mb-2 bg-light border border-2  border-secondary ${contentToDisplay !== 'filtering-algorithm'  ? "card  border border-danger border-3 my-2" : null}`}
        >
            <Card.Title className='pt-1 pb-2 mx-2'>
                Id: {props.id}: {props.title} 
                
                {!props.objectIsCorrect && 
                    <span className='aaa'>
                        <HiOutlineExclamationCircle/>
                    </span>
                }
            </Card.Title>
            <Card.Subtitle className='mx-2'>
                {props.dateCreated}
            </Card.Subtitle>
            <Card.Body>
            {/* {!update ? */}
            {contentToDisplay === 'filtering-algorithm' &&
                <>
                    <Row className='pt-1 pb-3'>
                        <Col sm={9} className='mx-auto'>
                        <h6>Order filter</h6>
                        {orderFiltresInfo}
                        <h6 className='pt-4'>Material filter</h6> 
                        {materialFiltresInfo}
                        
                        </Col>
                        <Col sm={2} >
                            <>
                                {showOptions &&  
                                <>
                                    <Row className='my-1 mx-3'><Button variant="primary" size="sm" onClick={updateClick}>Update</Button></Row>
                                    <Row className='my-1 mx-3'><Button variant="primary" size="sm">Create similar</Button></Row>
                                    <Row className='my-1 mx-3'><Button variant="danger" size="sm" onClick={deleteClick}>Delete</Button></Row>
                                </>
                                }
                            </>
                        </Col>
                    </Row>
                    {!props.objectIsCorrect && 
                       <ObjectHasErrors
                            id={props.id}
                            objectType={'FilteringAlgorithm'}   
                       />
                    }
                </>
            }
            {contentToDisplay === 'update-form' &&
                <Row className='pt-1 pb-3 my-2'>
                    <UpdateFilteringAlgorithm
                        id={props.id}
                        finishEdition={finishEdition}
                    />
                </Row>
            }
            {contentToDisplay==='check-dependencies-update'&&
                <Dependency
                    typeOfElement = 'filtering-algorithm'
                    id = {props.id}
                    continueFunction = {updateFunction}
                    cancelFunction = {()=>finishEdition(false)}
                />
            }
            {contentToDisplay==='check-dependencies-delete'&&
                <Dependency
                    typeOfElement = 'filtering-algorithm'
                    id = {props.id}
                    continueFunction = {deleteFunction}
                    cancelFunction = {()=>finishEdition(false)}
                />
            }
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            </Card.Body>

        </Card>
    );
}

export default FilteringAlgorithm;