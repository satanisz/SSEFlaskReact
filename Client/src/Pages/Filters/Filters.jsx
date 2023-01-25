import React, { useEffect } from 'react';
import Filter from './Filter';
import useFetch from '../../Hook/useFetch';
import BigMessageCard from '../../Components/BigMessageCard';
import MultiStageSwitch from '../../Components/MultiStageSwitch';

function Filters(props) {
    const sendGetRequest = useFetch()

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)

    const [filters, setFilters] = React.useState(null)
    const [filtersFromApi, setFiltersFromApi] = React.useState(null)
    const [isPendingFiltersFromApi, setIsPendingFiltersFromApi] = React.useState(true)
    const [rerender, setRerender] = React.useState(false)


    /**************************************** SELECT FILTER TYPE *********************************** */

    const switchOptions = [
        { name: 'Order', value: 'order'},
        { name: 'Material', value: 'material' },
        { name: 'Special order', value: 'special-order' }
    ]
    const [filterType, setFilterType] = React.useState(null)


    /**************************************** LOAD FILTERS *********************************** */

    React.useEffect(()=>{
        if(filterType){
            setInfoMessage('Loading...')
            setContentToDisplay('info-card')
            sendGetRequest(`/filter/all/${props.lineName}/${filterType}`, setFiltersFromApiInfo)
        }
    },[rerender, filterType])

    function setFiltersFromApiInfo(data, isPending, error){
        if(!isPending && error===null){
            setFiltersFromApi(data)
            if(data.length === 0){
                setInfoMessage(`No filters`)    
                setContentToDisplay('info-card')    
            }else{
                setContentToDisplay('filtes')
            }
        }
        if(error){
            setInfoMessage(`filters: ${error}`)
            setContentToDisplay('info-card')
        }
        setIsPendingFiltersFromApi(isPending)
    }

    React.useEffect(()=>{
        if (filtersFromApi){
            setFilters(filtersFromApi.map(filter=>{
                return <Filter
                    {...filter}
                    forceRerender = {forceRerender}
                />
            }))
        }
    
    },[filtersFromApi])

    function forceRerender(){
        setRerender((prevRerender) => !prevRerender)
    }



    return(
        <div>
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
            {contentToDisplay ==='filtes' && filterType &&
                <>{filters}</>
            }
            
        </div>
    );
}

export default Filters;