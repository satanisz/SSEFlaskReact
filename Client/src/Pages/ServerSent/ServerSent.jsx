import React from 'react';
import useFetch from "../../Hook/useFetch"

import {Button} from "react-bootstrap";



function ServerSentPage(props) {

    // comunication with API
    const sendFetchRequest = useFetch()

    const [infoMessage, setInfoMessage] = React.useState('')
    const [MESDataDB, setMESDataDB] = React.useState(null)
    

    
    function setDataXYZInfo(data, isPending, error){
        if(!isPending){
            console.log(data)
        }
        
    }

    const downloadMES = React.useCallback(() => {
        // Api request here
        sendFetchRequest(`/importMES/import`, setMESFromApi)
    }, []);
    
    function setMESFromApi(data, isPending, error){
    if(!isPending){
        if(data.status !== "Ok"){ // some errors
            setInfoMessage(error)
            console.log(error)
            setMESDataDB(data.status);
        }
        else{ // ok
            setMESDataDB("Sukces! Baza MES zaktualizowana");
        }


    }
    else{
        setMESDataDB("progress...");
    }
    // setErrorFiltersFromApi(error) // ??
    // setIsPendingFiltersFromApi(isPending) // ??
    }


    return (
        <>
        {/* <Button onClick={createFilter}>RUN</Button>  */}
        <Button variant="secondary" onClick={downloadMES}>RUN</Button>
            {/* <div className='d-grid gap-2 col-8 mx-auto'>
                <MultiStageSwitch
                    title='mySwitch1'
                    switchOptions={switchOptions}
                    defaultOptionIndex={0}
                    setSelectedValue={setSelectedValue}
                />
            </div> */}
        {MESDataDB &&
            <h2>{MESDataDB}</h2>
        } 

        </>
    );
}

export default ServerSentPage;