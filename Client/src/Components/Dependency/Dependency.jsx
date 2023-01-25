import React from 'react';
import useFetch from '../../Hook/useFetch';
import BigMessageCard from '../BigMessageCard';
import DependencyWarning from './DependencyWarning';

function Dependency({typeOfElement, id, continueFunction, cancelFunction}) {
    
    const sendGetRequest = useFetch()

    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    const [infoMessage, setInfoMessage] = React.useState(null)
    
    const [dependencies, setDependencies] = React.useState(null)
    const [errorDependencies, setErrorDependencies] = React.useState(null)
    const [isPendingDependencies, setIsPendingDependencies] = React.useState(true)


    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')
        sendGetRequest(`/${typeOfElement}/dependencies/${id}`, setDependenciesInfo)
    },[])
    
    function setDependenciesInfo(data, isPending, error){
        if(!isPending && error===null){
            if (
                (!data.filters || data.filters.length === 0) && 
                (!data.filteringAlgorithms || data.filteringAlgorithms.length === 0)  &&
                (!data.calculations || data.calculations.length === 0) &&
                (!data.nextRoundFilteringAlgorithms || data.nextRoundFilteringAlgorithms.length === 0) &&
                (!data.nextRoundCalculations || data.nextRoundCalculations.length === 0)
            ){
                continueFunction()
            }
            else{
                setDependencies(data)
            }
        }
        setErrorDependencies(error)
        setIsPendingDependencies(isPending)
    }

    React.useEffect(()=>{
        if(errorDependencies){
            let message = []
            message.push(`Dependencies: ${errorDependencies}`) 
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingDependencies === false){
            setContentToDisplay('dependencies')
        }
    }, [isPendingDependencies])


    // *************************************************************************************** //
    
    return (
        <div>
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            {contentToDisplay === 'dependencies'&& dependencies &&
                <DependencyWarning
                    dependencies = {dependencies}
                    leftButtonFunction = {continueFunction} 
                    leftButtonText = "Continue"
                    rightButtonFunction = {cancelFunction}
                    rightButtonText = 'Cancel'
                />
            }
        </div>
    );
}

export default Dependency;