import React from 'react';
import BigMessageCard from '../../Components/BigMessageCard';
import useFetch from '../../Hook/useFetch';
import Calculation from './Calculation';

function Calculations(props) {

    const sendGetRequest = useFetch()
    
    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)

    const [calculationsFromApi, setCalculationsFromApi] = React.useState(null)
    const [errorCalculationsFromApi, setErrorCalculationsFromApi] = React.useState(null)
    const [isPendingCalculationsFromApi, setIsCalculationsFromApi] = React.useState(true)

    const [rerender, setRerender] = React.useState(false)
    const [calculations, setCalculations] = React.useState(null)

    
    /******************************* GET CALCULATIONS  **************************** */   
    
    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')
        sendGetRequest(`/calculation/all/${props.lineName}`, setDataXYZInfo)
    },[rerender])

    function setDataXYZInfo(data, isPending, error){
        if(!isPending && error===null){
            if(data.length === 0){
                setInfoMessage(`No calculations`)    
                setContentToDisplay('info-card')
            }else{
                setCalculationsFromApi(data)
                setContentToDisplay('calculations')
            } 
        }
        setErrorCalculationsFromApi(error)
        setIsCalculationsFromApi(isPending)
    }

    React.useEffect(()=>{
        if(errorCalculationsFromApi){ 
            let message = `${errorCalculationsFromApi} ;  ` 
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingCalculationsFromApi === false && calculationsFromApi && calculationsFromApi.length > 0){ 
            setContentToDisplay('calculations')
        }
    }, [isPendingCalculationsFromApi, calculationsFromApi, errorCalculationsFromApi])

    React.useEffect(()=>{
        if (calculationsFromApi){
            setCalculations(calculationsFromApi.map(calculation=>{
                return <Calculation
                    {...calculation}
                    forceRerender = {forceRerender}
                />
            }))
        }    
    },[calculationsFromApi])


    function forceRerender(){
        setRerender((prevRerender) => !prevRerender)
    }


    // *************************************************************************************** //
    
    return (
        <div>
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            {contentToDisplay === 'calculations' && calculations &&
                calculations
            }
        </div>
    );
}

export default Calculations;