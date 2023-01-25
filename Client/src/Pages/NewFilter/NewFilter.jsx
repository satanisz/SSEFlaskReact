import React from 'react';
import "../../style.css"
import AlertMessage from "../../Components/AlertMessage"
import { Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import useFetch from "../../Hook/useFetch"
import usePost from "../../Hook/usePost"
import FilterForm from "../../Components/FilterForm/FilterForm"
import {v4} from 'uuid'
import DefaultElements from "../../Components/FilterForm/defaultElements"
import validateFilterData from "../../Components/FilterForm/validateFilterData";
import MultiStageSwitch from '../../Components/MultiStageSwitch';
import BigMessageCard from '../../Components/BigMessageCard';

function NewFilter(props){

    const navigate = useNavigate()
    const sendGetRequest = useFetch()
    const sendPostRequest = usePost()

    const myRef = React.useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()   

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)


    const defaultElements = new DefaultElements()
    const defaultElementData = defaultElements.getDefaultElementData()
    const defaultNewCondition = defaultElements.getDefaultNewCondition()



    const [linesData, setLinesData] = React.useState(()=>[defaultElementData])

    const [errorValidation, setErrorValidation] = React.useState(null)

    const [alerts, setAlerts] = React.useState([])
    const [filterTitle, setFilterTitle] = React.useState("")


    const [attributeNames, setAttributeNames] = React.useState([])
    const [isPendingAttributeNames, setIsPendingAttributeNames] = React.useState(true)
    const [errorAttributeNames, setErrorAttributeNames] = React.useState(null)

    const [existingFilters, setExistingFilters] = React.useState([])
    const [isPendingExistingFilters, setIsPendingExistingFilters] = React.useState(true)
    const [errorExistingFilters, setErrorExistingFilters] = React.useState(null)

    const [errorPost, setErrorPost] = React.useState(null)
    const [isPendingPost, setIsPendingPost] = React.useState(true)

    /**************************************** SELECT FILTER TYPE *********************************** */

    const switchOptions = [
        { name: 'Order', value: 'order'},
        { name: 'Material', value: 'material' },
        { name: 'Special order', value: 'special-order' }
    ]
    const [filterType, setFilterType] = React.useState(null)


    /******************************* GET INPUT DATA TO CREATE FILTER FORM **************************** */

    React.useEffect(()=>{
        if(filterType){
            setInfoMessage('Loading...')
            setContentToDisplay('info-card')
            
            setAlerts([])
            setLinesData([{...defaultElementData, id:v4(), isNewCondition:true, lineObject:defaultNewCondition}])
            sendGetRequest(`/filter/attributes/${props.lineName}/${filterType}`, setAttributeInfo)
            sendGetRequest(`/filter/titles/${props.lineName}/${filterType}`, setExistingFiltersInfo)
    
        }
    },[filterType])

    function setAttributeInfo(data, isPending, error){
        if (!isPending && error===null){
            setAttributeNames(data.attributes)
        }
        setIsPendingAttributeNames(isPending)
        setErrorAttributeNames(error)
    }

    function setExistingFiltersInfo(data, isPending, error){
        if (!isPending && error===null){
            const basicFilters = data.filter(element=>{
                if(element.isFilterBasic){
                    return element
                }
            })
            setExistingFilters(basicFilters)
        }
        setIsPendingExistingFilters(isPending)
        setErrorExistingFilters(error)
    }

     React.useEffect(()=>{
        if (errorAttributeNames || errorExistingFilters){
            let message = []
            if (errorAttributeNames){
                message.push(`attributes: ${errorAttributeNames}`) 
            }
            if (errorExistingFilters){
                message.push(`existing filters: ${errorExistingFilters}`) 
            }
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingAttributeNames === false && isPendingExistingFilters === false){
            setContentToDisplay('filter-form')
        }
    }, [isPendingAttributeNames, isPendingExistingFilters])


    /*************************************** CREATE FILTER ************************************** */

    function createFilter(){
        if(validateData()){
            submitToApi()
        }else{
            executeScroll()
        }
    }

    function validateData(){ 
        let errors = validateFilterData(filterTitle, linesData, existingFilters, attributeNames)
        setErrorValidation(errors)
        if (errors.length > 0){
            return false
        }            
        return true 
    }
    
    function submitToApi(){
        let dataToSend = getDataToSend()
        sendPostRequest("/filter/new/" + filterType, dataToSend, setPostInfo, "/filters" )
    }

    function getDataToSend(){
        console.log(props.lineName)
        return JSON.stringify({
            content: linesData,
            title: filterTitle,
            filterType: filterType,
            ownerId: 1,
            line: props.lineName
        })
    }

    function setPostInfo(response, isPending, error){   
        if(!isPending && error===null){
            console.log(response)
        }
        setErrorPost(error)
        setIsPendingPost(isPending)
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

    return(
        <>
            <div className='d-grid gap-2 col-8 mx-auto py-3'>
                <MultiStageSwitch
                    title='filter-type'
                    switchOptions={switchOptions}
                    defaultOptionIndex={0}
                    setSelectedValue={setFilterType}
                />
            </div>
            {contentToDisplay === 'info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            {contentToDisplay ==='filter-form' && filterType &&
                <>
                    <div ref={myRef}>
                        {alerts}
                    </div>
                    <FilterForm
                        filterTitle={filterTitle}
                        setFilterTitle={setFilterTitle}
                        linesData={linesData}
                        setLinesData={setLinesData}
                        existingFilters={existingFilters}
                        attributeNames={attributeNames}
                        allowToUseExistingFilters={true}
                    />
                    <Button onClick={createFilter}>Create filter</Button> 
                </>
            }
        </>
    )
}
export default NewFilter