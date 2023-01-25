import React, { useEffect } from "react"
import "../../style.css"
import AlertMessage from "../../Components/AlertMessage"
import { Button, Col, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import useFetch from "../../Hook/useFetch"
import usePut from "../../Hook/usePut"
import FilterForm from "../../Components/FilterForm/FilterForm"
import DefaultElements from "../../Components/FilterForm/defaultElements"
import { useParams } from 'react-router-dom';
import BigMessageCard from "../../Components/BigMessageCard";
import validateFilterData from "../../Components/FilterForm/validateFilterData";

function UpdateFilter(props){

    const { filterId } = useParams();
    const [filterType, setFilterType] = React.useState(null)
    const [filterLine, setFilterLine] = React.useState(null)

    const myRef = React.useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()   

    const navigate = useNavigate()
    const sendGetRequest = useFetch()
    const sendPutRequest = usePut()

    const defaultElements = new DefaultElements()
    const defaultElementData = defaultElements.getDefaultElementData()
    

    const [contentToDisplay, setContentToDisplay] = React.useState(null) 
    const [infoMessage, setInfoMessage] = React.useState('')
    const [loadFirstViewData, setLoadFirstViewData] = React.useState(true)
    const [errorValidation, setErrorValidation] = React.useState(null)
    const [allowToUseExistingFilters, setAllowToUseExistingFilters] = React.useState(null)

    const [isPendingFilterFromApi, setIsPendingFilterFromApi] = React.useState(null)

    const [attributeNames, setAttributeNames] = React.useState([])
    const [isPendingAttributeNames, setIsPendingAttributeNames] = React.useState(true)
    const [errorAttributeNames, setErrorAttributeNames] = React.useState(null)

    const [existingFilters, setExistingFilters] = React.useState([])
    const [isPendingExistingFilters, setIsPendingExistingFilters] = React.useState(true)
    const [errorExistingFilters, setErrorExistingFilters] = React.useState(null)
    
    const [dependencies, setDependencies] = React.useState(null)
    const [isPendingDependencies, setIsPendingDependencies] = React.useState(true)

    const [linesData, setLinesData] = React.useState(()=>[defaultElementData])

    const [alerts, setAlerts] = React.useState([])
    const [filterTitle, setFilterTitle] = React.useState()


    /******************************* GET IMPUT DATA TO CREATE FILTER FORM **************************** */
    React.useEffect(()=>{
        setAlerts([])
        setInfoMessage("Loading filter info...")
        setContentToDisplay('info-card')

        sendGetRequest(`/filter/${filterId}`, setFilterFromApiInfo)
    },[loadFirstViewData])

    function setFilterFromApiInfo(data, isPending, error){
        if(error===null && !isPending){
            console.log(data)
            const filterRows = data.filterRows.map((filterRow)=>{
                return filterRow
            })
            setLinesData(filterRows)
            setFilterTitle(data.title)
            setFilterType(data.filterType)
            setFilterLine(data.line)
            
            sendGetRequest(`/filter/attributes/${data.line}/${data.filterType}`, setAttributeInfo)
            sendGetRequest(`/filter/dependencies/${filterId}`, setDependenciesInfo)
        }
        if(error){
            setInfoMessage(`Couldn't load info about filter. ${error}`)
            setContentToDisplay('info-card')
        }
        setIsPendingFilterFromApi(isPending)
    }

    // you can't send that request immediately, because we have to wait until the information about the filters
    // arrives and their states are updated
    React.useEffect(()=>{
        if(filterTitle && filterLine && filterType){
            sendGetRequest(`/filter/titles/${filterLine}/${filterType}`, setExistingFiltersInfo)
        }
    },[filterTitle, filterLine, filterType])

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
                if(element.isFilterBasic && element.title !== filterTitle){
                    return element
                }
            })

            setExistingFilters(basicFilters)
        }
        if(error){
            setInfoMessage(error)
            setContentToDisplay('info-card')
        }
        setIsPendingExistingFilters(isPending)
    }

    function setDependenciesInfo(data, isPending, error){
        if(!isPending && error===null){
            if(data.nextGenerationOfFilters.length > 0){
                setAllowToUseExistingFilters(false)
            }
            else{
                setAllowToUseExistingFilters(true)
            }
            setDependencies(data)
        }
        if(error){
            setInfoMessage(error)
            setContentToDisplay('info-card')
        }
        setIsPendingDependencies(isPending)
    }

    React.useEffect(()=>{
        if (errorExistingFilters || errorAttributeNames){
        
        }
        if(isPendingExistingFilters===false &&
            isPendingAttributeNames===false &&
            isPendingFilterFromApi===false &&
            isPendingDependencies===false)
        {
            setContentToDisplay('filter-form')
            validateData()
        }
    },[isPendingExistingFilters, isPendingAttributeNames, isPendingFilterFromApi, isPendingDependencies] )


    /*************************************** APPROVE FILTER UPDATE ************************************** */

    function updateFilter(){
        if(validateData()){
            submitToApi()
        }else{
            executeScroll()
        }
    }

    function validateData(){    
        let errors = validateFilterData(filterTitle, linesData, existingFilters, attributeNames)
        setErrorValidation(errors)
        console.log(errorValidation)
        if (errors.length > 0){
            return false
        }            
        return true 
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
    },[errorValidation])

    function createAlertMessageObject(message){
        return (<AlertMessage
                    message={message}
                />)
    }

    function submitToApi(){
        let dataToSend = getDataToSend()
        sendPutRequest(`/filter/${filterId}`, dataToSend, setPutInfo)
    }

    function getDataToSend(){
        return JSON.stringify({
            content: linesData,
            title:filterTitle,
            filterType:filterType,
            ownerId: 1,
            line: props.lineName
        })
    }

    function setPutInfo(response, isPending, error){   
        if(error === null && !isPending)
        {   
            setInfoMessage("Filter has been updated successfully")
            setContentToDisplay('info-card')
            setTimeout(()=>{
                navigate('/filters')
            }, 3000)
        }
        if(isPending){
            setContentToDisplay('updating')
        }
        if(error){
            setInfoMessage(error)
            setContentToDisplay('info-card')
        }
    }
    

    /*************************************** OTHER ************************************** */

    React.useEffect(()=>{
        console.log(linesData.map(line=>{return line.lineObject}))
    }, [linesData])



    /************************************************************************************ */
    return(
    <>  
        {contentToDisplay ==='info-card' &&
            <BigMessageCard message={infoMessage}/>
        }
        {contentToDisplay ==='filter-form' &&
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
                    allowToUseExistingFilters={allowToUseExistingFilters}
                />
                <Button onClick={updateFilter}>Update</Button> 
                <Button className='ms-2' onClick={()=>navigate('/filters')}>Cancel</Button> 
                <Button onClick={()=>setLoadFirstViewData(prev=>!prev)} className='ms-2'>Revert changes</Button> 
            </>
        }
    </>
    )
}

export default UpdateFilter