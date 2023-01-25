import React from 'react';
import useFetch from '../../Hook/useFetch';
import usePost from '../../Hook/usePost';
import AlertMessage from '../../Components/AlertMessage';
import {useNavigate} from 'react-router-dom'
import { Button, Row, Col, Container } from 'react-bootstrap';
import FilteringAlgorithmForm from '../../Components/FilteringAlgorithmsForm/FilteringAlgorithmForm';
import {v4} from 'uuid'
import validateAlgorithmData from '../../Components/FilteringAlgorithmsForm/validateAlgorithmData';
import BigMessageCard from '../../Components/BigMessageCard';

function NewFilteringAlgorithm(props) {

    const sendGetRequest = useFetch()
    const sendPostRequest = usePost()
    const navigate = useNavigate()
    
    const [alerts, setAlerts] = React.useState([])
    const [filteringAlgorithmFormData, setFilteringAlgorithmFormData] = React.useState({
        isMatAnd:true,
        isOrdAnd:true,
        matAttributes:{},
        ordAttributes:{},
        matFilterData:[{id:v4(), idOfSelectedOption:-1}],
        ordFilterData:[{id:v4(), idOfSelectedOption:-1}],
        ownerId:1,
        title:""

    })
    const [errorOrd, setErrorOrd] = React.useState(null)
    const [isPendingOrd, setIsPendingOrd] = React.useState(true)
    const [isPendingMat, setIsPendingMat] = React.useState(true)
    const [errorMat, setErrorMat] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null) 
    const [infoMessage, setInfoMessage] = React.useState('')
    const [errorValidation, setErrorValidation] = React.useState(null)


    /*************************** LOAD INFO ABOUT EXISTING MATERIAL AND ORDER FILTERS ********************** */
    
    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')

        sendGetRequest(`/filter/titles/${props.lineName}/order`, setOrderInfo)
        sendGetRequest(`/filter/titles/${props.lineName}/material`, setMatInfo)
    },[])
    
    function setOrderInfo(data, isPending, error){
        if(error===null && !isPending)
        {
            setFilteringAlgorithmFormData((prevData)=>{
                return {...prevData, ordAttributes:data}
            })
        }
        setErrorOrd(error)
        setIsPendingOrd(isPending)
    }
    
    function setMatInfo(data, isPending, error){
        if(error===null && !isPending)
        {
            setFilteringAlgorithmFormData((prevData)=>{
                return {...prevData, matAttributes:data}
            })
        }
        setErrorMat(error)
        setIsPendingMat(isPending)
    }

    React.useEffect(()=>{
        if (errorMat || errorOrd){
            let message = []
            if (errorMat){
                message.push(`mat: ${errorMat}`) 
            }
            if (errorOrd){
                message.push(`ord: ${errorOrd}`) 
            }
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingMat === false && isPendingOrd === false){
            setContentToDisplay('algorithm-form')
        }
    }, [isPendingMat, isPendingOrd])


    /*************************************** APPROVE CREATE ALGORITHM ************************************** */

    function createAlgorithm(){
        if(validateData()){
          submitToApi()
        }
    }

    function validateData(){
        let errors = validateAlgorithmData(filteringAlgorithmFormData)
        setErrorValidation(errors)
        console.log(errorValidation)
        if (errors.length > 0){
            return false
        }            
        return true
    }

    function submitToApi(){
        let dataToSend = JSON.stringify({
            title:filteringAlgorithmFormData.title,
            ownerId:filteringAlgorithmFormData.ownerId,
            orderFilters:filteringAlgorithmFormData.ordFilterData,
            isOrderAnd:filteringAlgorithmFormData.isOrdAnd,
            materialFilters: filteringAlgorithmFormData.matFilterData,
            isMaterialAnd:filteringAlgorithmFormData.isMatAnd,
            line: props.lineName
        })
        sendPostRequest('/filtering-algorithm/new', dataToSend, setPostInfo)
    }
    
    function setPostInfo(response, isPending, error)
    {
        if(!isPending && error===null){
            setInfoMessage("Filtering algorithm has been created successfully")
            setContentToDisplay('info-card')
            setTimeout(()=>{
                navigate('/filtering-algorithms')
            }, 3000)
        }   
        if(isPending){
            setInfoMessage("Creating filtering algorithm...")
            setContentToDisplay('info-card')
        }
        if(error){
            setInfoMessage(error)
            setContentToDisplay('info-card')
        }
    }

    React.useEffect(()=>{
        setAlerts([])
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
    },[ errorValidation])
  
    function createAlertMessageObject(message){
        return (<AlertMessage
                    message={message}
                />)
    }

    
    // *************************************************************************************** //

    return (
        <>
            {alerts && alerts}
            {contentToDisplay ==='algorithm-form' &&
                <>                        
                <FilteringAlgorithmForm
                    filteringAlgorithmFormData={filteringAlgorithmFormData}
                    setFilteringAlgorithmFormData = {setFilteringAlgorithmFormData}
                />
                <div class='mt-3'>
                    <Button onClick={createAlgorithm}>Create</Button>
                </div>
                </>
            }
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
        </>
    );
}

export default NewFilteringAlgorithm;