import React from 'react';

function LineContent(props) {
    

    function setTitle(event){
        console.log(event.target.value)
        props.setDataLineContent(prevDataLineContent=>{
            let valueToReturn = prevDataLineContent.map(element=>{
                let newValues = {...element}
                if(element.id === props.id)
                {
                    newValues.title = event.target.value 
                }
                return newValues
            })
            return valueToReturn
        })
      }



    return (
        <div>
            <a>{props.id}</a>
            <input 
                type="text" 
                className='filter-title'
                onChange={setTitle}
                value={props.title}
            />
            
            <a>{props.title}</a>
        </div>
    );
}

export default LineContent;