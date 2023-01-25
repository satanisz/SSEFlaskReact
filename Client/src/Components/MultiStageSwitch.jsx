import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function MultiStageSwitch(props) {
    
    const [switchButtons, setSwitchButtons] = React.useState(null) 
    
    React.useEffect(()=>{
        let startValue = null
        if(localStorage.getItem(props.title)){
            startValue = JSON.parse(localStorage.getItem(props.title))
        }
        else if(props.defaultOptionIndex){
            startValue=props.switchOptions[props.defaultOptionIndex].value
        }else{
            startValue = props.switchOptions[0].value
        }
        props.setSelectedValue(startValue)

        const buttons = props.switchOptions.map((option, idx)=>{
            return(
            <ToggleButton 
                className='rounded-0'
                id={`${props.title}-${idx}`}
                value={option.value}
                variant='outline-dark'
                onChange={(e) => toggleButtonClick(e.currentTarget.value)}
            >
                {option.name}
            </ToggleButton>)
        })
        
        setSwitchButtons(()=>{
            return(
            <ToggleButtonGroup type="radio" name={`group-${props.title}`} defaultValue={startValue}>
                {buttons}
            </ToggleButtonGroup>
            )
        })
    },[])

    function toggleButtonClick(value){
        localStorage.setItem(props.title, JSON.stringify(value))
        props.setSelectedValue(value)
    }


    return (
        <>
            {switchButtons && switchButtons}
        </>
    );
}

export default MultiStageSwitch;