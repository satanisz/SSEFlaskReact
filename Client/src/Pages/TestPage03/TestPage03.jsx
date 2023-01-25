import React from 'react';
import AddRemove from './AddRemove';
import AnyContent from './AnyContent';
import {v4} from 'uuid'

function TestPage03(props) {
    
    const [content, setContent] = React.useState([
        <AnyContent message="1"/>,
        <AnyContent message="2"/>, 
        <AnyContent message="3"/>, 
        <AnyContent message="4"/> 
    ])
    
    const defaultVoidElement =  <AnyContent message="New element"/>

    return (
        <div>
            <AddRemove content={content} setContent={setContent} defaultVoidElement={defaultVoidElement} />
        </div>
    );
}

export default TestPage03;