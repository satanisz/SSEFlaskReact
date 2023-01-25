import React from 'react';

import AddRemoveLine from './AddRemoveLine';
import {v4} from 'uuid'

function AddRemove(props) {

    // <AddRemove content={content} setContent={setContent} defaultVoidElement={defaultVoidElement} />
    



    const [xyz, setXyz] = React.useState(props.content.map(element=>{
        const id = v4()
        const content = 
            <AddRemoveLine addElement={addElement} removeElement={removeElement} id={id}>
                {element}
            </AddRemoveLine>
        
        return(
            {
                id:id,
                content: content
            }
        )
        })
    )
    const [toDisplay, setToDisplay] = React.useState("")

    
    
    React.useEffect(()=>{
        setXyz(props.content.map(element=>{
            const id = v4()
            const content = 
                <AddRemoveLine addElement={addElement} removeElement={removeElement} id={id}>
                    {element}
                </AddRemoveLine>
            
            return(
                {
                    id:id,
                    content: content
                }
            )
            })
        )
    }, [props.content])


    React.useEffect(()=>{
        if(xyz != null && xyz!=""){
            setToDisplay(xyz.map((element)=>{
                return (element.content)
            }))
        }
    },[xyz])

    function addElement(id){
        console.log(xyz)
        console.log(id)
        let newElements = []
        for (let i = 0 ; i < xyz.length ; i++){
            newElements.push(xyz[i]);
            if(xyz[i].id === id)
            {
                // TO DO
                let id = v4()
                newElements.push({id:id, content:props.defaultVoidElement})   
            }
        }

        
        props.setData(prevData=>{
            console.log("AAA")
            let newData = {...prevData}
            newData.content = newElements
            return newData
        })
    }

    function removeElement(id){
        console.log(`Remove element ${id}`)
    }

    return (
        <div>
            {toDisplay &&
                <>
                    {toDisplay}
                </>
            }
        </div>
    );
}

export default AddRemove;