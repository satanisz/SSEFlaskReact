import React from 'react';
import LineContent from './LineContent';
import LineContainer from './LineContainer.jsx';
import {v4} from 'uuid'

function TestPage(props) {

    const [dataLineContent, setDataLineContent] = React.useState([
        {id:v4(), title:"My title 1"},
        {id:v4(), title:"My title 2"},
        {id:v4(), title:"My title 3"},
        {id:v4(), title:"My title 4"}
    ])
    const emptyLineContent ={title:"New component"}

    const [linesContent, setLinesContent] = React.useState(null)
    const [linesContainer, setLinesContainer] = React.useState(null)
    React.useEffect(()=>{
        
        setLinesContent(dataLineContent.map(lineContent=>{
            return <LineContent
                id={lineContent.id}
                title={lineContent.title}
                dataLineContent={dataLineContent}
                setDataLineContent={setDataLineContent}
            />
        }))
    },[dataLineContent])

    React.useEffect(()=>{
        if(linesContent){
            setLinesContainer(linesContent.map(lineContent=>{
                return<LineContainer
                    content={lineContent}
                    rows={dataLineContent}
                    setRows={setDataLineContent}
                    emptyRow={emptyLineContent}
                />
            }))
        }
    },[linesContent])



    return (
        <div>
            {linesContainer && linesContainer}
        </div>
    );
}

export default TestPage;