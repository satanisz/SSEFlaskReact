import React from 'react';
import "./style.css"

function PreviewElement(props) {
    
    
    let myStyles = 'style' in props ? "preview---element " + props.style : "preview---element "  
    if (props.isLineActive)
    {
        myStyles += ' preview---line-active '
    }   

    return (
        <span className={myStyles}>
            {props.text.length < 41 ? props.text : props.text.slice(0,40)+"... " }
        </span>
    );
}

export default PreviewElement;