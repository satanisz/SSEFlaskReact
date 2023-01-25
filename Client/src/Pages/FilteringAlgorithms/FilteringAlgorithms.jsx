import React from 'react';
import BigMessageCard from '../../Components/BigMessageCard';
import useFetch from '../../Hook/useFetch';
import FilteringAlgorithm from './FilteringAlgorithm';

function FilteringAlgorithms(props) {

    const sendGetRequest = useFetch()

    const [algorithms, setAlgorithm] = React.useState(null)
    const [rerender, setRerender] = React.useState(false)
    const [algorithmsFromApi, setAlgorithmsFromApi] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null) 
    const [infoMessage, setInfoMessage] = React.useState('')


    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')

        sendGetRequest(`/filtering-algorithm/all/${props.lineName}`, setAlgorithmsFromApiInfo)
    },[rerender])

    function setAlgorithmsFromApiInfo(data, isPending, error){
        if(!isPending && error === null){
            if(data.length === 0){
                setInfoMessage(`No filtering algorithms`)    
                setContentToDisplay('info-card')
            }else{
                setAlgorithmsFromApi(data)
                setContentToDisplay('algorithms')
            }   
        }
        if(error){
            setInfoMessage(`Error while loading algorithm info. ${error}`)
            setContentToDisplay('info-card')
        }
    }

    React.useEffect(()=>{
        console.log(algorithmsFromApi)
        setAlgorithm(null)
        if (algorithmsFromApi && algorithmsFromApi.length > 0){
            setAlgorithm(algorithmsFromApi.map(algorithm=>{
                return <FilteringAlgorithm
                    {...algorithm}
                    forceRerender={forceRerender}
                />

            }))
        }
    },[algorithmsFromApi])

    function forceRerender(){
        setRerender((prevRerender) => !prevRerender)
    }

    return (
    <div>
        {contentToDisplay ==='info-card' &&
            <BigMessageCard message={infoMessage}/>
        }
        {contentToDisplay ==='algorithms' &&
            <>
                {algorithms}
            </>
        }
    </div>
    );
}
export default FilteringAlgorithms;