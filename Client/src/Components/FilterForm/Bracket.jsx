import React from 'react';

function Bracket(props) {
    
    console.log(props.isOpening)

    return (
        <span className={"bracket bracket--" + props.style}>
            {props.isOpening ? "(" : ")"}
        </span>
    );
}

export default Bracket;