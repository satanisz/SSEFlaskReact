import React, { useRef } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ObjectHasErrors from '../../Components/ObjectHasErrors';
import useDelete from '../../Hook/useDelete';
import CalculationLinePreview from './CalculationLinePreview';
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Calculation(props) {

    const myRef = useRef(null)
    const navigate = useNavigate()
    const executeScroll = () => myRef.current.scrollIntoView()   

    const [lines, setLines] = React.useState(null)
    const [calculationContent, setCalculationContent] = React.useState('calculation')
    const [error,setError] = React.useState("")
    const sendDeleteRequest = useDelete()
    const [isPendingDelete, setIsPendingDelete] = React.useState(true)


    React.useEffect(()=>{
        setLines(props.content.map((element, index)=>{
            let isLast = false
            if(index + 1 == props.content.length){
                isLast = true
            }
            return (<CalculationLinePreview
                        element = {element}
                        calculationType={element.calculationType}
                        index = {index}
                        isLast = {isLast}
            />)
        }))
    },[])

    
    // ******************************** DELETE CALCULATION *************************************** //

    function deleteCalculation(){
        executeScroll()
        setCalculationContent('pending')
        sendDeleteRequest(`/calculation/${props.id}`, setDeleteInfo)
    }

    function setDeleteInfo(data, isPending, error){
        if(!isPending && error===null){
            console.log("Removed succesfully!")
            setCalculationContent('removed-succesfully') 
            setTimeout(()=>{
                props.forceRerender()
            }, 2000)
        }
        else if (error!= null){
            setError(`There was a problem when trying to remove the filter. ${error}`)
            setCalculationContent('error')
        }
        setIsPendingDelete(isPending)
    }

    
    // ******************************** UPDATE CALCULATION *************************************** //
    
    function updateFilter(){
        setCalculationContent('pending')
        navigate("/calculation/update/" + props.id)
    }


    // *************************************************************************************** //

    return (
        <Card 
            ref={myRef} 
            className = {`mb-2 bg-light border border-2  border-secondary ${calculationContent !== 'calculation'  ? 'card  border border-danger border-3 my-3' : null}`}
        >
            <Card.Title className='p-3'>
                Id: {props.id}: {/* <a href={"http://localhost:5000/filter/" + props.id}>{props.title}</a> */}
                {props.title}
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
                {calculationContent==='calculation' &&
                    <>
                        <Row>
                            <Col sm={10}>
                                {lines}
                            </Col>
                            <Col sm={2} className='my-auto'>
                                <Row className='my-1 mx-3'><Button variant="primary" size="sm" onClick={updateFilter}>Update</Button></Row>
                                <Row className='my-1 mx-3'><Button variant="primary" size="sm">Create similar</Button></Row>
                                <Row className='my-1 mx-3'><Button variant="danger" size="sm" onClick={deleteCalculation}>Delete</Button></Row>
                            </Col>
                        </Row>
                        {!props.objectIsCorrect && 
                            <ObjectHasErrors
                                id={props.id}
                                objectType={'Calculation'}   
                            />
                        }
                     </>
                }
                {calculationContent==='delete' &&
                    <h2>Deleting...</h2>
                }
                {calculationContent==='pending' &&
                    <h2>Processing...</h2>
                }
                {calculationContent==='removed-succesfully' &&
                    <h2>Removed succesfully!</h2>
                }
                {calculationContent==='error'&&
                    <h2>{error}</h2>
                }
            </Card.Body>
        </Card>
    );
}

export default Calculation;