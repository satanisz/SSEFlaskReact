import React from 'react';
import useFetch from '../Hook/useFetch';
import BigMessageCard from './BigMessageCard';

function MyHookSchema(props) {
    
    const sendGetRequest = useFetch()

    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)

    const [dataXYZ, setDataXYZ] = React.useState(null)
    const [errorDataXYZ, setErrorDataXYZ] = React.useState(null)
    const [isPendingDataXYZ, setIsPendingDataXYZ] = React.useState(true)

    React.useEffect(()=>{
        setInfoMessage('Loading...')
        setContentToDisplay('info-card')
        
        sendGetRequest('/myURL/.../', setDataXYZInfo)

    },[])


    function setDataXYZInfo(data, isPending, error){
        if(!isPending && error===null){
            setDataXYZ(data)
        }
        setErrorDataXYZ(error)
        setIsPendingDataXYZ(isPending)
    }

    // if you are waiting for many information you add isPending... to list [isPendingDataXYZ01, isPendingDataXYZ02, ...]
    // and add necessary info to if statemens
    React.useEffect(()=>{
        if(errorDataXYZ){ // errorDataXYZ01 || errorDataXYZ02 
            let message = "ERROR: "
            message += `ErrorDataXYZ: ${errorDataXYZ} ;  ` 
            setInfoMessage(message)
            setContentToDisplay('info-card')
        }else if(isPendingDataXYZ === false){ //isPendingDataXYZ01 === false && isPendingDataXYZ02 === false 
            setContentToDisplay('my-final-view')
        }
    }, [isPendingDataXYZ, errorDataXYZ])


    
    return (
        <div>
            {contentToDisplay ==='info-card' &&
                <BigMessageCard message={infoMessage}/>
            }
            {contentToDisplay === 'my-final-view' &&
                <div>SOME DATA</div>
            }
        </div>
    );
}

export default MyHookSchema;