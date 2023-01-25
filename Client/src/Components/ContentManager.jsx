import React from 'react';

function ContentManager(props) {
    const [infoMessage, setInfoMessage] = React.useState(null)
    const [contentToDisplay, setContentToDisplay] = React.useState(null)
    
    return (
        <>
            abcd
            {props.children}
        </>
    );
}

export default ContentManager;