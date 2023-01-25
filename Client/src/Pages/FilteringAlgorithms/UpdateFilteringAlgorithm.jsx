import React from 'react';
import useFetch from '../../Hook/useFetch';
import FilteringAlgorithmForm from '../../Components/FilteringAlgorithmsForm/FilteringAlgorithmForm';
import {v4} from 'uuid'
import { Button , Row, Col} from 'react-bootstrap';
import usePut from '../../Hook/usePut';
import AlertMessage from '../../Components/AlertMessage';
import validateAlgorithmData from '../../Components/FilteringAlgorithmsForm/validateAlgorithmData';
import BigMessageCard from '../../Components/BigMessageCard';

function UpdateFilteringAlgorithm(props) {

    const sendGetRequest = useFetch()
    const sendPutRequest = usePut()

    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    const [infoMessage, setInfoMessage] = React.useState('')

    const [filteringAlgorithmFormData, setFilteringAlgorithmFormData] = React.useState({ownerId:1})

    const [errorAlgorithmDataFromApi, setErrorAlgorithmDataFromApi] = React.useState(null)
    const [isPendingAlgorithmDataFromApi, setIsPendingAlgorithmDataFromApi] = React.useState(true)
    
    const [errorOrd, setErrorOrd] = React.useState(null)
    const [isPendingOrd, setIsPendingOrd] = React.useState(true)

    const [isPendingMat, setIsPendingMat] = React.useState(true)
    const [errorMat, setErrorMat] = React.useState(null)

    const [isPendingPut, setIsPendingPut] = React.useState(true)
    const [errorPut, setErrorPut] = React.useState(null)

    const [dependencies, setDependencies] = React.useState(null)


    const [alerts, setAlerts] = React.useState([])
    
    const [lineName, setLineName] = React.useState(null)

    const [errorValidation, setErrorValidation] = React.useState(null)


    // **************************** LOAD INFO ABOUT ALGORITHM  **************************************** //
    
    React.useEffect(()=>{
        setInfoMessage("Loading algorithm info...")
        setContentToDisplay('info-card')
        sendGetRequest(`/filtering-algorithm/${props.id}`, setFilteringAlgorithmInfo)


        
    }, [])


    function setFilteringAlgorithmInfo(data, isPending, error){
        if(error===null && !isPending)
        {   
            setLineName(data.line)
            setFilteringAlgorithmFormData(prevData=>{
                let newData = {
                    ...prevData, 
                    title:data.title, 
                    isMatAnd:data.isMaterialAnd,
                    isOrdAnd:data.isOrderAnd}
                
                if (data.orderFilters.length > 0){
                    newData = {...newData, ordFilterData:data.orderFilters.map(filter=>{
                        return {id:v4(), idOfSelectedOption:filter.id}
                    })}
                }
                else{
                    newData = {...newData, ordFilterData:[{id:v4(), idOfSelectedOption:-1}]}
                }
                
                if (data.materialFilters.length > 0){
                    newData = {...newData, matFilterData:data.materialFilters.map(filter=>{
                        return {id:v4(), idOfSelectedOption:filter.id}
                    })}
                }
                else{
                    newData = {...newData, matFilterData:[{id:v4(), idOfSelectedOption:-1}]}
                }
                return newData
            })
        }
        setErrorAlgorithmDataFromApi(error)
        setIsPendingAlgorithmDataFromApi(isPending)
    }

    React.useEffect(()=>{
        if(lineName){
            sendGetRequest(`/filter/titles/${lineName}/order`, setOrderInfo)
            sendGetRequest(`/filter/titles/${lineName}/material`, setMatInfo)
        }
    },[lineName])

    function setOrderInfo(data, isPending, error){
        
        if(error===null && !isPending)
        {
            setFilteringAlgorithmFormData((prevData)=>{
                return {...prevData, ordAttributes:data}
            })
            console.log(filteringAlgorithmFormData)
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
        if(isPendingOrd===false && errorOrd===null &&
            isPendingMat===false && errorMat===null &&
            isPendingAlgorithmDataFromApi===false && errorAlgorithmDataFromApi===null)
        {
            setContentToDisplay('algorithm-form')
            validateData()
        }
    },[isPendingMat, isPendingOrd, isPendingAlgorithmDataFromApi])

    
    /*************************************** APPROVE UPDATE ALGORITHM ************************************** */

    function submitToApi(){
        let dataToSend = JSON.stringify({
            title:filteringAlgorithmFormData.title,
            ownerId:filteringAlgorithmFormData.ownerId,
            orderFilters:filteringAlgorithmFormData.ordFilterData,
            isOrderAnd:filteringAlgorithmFormData.isOrdAnd,
            materialFilters: filteringAlgorithmFormData.matFilterData,
            isMaterialAnd:filteringAlgorithmFormData.isMatAnd,
            line:props.lineName
        })

        sendPutRequest(`/filtering-algorithm/${props.id}`, dataToSend, setPutInfo)
    }

    function setPutInfo(response, isPending, error){
        if(error === null && !isPending)
        {
            setInfoMessage("Algorithm has been updated successfully")
            setContentToDisplay('info-card')
            setTimeout(()=>{
                // navigate('/filters')
                props.finishEdition(true)
            }, 3000)
        }
        setErrorPut(error)
        setIsPendingPut(isPending)
    }

    function updateAlgorithm(){
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

    function createAlertMessageObject(message){
        return (<AlertMessage
                    message={message}
                />)
    }

    React.useEffect(()=>{
        setAlerts([])
        if(errorPut){
            setAlerts(prevAlerts=>{
                return[
                    ...prevAlerts,
                    createAlertMessageObject(errorPut)
                ]}
            )
        }
        if(errorMat){
            setAlerts(prevAlerts=>{
                return[ 
                    ...prevAlerts, 
                    createAlertMessageObject(errorMat)
                ]}
            )
        }
        if(errorOrd){
            setAlerts(prevAlerts=>{
                return[
                    ...prevAlerts,
                    createAlertMessageObject(errorOrd)
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
        console.log(alerts)
    },[errorPut, errorMat, errorOrd, errorAlgorithmDataFromApi, errorValidation])
    

    return (
    <>
        {contentToDisplay === 'algorithm-form' &&
            <>
            {alerts && alerts}

            {!errorAlgorithmDataFromApi &&
                <div>
                    <FilteringAlgorithmForm
                        filteringAlgorithmFormData={filteringAlgorithmFormData}
                        setFilteringAlgorithmFormData = {setFilteringAlgorithmFormData}
                    />
                    <Row className='pt-5'>
                        <Col sm={5}></Col>
                        <Col sm={1} ><Button onClick={updateAlgorithm}>Update</Button></Col>
                        <Col sm={1}><Button onClick={()=>props.finishEdition(false)}>Cancel</Button></Col>
                    </Row>
                </div>
            }
            </>
        }
        {contentToDisplay ==='info-card' &&
            <BigMessageCard message={infoMessage}/>
        }
    </>
    );
}
export default UpdateFilteringAlgorithm;