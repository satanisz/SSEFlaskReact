import React from 'react';
import { Button } from 'react-bootstrap';
import BigMessageCard from '../../Components/BigMessageCard';
import useFetch from '../../Hook/useFetch';
import CalculationForm from '../../Components/CalculationForm/CalculationForm';
import {v4} from 'uuid'
import validateCalculationData from '../../Components/CalculationForm/validateCalculationData'
import usePost from '../../Hook/usePost';
import AlertMessage from '../../Components/AlertMessage';
import { useNavigate } from 'react-router-dom';
 
function Calculation(props) {
    
    const sendGetRequest = useFetch()
    const sendPostRequest = usePost()
    const navigate = useNavigate()
    
    const myRef = React.useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()   

    const [filteringAlgorithm, setFilteringAlgorithm] = React.useState(null)
    const [errorFilteringAlgorithm, setErrorFilteringAlgorithm] = React.useState(null)
    const [isPendingFilteringAlgorithm, setIsPendingFilteringAlgorithm] = React.useState(true)

    const [allocationAlgorithm, setAllocationAlgorithm] = React.useState(null)
    const [errorAllocationAlgorithm, setErrorAllocationAlgorithm] = React.useState(null)
    const [isPendingAllocationAlgorithm, setIsPendingAllocationAlgorithm] = React.useState(true)

    const [specialOrder, setSpecialOrder] = React.useState(null)
    const [errorSpecialOrder, setErrorSpecialOrder] = React.useState(null)
    const [isPendingSpecialOrder, setIsPendingSpecialOrder] = React.useState(true)

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    const [alerts, setAlerts] = React.useState([])
    const [errorValidation, setErrorValidation] = React.useState(null)
    const [errorPost, setErrorPost] = React.useState(null)
    const [calculationTitle, setCalculationTitle] = React.useState("")
    
    const [calculationFormData, setCalculationFormData] = React.useState([
        {calculationType:"", id:v4()},
    ])

  
    /******************************* GET INPUT DATA TO CREATE CALCULATION FORM **************************** */    

    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')
        sendGetRequest(`/allocation-algorithm/titles`, setAllocationAlgorithmInfo)
        sendGetRequest(`/filtering-algorithm/titles/${props.lineName}`, setFilteringAlgorithmInfo)
        sendGetRequest(`/filter/titles/${props.lineName}/special-order`, setSpecialOrdersInfo)
    },[])

    function setAllocationAlgorithmInfo(data, isPending, error){
        if(!isPending){
            setAllocationAlgorithm(data)
        }
        setErrorAllocationAlgorithm(error)
        setIsPendingAllocationAlgorithm(isPending)
    }

    function setFilteringAlgorithmInfo(data, isPending, error){
        if(!isPending){
            setFilteringAlgorithm(data)
        }
        setErrorFilteringAlgorithm(error)
        setIsPendingFilteringAlgorithm(isPending)
    }

    function setSpecialOrdersInfo(data, isPending, error){
        if(!isPending){
            setSpecialOrder(data)
        }
        setErrorSpecialOrder(error)
        setIsPendingSpecialOrder(isPending)
    }

    React.useEffect(()=>{
        if (errorAllocationAlgorithm || errorFilteringAlgorithm || errorSpecialOrder){
            let message = "ERROR: "
            if (errorAllocationAlgorithm){
                message += `allocation algorithms: ${errorAllocationAlgorithm} ;  ` 
            }
            if (errorFilteringAlgorithm){
                message += `filtering algorithm: ${errorFilteringAlgorithm} ;  ` 
            }
            if (errorSpecialOrder){
                message += `special orders: ${errorSpecialOrder} ;  ` 
            }
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingAllocationAlgorithm === false && isPendingFilteringAlgorithm === false && isPendingSpecialOrder===false){
            setContentToDisplay('calculation-form')
        }
    }, [isPendingAllocationAlgorithm, isPendingFilteringAlgorithm, isPendingSpecialOrder])


    /*************************************** CREATE CALCULATION ************************************** */
    
    function createCalculation(){
        if(validateData()){
            submitToApi()
        }else{
            executeScroll()
        }
    }

    function validateData(){ 
        let errors = validateCalculationData(calculationTitle, calculationFormData)
        setErrorValidation(errors)
        if (errors.length > 0){
            return false
        }            
        return true 
    }

    function submitToApi(){
        let dataToSend = getDataToSend()
        sendPostRequest("/calculation/new", dataToSend, setPostInfo)
    }

    function getDataToSend(){
        console.log(props.lineName)
        return JSON.stringify({
            content: calculationFormData,
            title: calculationTitle,
            ownerId: 1,
            line: props.lineName
        })
    }

    function setPostInfo(response, isPending, error){   
        if(!isPending && error===null){
            console.log(response)
            setInfoMessage("Calculation form has been created successfully")
            setContentToDisplay('info-card')
            setTimeout(()=>{
                navigate('/calculations')
            }, 3000)
        }
        if(isPending){
            setInfoMessage("Creating calculation...")
            setContentToDisplay('info-card')
        }
        if(error){
            setErrorPost(error)
            setContentToDisplay('calculation-form')
        }
    }

    React.useEffect(()=>{
        setAlerts([])
        if(errorPost){
            setAlerts(prevAlerts=>{
                return[
                    ...prevAlerts,
                    createAlertMessageObject(errorPost)
                ]}
            )
        }
        if(errorValidation){
            let tmpAlert = errorValidation.map(error=>{
                return createAlertMessageObject(error)
            })
            setAlerts(prevAlerts=>{
                return[
                    ...prevAlerts,
                    tmpAlert
                ]}
            )
        }
    },[errorPost, errorValidation])

    function createAlertMessageObject(message){
        return (<AlertMessage
                    message={message}
                />)
    }
    

    // *************************************************************************************** //
    
    return (
        <div>
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            {contentToDisplay === 'calculation-form' &&
                <>  
                    <div ref={myRef}>
                        {alerts}
                    </div>
                        <CalculationForm
                            calculationFormData={calculationFormData}
                            setCalculationFormData={setCalculationFormData}
                            filteringAlgorithm={filteringAlgorithm}
                            allocationAlgorithm={allocationAlgorithm}
                            specialOrder={specialOrder}
                            calculationTitle={calculationTitle}
                            setCalculationTitle={setCalculationTitle}
                        />
                    <Button onClick={createCalculation}>Create</Button> 
                </>
            }
        </div>
    );
}

export default Calculation;