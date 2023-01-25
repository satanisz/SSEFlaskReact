import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import './style.css'
import Bracket from './Bracket';
import ExistingFilter from './ExistingFilter';
import NewCondition from './NewCondition';


function Line(props) {


    const [openingBrackets, setOpeningBrackets] = React.useState(()=>{
        return generateBracketObject(true)
    })

    const [closingBrackets, setClosingBrackets] = React.useState(()=>{
        return generateBracketObject(false)
    })

    const [buttonsAreVisible, setButtonsAreVisible] = React.useState(false)



    function generateBracketObject(isOpening)
    {
        const tab = []

        if(isOpening){
            for(let i = 0 ; i < props.numberOfOpeningBrackets ; i++)
            {
                tab.push(<Bracket 
                    isOpening={isOpening}
                    style="error"
                />)
            }
        }
        else{
            for(let i = 0 ; i < props.numberOfClosingBrackets ; i++)
            {
                tab.push(<Bracket 
                    isOpening={isOpening}
                    style="error"
                />)
            }
        }
        
        return tab
    }
    // error, hover

    React.useEffect(()=>{
        setOpeningBrackets(generateBracketObject(true))
    }, [props.numberOfOpeningBrackets])

    React.useEffect(()=>{
        setClosingBrackets(generateBracketObject(false))
    }, [props.numberOfClosingBrackets])


    return (
        <Row style={{height: "50px"}} className='my-1'
            onMouseEnter={()=>{
                setButtonsAreVisible(true)
                props.setActiveLine(props.id)    
            }} 
            onMouseLeave={()=>{
                setButtonsAreVisible(false)
                props.setActiveLine(-1)
            }}
        >
            
            <Col sm={1} style={{height: "38px", fontSize:'22px', textAlign: 'right'}} className=' border border-3 rounded-2'
                onClick={()=>props.editBracket(props.id, true, true)}
                onContextMenu={(e)=>{
                    e.preventDefault()
                    props.editBracket(props.id, true, false)}}
            >
                {/* {props.numberOfOpeningBrackets} */}
                {openingBrackets}


            </Col>

            <Col sm={7}>
                {props.isLineObjectExist ?
                    <>
                        {props.isNewCondition ? 
                            <NewCondition 
                                attributeNames={props.attributeNames}
                                lineObject = {props.lineObject}
                                newConditionAttributeNamesSelectionChanged={props.newConditionAttributeNamesSelectionChanged}
                                newConditionOperatorSelectionChanged={props.newConditionOperatorSelectionChanged}
                                newConditionValueChanged={props.newConditionValueChanged}
                                lineId={props.id}
                            /> :
                            <ExistingFilter 
                                existingFilters={props.existingFilters}
                                lineObject = {props.lineObject}
                                existingFilterSelectionChanged={props.existingFilterSelectionChanged}
                                isNegated={props.lineObject.isNegated}
                                existingFilterNegationToggle={props.existingFilterNegationToggle}
                                lineId={props.id}
                            />
                        }
                    </>
                :
                <div>
                    <h2>ERROR!!!</h2>
                </div>
                }
                    
            </Col>
            <Col sm={1} style={{height: "38px", fontSize:'22px', textAlign: 'left'}} className="border border-3 rounded-2 px-0 py-0"
                onClick={()=>props.editBracket(props.id, false, true)}
                onContextMenu={(e)=>{
                    e.preventDefault()
                    props.editBracket(props.id, false, false)}}
            >
                {closingBrackets}
                {/* {props.numberOfClosingBrackets} */}
            </Col>
            <Col sm={1}>
                {props.isLogicalOperatorExist && 
                <Button variant="primary" onClick={()=>props.toggleLogicalOperator(props.id)}>{props.isAnd ? "AND" :"OR"}</Button>}
            </Col>
            
            {buttonsAreVisible &&
            <>   
            <Col sm={2}>
                <div className="btn-group d-flex" role="group">
                        <Button variant="success" size="sm" onClick={()=>props.addBelowThisElement(props.id, true)}>New condition</Button>
                        {props.allowToUseExistingFilters ?
                            <Button variant="success" size="sm" onClick={()=>props.addBelowThisElement(props.id, false)}>Existing filter</Button>
                        :
                            <Button variant="success" size="sm" onClick={()=>props.addBelowThisElement(props.id, false)} disabled>Existing filter</Button>
                        }
                        {props.isDeleteActive ?
                            <Button variant="danger" size="sm" onClick={()=>props.removeThisElement(props.id)}>Delete</Button>
                            
                        :
                            <Button variant="danger" size="sm" onClick={()=>props.removeThisElement(props.id)} disabled>Delete</Button>
                        }
                </div>
            </Col>
            </>
        }


            {/* <div>
                <pre>{JSON.stringify(props.existingFiltersFromApi, null, 2)}</pre>
                dadsdadsad
                <pre>{JSON.stringify(props.attributeNames, null, 2)}</pre>
                dsadasda
            </div> */}
        </Row>
    );
}

export default Line;