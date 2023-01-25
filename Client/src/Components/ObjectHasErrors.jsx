import React from 'react';
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import useFetch from '../Hook/useFetch';
import BigMessageCard from './BigMessageCard';
import './style.css'

function ObjectHasErrors({id, objectType, active=true}) {
    
    const sendGetRequest = useFetch()

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)

    const [damageComponents, setDamageComponents] = React.useState(null)
    const [errorDamageComponents, setErrorDamageComponents] = React.useState(null)
    const [isPendingDamageComponents, setIsPendingDamageComponents] = React.useState(true)

    const [dataVisualization, setDataVisualization] = React.useState(null)
    const [infoIsDisplayed, setInfoIsDisplayed] = React.useState(false)


    /******************************* LOAD INFO ABOUT DAMAGED ELEMETS OF COMPONENT **************************** */    
    
    function errorClick(){
        if(active)
        {
            if(infoIsDisplayed){
                setContentToDisplay(null)
                setInfoIsDisplayed(false)
            
            }else{
                setInfoIsDisplayed(true)
                console.log(`im getting error info about ${objectType} with id=${id}!`)
                setInfoMessage('Loading...')
                setContentToDisplay('info-card')

                if(objectType==="Calculation"){
                    sendGetRequest(`/calculation/get-errors/${id}`, setDamageComponentsInfo)
                }
                else if(objectType==="FilteringAlgorithm"){
                    sendGetRequest(`/filtering-algorithm/get-errors/${id}`, setDamageComponentsInfo)
                }
                else if(objectType==="Filter"){
                    sendGetRequest(`/filter/get-errors/${id}`, setDamageComponentsInfo)
                }
                else{
                    setInfoMessage('Incorrect component parameters')
                    setContentToDisplay('info-card')
                }
            }
        }
    }

    function setDamageComponentsInfo(data, isPending, error){
        if(!isPending){
            setDamageComponents(data)
        }
        setErrorDamageComponents(error)
        setIsPendingDamageComponents(isPending)
    }

    React.useEffect(()=>{
        if(errorDamageComponents){ 
            let message = "ERROR: "
            message += `ErrorDamageComponents: ${errorDamageComponents} ;  ` 
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingDamageComponents === false){ 

        }
    }, [isPendingDamageComponents])

    React.useEffect(()=>{
        if(damageComponents){
            let subsections = damageComponents.componentsToFix.map((element)=>{
                console.log(element)
                return(<li>{element.object}: <b>{element.title}</b></li>)
            })

            let errorMessage = (
                <div className={`damage-component-info-tree ${infoIsDisplayed ? 'expand' : 'collapse'}`}>
                    <p> 
                        Errors have been identified in this component. To address them, the following components need to be repaired:
                    </p>
                    <ul>
                        {subsections}
                    </ul>
                </div>
            )
            setDataVisualization(errorMessage)
            setContentToDisplay('damage-components-info')
         }
    },[damageComponents])


    // *************************************************************************************** //

    return (
        <div className="div-error-container" >
            <div onClick={errorClick} className={active ? 'div-error-header-active' : 'div-error-header-inactive'}>
                Errors 
                {active &&
                    <>
                        {infoIsDisplayed ? <FiChevronsUp/> : <FiChevronsDown/>}
                    </>
                } 
            </div> 
            {active &&
                <div className="div-error-info-container">
                    {contentToDisplay ==='info-card' &&
                        <BigMessageCard message={infoMessage}/>
                    }
                    {contentToDisplay === 'damage-components-info' &&
                        <>
                            {dataVisualization}
                        </>
                    }
                </div>
            }
        </div>
    );
}

export default ObjectHasErrors;