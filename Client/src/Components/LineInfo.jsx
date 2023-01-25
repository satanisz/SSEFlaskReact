import React from 'react';
import { useSearchParams } from 'react-router-dom';


function LineInfo(props) {
    
    const [searchParams] = useSearchParams();
    const [line, setLine] = React.useState(null)

    React.useEffect(()=>{
        const lineNameFromUrl = searchParams.get('line')
        const lineNameFromLocalStorage = JSON.parse(localStorage.getItem('currentLine'))
        const defaultLineName = "HRM"

        if(lineNameFromLocalStorage && lineNameFromUrl){
            if(lineNameFromLocalStorage === lineNameFromUrl){
                setLine(lineNameFromLocalStorage)
            }
            else{
                saveLineNameToLocalStorage(lineNameFromUrl)
            }
        }
        else if(lineNameFromLocalStorage == null && lineNameFromUrl === null){
            saveLineNameToLocalStorage(defaultLineName)
        }
        else if(lineNameFromLocalStorage === null && lineNameFromUrl !== null){
            saveLineNameToLocalStorage(lineNameFromUrl)
        }
        else if (lineNameFromLocalStorage !== null && lineNameFromUrl === null){
            setLine(lineNameFromLocalStorage)
        }
    },[])


    function saveLineNameToLocalStorage(lineName){
        localStorage.setItem('currentLine', JSON.stringify(lineName))
        window.location.reload()
    }

    
    return (
        <>
            {line &&
                React.cloneElement(props.children, { lineName: line })
            }
        </>
    );
}

export default LineInfo;