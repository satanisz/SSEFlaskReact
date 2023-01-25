import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import useFetch from '../../Hook/useFetch';
import usePost from '../../Hook/usePost';
import validateCalculationData from '../../Components/CalculationForm/validateCalculationData' 
import AlertMessage from '../../Components/AlertMessage';
import BigMessageCard from '../../Components/BigMessageCard';
import CalculationForm from '../../Components/CalculationForm/CalculationForm';
import { Button } from 'react-bootstrap';
import { omit } from 'lodash';
import usePut from '../../Hook/usePut';


function UpdateCalculation(props) {

    const { calculationId } = useParams();

    const sendGetRequest = useFetch()
    const sendPutRequest = usePut()
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

    const [isPendingCalculationDataFromApi, setIsPendingCalculationDataFromApi] = React.useState(true)

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    const [alerts, setAlerts] = React.useState([])
    const [errorValidation, setErrorValidation] = React.useState(null)
    const [errorPost, setErrorPost] = React.useState(null)
    const [calculationTitle, setCalculationTitle] = React.useState("")
    const [loadFirstViewData, setLoadFirstViewData] = React.useState(true)

    const [calculationFormData, setCalculationFormData] = React.useState([
        {calculationType:"", id:v4()},
    ])

  
    /******************************* GET INPUT DATA TO CREATE CALCULATION FORM **************************** */    

    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')

        sendGetRequest(`/calculation/${calculationId}`, setCalculationFromApiInfo)
    },[loadFirstViewData])


    function setCalculationFromApiInfo(data, isPending, error){

        if(error===null && !isPending){
            console.log(data)
            setCalculationTitle(data.title)
            setCalculationFormData(data.content.map(element=>{
                let tmp = {}
                tmp.calculationType = element.calculationType
                tmp.id = v4()
                tmp.data = omit(element.data, 'filteringAlgorithmTitle', 'allocationAlgorithmTitle', 'specialOrderTitle')
                return tmp
            }))

            sendGetRequest(`/allocation-algorithm/titles`, setAllocationAlgorithmInfo)
            sendGetRequest(`/filtering-algorithm/titles/${data.line}`, setFilteringAlgorithmInfo)
            sendGetRequest(`/filter/titles/${data.line}/special-order`, setSpecialOrdersInfo)
        }
        if(error){
            setInfoMessage(`Couldn't load info about calculation. ${error}`)
            setContentToDisplay('info-card')
        }
        setIsPendingCalculationDataFromApi(isPending)
    }

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
            validateData()
        }
    }, [isPendingAllocationAlgorithm, isPendingFilteringAlgorithm, isPendingSpecialOrder])

    
    /*************************************** CREATE CALCULATION ************************************** */
    
    function updateCalculation(){
        if(validateData()){
            submitToApi()
        }else{
            executeScroll()
        }
    }

    function validateData(){ 
        let errors = validateFlowData() //(calculationTitle, calculationFormData)
        setErrorValidation(errors)
        if (errors){
            return false
        }            
        return true 
    }

    function validateFlowData(){ // TODO 
        return false
    }

    function submitToApi(){
        let dataToSend = getDataToSend()
        sendPutRequest(`/calculation/${calculationId}`, dataToSend, setPutInfo)
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

    function setPutInfo(response, isPending, error){   
        if(!isPending && error===null){
            console.log(response)
            setInfoMessage("Calculation form has been updated successfully")
            setContentToDisplay('info-card')
            setTimeout(()=>{
                navigate('/calculations')
            }, 3000)
        }
        if(isPending){
            setInfoMessage("Updating calculation...")
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
                    <Button onClick={updateCalculation}>Update</Button> 
                    <Button className='ms-2' onClick={()=>navigate('/calculations')}>Cancel</Button> 
                    <Button onClick={()=>setLoadFirstViewData(prev=>!prev)} className='ms-2'>Revert changes</Button> 
                </>
            }
        </div>
    );
}

export default UpdateCalculation;