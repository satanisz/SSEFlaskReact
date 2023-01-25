import React from 'react';
import { Container, Row } from 'react-bootstrap';

function BigMessageCard(props) {
    
    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    

    React.useEffect(()=>{
        if(typeof props.message === "string"){
            setContentToDisplay(<div className='d-flex justify-content-center '><h2>{props.message}</h2></div>)
        }else{
            let value = props.message.map(element=>{
                return(<div className='d-flex justify-content-center '><h3>{element}</h3></div>)})
            setContentToDisplay(value)
            console.log(value)
        }
    },[props.message])
    


    return(
        <div className="py-5">
            {contentToDisplay}
        </div>
    );
}

export default BigMessageCard;